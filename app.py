# -*- coding: utf-8 -*-
from __future__ import print_function

import os
from functools import wraps

from flask import Flask, render_template, request, jsonify
from flask import session, redirect, url_for, flash

from database import db_session
from models import Book, Author, User
from forms import BookForm, AuthorForm, UserForm


if not os.environ.get("HEROKU"):
    DEBUG = True
SECRET_KEY = "secret secret key"

app = Flask(__name__)
app.config.from_object(__name__)


def json_books_and_authors(message=""):
    books = Book.query.all()
    authors = Author.query.all()

    user = session.get("username")

    books_markup = render_template("__books.html", books=books, user=user)
    authors_markup = render_template("__authors.html", authors=authors, user=user)

    book_form = BookForm()
    book_form.authors.choices = [(a.id, a.name) for a in authors]
    book_authors_choices_markup = book_form.authors(id="id-input-book-authors")

    return jsonify(books_markup=books_markup,
                   authors_markup=authors_markup,
                   book_authors_choices_markup=book_authors_choices_markup,
                   message=message)


def login_required(f):

    @wraps(f)
    def f_login_checked():
        if session.get("username"):
            return f()
        else:
            flash(u'Залогиньтесь, чтобы воспользоваться этой функцией')
            return redirect(url_for("index"))

    return f_login_checked

@app.route("/")
def index():
    books = Book.query.all()
    authors = Author.query.all()

    book_form = BookForm()
    book_form.authors.choices = [(author.id, author.name) for author in authors]
    author_form = AuthorForm()
    user_form = UserForm()
    user = session.get('username')

    return render_template("index.html",
                           books=books,
                           authors=authors,
                           book_form=book_form,
                           author_form=author_form,
                           user_form=user_form,
                           user=user)


@app.route("/login", methods=["POST"])
def login():
    user_form = UserForm()
    if user_form.validate_on_submit():
        user = User.query.filter_by(username=user_form.username.data).first()
        print(user)
        if user and user.check_password(user_form.password.data):
            session['username'] = user.username
            return redirect(url_for("index"))
        else:
            flash(u"Неверный логин или пароль")
            return redirect(url_for("index"))
    else:
        flash(u"Неверный логин или пароль")
        return redirect(url_for("index"))


@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for("index"))


@app.route("/_search")
def search():
    query = request.args.get("search_query")
    print(type(query))

    sql_query = u"%{}%".format(query)

    books = Book.query.filter(Book.title.ilike(sql_query))
    authors = Author.query.filter(Author.name.ilike(sql_query))

    user = session.get("username")

    books_markup = render_template("__books.html", books=books, user=user)
    authors_markup = render_template("__authors.html", authors=authors, user=user)

    return jsonify(books_markup=books_markup, authors_markup=authors_markup)


@app.route("/_add_author", methods=["GET", "POST"])
@login_required
def add_author():
    author_form = AuthorForm(request.form)
    errors = ""
    if author_form.validate_on_submit():
        author = Author(name=author_form.name.data)

        bookid = author_form.book_id.data
        if bookid:
            book = Book.query.get(bookid)
            author.books.append(book)

        db_session.add(author)
        db_session.commit()
    else:
        errors = "<br>".join(reduce(lambda a,b: a+b, author_form.errors.values()))

    return json_books_and_authors(errors)

@app.route("/_edit_author", methods=["GET", "POST"])
@login_required
def edit_author():
    author_form = AuthorForm(request.form)
    errors = ""
    if author_form.validate_on_submit():
        id = author_form.id.data
        author = Author.query.get(id)
        authorname = author_form.name.data

        author.name = authorname

        db_session.add(author)
        db_session.commit()
    else:
        errors = "<br>".join(reduce(lambda a,b: a+b, author_form.errors.values()))

    return json_books_and_authors(errors)

@app.route("/_delete_author", methods=["GET", "POST"])
@login_required
def delete_author():
    authorid  = request.form.get("authorid")
    author = Author.query.get(authorid)
    db_session.delete(author)
    db_session.commit()
    return json_books_and_authors()


@app.route("/_add_book", methods=["GET", "POST"])
@login_required
def add_book():
    book_form = BookForm()
    book_form.authors.choices = [(a.id, a.name) for a in Author.query.all()]
    errors = ""
    if book_form.validate_on_submit():
        booktitle = book_form.booktitle.data
        author_ids = book_form.authors.data

        book = Book(title=booktitle)

        for author_id in author_ids:
            author = Author.query.get(author_id)
            book.authors.append(author)

        db_session.add(book)
        db_session.commit()
    else:
        errors = "<br>".join(reduce(lambda a,b: a+b, book_form.errors.values()))

    return json_books_and_authors(errors)


@app.route("/_edit_book", methods=["GET", "POST"])
@login_required
def edit_book():
    book_form = BookForm()
    book_form.authors.choices = [(a.id, a.name) for a in Author.query.all()]
    errors = ""
    if book_form.validate_on_submit():
        id = book_form.id.data
        book = Book.query.get(id)
        booktitle = book_form.booktitle.data
        author_ids = book_form.authors.data

        book.title = booktitle
        book.authors[:] = []
        for author_id in author_ids:
            author = Author.query.get(author_id)
            book.authors.append(author)

        db_session.add(book)
        db_session.commit()
    else:
        errors = "<br>".join(reduce(lambda a,b: a+b, book_form.errors.values()))

    return json_books_and_authors(errors)


@app.route("/_delete_book", methods=["GET", "POST"])
@login_required
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
    if not User.query.all():
        user = User("admin", "admin")
        db_session.add(user)
        db_session.commit()
    app.run()
