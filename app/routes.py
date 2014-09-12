from flask import Flask, render_template
from urllib2 import Request, urlopen, URLError
import threading
import datasource
import nltk
import json
import pprint

app = Flask(__name__)

def hello():
	print "hello"

def yo():
	print "yo"

@app.route('/')
def home():
	return render_template('main.html')

@app.route('/update')
def respond():
	data = datasource.DataSource()
	data.update_data()
	# pprint.pprint(data.data)
	with open('data.json', 'w') as outfile:
  		json.dump(data.data, outfile)
  	return 'blah'

@app.route('/request')
def clientdemand():
    # pprint.pprint(data)
    return json.dumps(data, separators=(',',':'))


def do_every (interval, worker_func, iterations = 0):
  if iterations != 1:
    threading.Timer (
      interval,
      do_every, [interval, worker_func, 0 if iterations == 0 else iterations-1]
    ).start ();
  worker_func ();
 

data = 0

if __name__ == '__main__':
    json_data = open('data.json').read()
    data = json.loads(json_data)
    # pprint.pprint(data)
    app.run(debug=True)
	
	
	
