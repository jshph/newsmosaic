from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from urllib2 import Request, urlopen, URLError
from contextlib import closing
import threading
import datasource
import nltk
import json
import pprint
import sqlite3

#Database configuration
DATABASE = '/tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'

app = Flask(__name__)
app.config.from_object(__name__)

def connect_db():
	return sqlite3.connect(app.config['DATABASE']) 

def init_db():
  with closing(connect_db()) as db:
    with app.open_resource('static/schema.sql', mode='r') as f:
      db.cursor().executescript(f.read())
    db.commit()
    print "created"

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

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
	pprint.pprint(data.data)
	with open('data.json', 'w') as outfile:
  		json.dump(data.data, outfile)
  	return json.dump(data.data, outfile)

@app.route('/request')
def clientdemand():
    pprint.pprint(data)
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
	
	
	
