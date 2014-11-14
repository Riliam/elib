from flask import Flask, render_template, request, jsonify
from database import db_session
from models import Book, Author
from forms import BookForm, AuthorForm

DEBUG = True
SECRET_KEY = "secret secret key"

app = Flask(__name__)
app.config.from_object(__name__)


def json_books_and_authors():
    books = Book.query.all()
    authors = Author.query.all()

    books_markup = render_template("__books.html", books=books)
    authors_markup = render_template("__authors.html", authors=authors)

    return jsonify(books_markup=books_markup, authors_markup=authors_markup)


@app.route("/")
def index():
    books = Book.query.all()
    authors = Author.query.all()

    book_form = BookForm()
    book_form.authors.choices = [(author.id, author.name) for author in authors]
    author_form = AuthorForm()

    return render_template("index.html", books=books, authors=authors,
                            book_form=book_form, author_form=author_form)

@app.route("/_search")
def search():
    query = request.args.get("search_query")

    sql_query = "%{}%".format(query)

    books = Book.query.filter(Book.title.like(sql_query))
    authors = Author.query.filter(Author.name.like(sql_query))

    books_markup = render_template("__books.html", books=books)
    authors_markup = render_template("__authors.html", authors=authors)

    return jsonify(books_markup=books_markup, authors_markup=authors_markup)


@app.route("/_add_author", methods=["POST"])
def add_author():
    author_form = AuthorForm(request.form)
    if author_form.validate():
        authorname = author_form.name.data
        author = Author(name=authorname)
        db_session.add(author)
        db_session.commit()
    return json_books_and_authors()


@app.route("/_delete_author", methods=["POST"])
def delete_author():
    authorid  = request.form.get("authorid")
    author = Author.query.get(authorid)
    db_session.delete(author)
    db_session.commit()
    return json_books_and_authors()


@app.route("/_add_book", methods=["POST"])
def add_book():
    book_form = BookForm(request.form)
    if book_form.validate_on_submit:
        booktitle = book_form.booktitle.data
        author_ids = book_form.authors.data

        book = Book(title=booktitle)

        for author_id in author_ids:
            author = Author.query.get(author_id)
            book.authors.append(author)

        db_session.add(book)
        db_session.commit()

    return json_books_and_authors()


@app.route("/_delete_book", methods=["POST"])
def delete_book():
    bookid = request.form.get("bookid")
    book = Book.query.get(bookid)
    db_session.delete(book)
    db_session.commit()
    return json_books_and_authors()


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    app.run(host='0.0.0.0')
