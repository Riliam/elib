from sqlalchemy import Column, Integer, String
from database import Base

class Book(Base):
    __tablename__ = 'book'
    id = Column(Integer, primary_key=True)
    title = Column(String(128), unique=True)

    def __init__(self, title):
        self.title = title

    def __repr__(self):
        return "id: {}, title: {}".format(self.id, self.title)


class Author(Base):
    __tablename__ = 'author'
    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "id: {}, title: {}".format(self.id, self.name)
