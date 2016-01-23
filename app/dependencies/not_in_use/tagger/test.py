import json
from urllib import urlencode
import urllib2
 
YQL_URL = 'http://query.yahooapis.com/v1/public/yql'
text = "WordPress is a free and open source blogging tool and a content management system (CMS) based on PHP and MySQL which runs on a Web hosting service. Features include a plug-in architecture and a template system. WordPress is used by over 14.7% of Alexa Internet's 'top 1 million' websites, and as of August 2011 manages 22% of all new websites. WordPress is currently the most popular blogging system in use on the Web, powering over 60 million websites worldwide."
query = "SELECT * FROM search.termextract WHERE context=\"" + text +"\""
 
query_str = urlencode({'q': text, 'format': 'json', 'callback': ''})
 
# fetch results
url = '%s?%s' % (YQL_URL, query_str)
result = json.loads(urllib2.urlopen(url).read())
 
print result