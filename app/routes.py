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

#Testing Methods
def hello():
  print "hello"

def yo():
  print "yo"

#Database Methods
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

#App Pages
@app.route('/show_entries')
def show_entries():
    print DATABASE
    cur = g.db.execute('select title, text from entries order by id desc')
    entries = [dict(title=row[0], text=row[1]) for row in cur.fetchall()]
    return render_template('show_entries.html', entries=entries)

@app.route('/add',methods=['POST'])
def add_entry():
    #if not session.get('logged_in'):
    #    abort(401)
    g.db.execute('insert into entries (title, text) values (?, ?)',
                 [request.form['title'], request.form['text']])
    g.db.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))

@app.route('/')
def home():
	return render_template('main.html')

@app.route('/input')
def input():
  return render_template('input.html')

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
	
	
	
