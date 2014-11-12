from flask import Flask, render_template
from database import db_session
from models import Book, Author

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)


@app.route("/")
def index():
    books = Book.query.all()
    authors = Author.query.all()
    return render_template("index.html", books=books, authors=authors)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    app.run()
