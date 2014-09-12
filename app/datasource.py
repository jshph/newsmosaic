from urllib2 import Request, urlopen, URLError
import json
import xml.etree.ElementTree as ET
import threading
import nltk
import random
from goose import Goose


class DataSource(object):

	def __init__(self):
		self.data=[{}]#{"url":www.yo.com, "corpus":"somestring", "title": "somestring", "word choices":["",""]}
		self.g = Goose()
		#instantiate scraper

	def update_data(self):
		del self.data[:]
		request = Request('http://cloud.feedly.com/v3/search/feeds?q=iphone&n=5')
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
			tree = ET.ElementTree(file=urlopen(url)) 
			root = tree.getroot()

			urlcount = 0
			for item in root.iter('item'):
				curr_url = item.find('link').text
				data_quartet = {}
				data_quartet['url']=curr_url
				if (curr_url[-4:]==".php" or urlcount>=7):
					continue
				tempScraped = self.scrape_url(curr_url)
				data_quartet['corpus'] = tempScraped.cleaned_text
				if (len(data_quartet['corpus'])==0):
					continue
				data_quartet['title'] = tempScraped.title
				data_quartet['wordchoice'] = self.choose_words(data_quartet['corpus'])
				self.data.append(data_quartet);
				urlcount+=1
			i+=1
		return self.data

	def scrape_url(self,url):
		return self.g.extract(url=url)

	def choose_words(self,corpus):
		tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+')
		tokens = tokenizer.tokenize(corpus)
		chosen_words = []
		for x in range(0,12):
			chosen_words.append(tokens[random.randrange(0,len(tokens))])
		return chosen_words











		