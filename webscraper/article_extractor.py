# install Goose https://github.com/grangier/python-goose
# 
# Done so far: basic keyword extraction using tagger works.
# 
# Concerns about keyword extraction using Tagger library:
# https://github.com/apresta/tagger
# - dictionary should be built from relevant corpi to article to be more
# 	effective at attracting attention in immersive interface
# - TF-IDF is a function provided in the module build_dict... if articles
# 	in collection ever accumulate enough around one subject, use TF-IDF
# 
# immediate todos:
# - implement multitag

from goose import Goose
import tagger
import pickle

url = "http://www.theverge.com/2014/9/11/6136443/the-largest-predatory-dinosaur-ever-was-half-duck-half-crocodile"
g = Goose()
article = g.extract(url=url).cleaned_text

weights = pickle.load(open('data/dict.pkl', 'rb')) # or your own dictionary
mytagger = tagger.Tagger(tagger.Reader(), tagger.Stemmer(), tagger.Rater(weights))
best_3_tags = mytagger(article, 6)
print best_3_tags