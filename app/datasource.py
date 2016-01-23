from urllib2 import Request, urlopen, URLError
import json
import xml.etree.ElementTree as ET
import threading
# import nltk
import random
from goose import Goose
import dependencies.tagger as tagger
import pickle
import pprint


class DataSource(object):

	def __init__(self):
		self.data=[{}]#{"url":www.yo.com, "corpus":"somestring", "title": "somestring", "word choices":["",""]}
		class ImgLessGoose(Goose):
			def initialize(self):
				pass
		self.g = ImgLessGoose({
			  'parser_class':'soup',
			  'enable_image_fetching' : False
		})
		#instantiate scraper

	def update_data(self):
		del self.data[:]
		request = Request('http://cloud.feedly.com/v3/search/feeds?q=politics&n=10')
		try:
			response = urlopen(request)
			kittens = response.read()
			data = json.loads(kittens)
			i = 0

		except URLError, e:
		    print 'No kittez. Got an error code:', error

		for result in data['results']:
			print i
			url= result['feedId'][5:]
			print url
			try:
				tree = ET.ElementTree(file=urlopen(url))
			except Exception, e:
				print "couldn't fetch from ", url
				continue
			root = tree.getroot()

			urlcount = 0
			MAX_URLCOUNT = 7
			for item in root.iter('item'):
				if (urlcount>MAX_URLCOUNT):
					break
				curr_url = item.find('link').text
				print urlcount, curr_url
				data_quartet = {}
				data_quartet['url']=curr_url

				if (curr_url[-4:]==".php"):
					continue;
				tempScraped = self.scrape_url(curr_url)

				if tempScraped == None:
					continue
				# if (tempScraped.meta_lang != 'en'):
				# 	print 'not ingles'
				# 	continue
				data_quartet['corpus'] = tempScraped.cleaned_text
				if (len(data_quartet['corpus'])==0):
					continue
				data_quartet['title'] = tempScraped.title
				data_quartet['wordchoice'] = self.choose_words(data_quartet['corpus'])
				pprint.pprint(data_quartet['wordchoice'])
				self.data.append(data_quartet);
				urlcount+=1
			i+=1
		return self.data

	def scrape_url(self,url):
		extractedBody = None
		try:
			extractedBody = self.g.extract(url=url)
		except Exception:
			print "could not scrape"
			pass
		return extractedBody

	def choose_words(self,corpus):
		# tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+')
		# tokens = tokenizer.tokenize(corpus)
		# chosen_words = []
		# for x in range(0,12):
		# 	chosen_words.append(tokens[random.randrange(0,len(tokens))])
		# return chosen_words
		weights = pickle.load(open('dependencies/dict.pkl', 'rb'))
		thisTagger = tagger.Tagger(tagger.Reader(), tagger.Stemmer(), tagger.Rater(weights))
		return thisTagger(corpus, 8)











		