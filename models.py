from werkzeug import generate_password_hash, check_password_hash

from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

author_book = Table('author_book', Base.metadata,
                          Column('book_id', Integer, ForeignKey('book.id')),
                          Column('author_id', Integer, ForeignKey('author.id'))
                         )

class Book(Base):
    __tablename__ = 'book'
    id = Column(Integer, primary_key=True)
    title = Column(String(128), unique=True)

    def __init__(self, title):
        self.title = title

    def __repr__(self):
        return "id: {}, title: {}".format(unicode(self.id), unicode(self.title))

    def get_authornames_list(self):
        return map(lambda a: unicode(a.name), self.authors)

    def get_authorids_str(self):
        return ",".join(map(lambda a: unicode(a.id), self.authors))


class Author(Base):
    __tablename__ = 'author'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True)
    books = relationship('Book', secondary=author_book, backref='authors')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "id: {}, title: {}".format(unicode(self.id), unicode(self.name))

    def get_booktitles_list(self):
        return map(lambda b: unicode(b.title), self.books)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(128), unique=True)
    pwdhash = Column(String(100))

    def __init__(self, username, password):
        self.username = username
        self.set_password(password)

    def __repr__(self):
        return self.username

    def set_password(self, password):
        self.pwdhash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.pwdhash, password)
