from flask import Flask, render_template
from urllib2 import Request, urlopen, URLError
import threading
import datasource
import nltk

app = Flask(__name__)
data = datasource.DataSource()

def hello():
	print "hello"

def yo():
	print "yo"

@app.route('/')
def home():
	return render_template('main.html')

@app.route('/update')
def respond():
	return "hello"

def do_every (interval, worker_func, iterations = 0):
  if iterations != 1:
    threading.Timer (
      interval,
      do_every, [interval, worker_func, 0 if iterations == 0 else iterations-1]
    ).start ();
  worker_func ();
 
if __name__ == '__main__':
	app.run(debug=True)
	do_every(30, data.update_data())
	
	
	