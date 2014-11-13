from flask import Flask, render_template, request, jsonify
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


@app.route("/_search")
def search():
    query = request.args.get("search_query")

    sql_query = "%{}%".format(query)
    books = Book.query.filter(Book.title.like(sql_query))
    authors = Author.query.filter(Author.name.like(sql_query))

    books_markup = render_template("__books.html", books=books)
    authors_markup = render_template("__authors.html", authors=authors)

    return jsonify(books_markup=books_markup, authors_markup=authors_markup)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    app.run(host='0.0.0.0')
