from flask import Flask, render_template
import feedparser

app = Flask(__name__)

RSS_FEED = "https://static.cricinfo.com/rss/livescores.xml"

@app.route('/')
def get_scores():
    feed = feedparser.parse(RSS_FEED)
    return render_template('index.html', scores=feed['entries'])

if __name__ == '__main__':
    app.run(debug=True)
