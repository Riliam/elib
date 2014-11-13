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
        return "id: {}, title: {}".format(self.id, self.title)

    def get_authornames_list(self):
        return map(lambda a: a.name, self.authors)


class Author(Base):
    __tablename__ = 'author'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True)
    books = relationship('Book', secondary=author_book, backref='authors')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "id: {}, title: {}".format(self.id, self.name)

    def get_booktitles_list(self):
        return map(lambda b: "\"{}\"".format(b.title), self.books)
