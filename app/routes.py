from flask import Flask, render_template
from urllib2 import Request, urlopen, URLError
import threading
import datasource

app = Flask(__name__)      
 
@app.route('/')
def home():
	return render_template('main.html')

def do_every (interval, worker_func, iterations = 0):
  if iterations != 1:
    threading.Timer (
      interval,
      do_every, [interval, worker_func, 0 if iterations == 0 else iterations-1]
    ).start ();
  worker_func ();
 
if __name__ == '__main__':
	data = datasource.DataSource()
	do_every(30, data.update_article_urls)
	app.run(host="0.0.0.0",debug=True)
	
	
