# install Goose https://github.com/grangier/python-goose

from goose import Goose
url = "http://www.theverge.com/2014/9/11/6136443/the-largest-predatory-dinosaur-ever-was-half-duck-half-crocodile"
g = Goose()
article = g.extract(url=url)
print article.title
print article.cleaned_text