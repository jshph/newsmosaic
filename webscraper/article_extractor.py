# install Goose https://github.com/grangier/python-goose

from goose import Goose
from topia.termextract import extract
extractor = extract.TermExtractor()

url = "http://www.theverge.com/2014/9/11/6136443/the-largest-predatory-dinosaur-ever-was-half-duck-half-crocodile"
g = Goose()
article = g.extract(url=url)
# print article.title
# print article.cleaned_text
x = sorted(extractor(article.cleaned_text))
for i in x:
	print i[0]