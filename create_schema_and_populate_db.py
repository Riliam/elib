from models import Book, Author, author_book
from database import init_db, db_session

init_db()

db_session.execute(author_book.delete())
Book.query.delete()
Author.query.delete()

cookbook_book = Book(title="Python Cookbook")
learning_book = Book(title="Learning Python")
pocket_book = Book(title="Python Pocket Reference")
enlightment_book = Book(title="Code Complete")

bkj_author = Author(name="Brian K. Jones")
db_author = Author(name="David Beazley")
ml_author = Author(name="Mark Lutz")
sm_author = Author(name="Steve McConnell")

cookbook_book.authors.append(bkj_author)
cookbook_book.authors.append(db_author)
pocket_book.authors.append(ml_author)
learning_book.authors.append(ml_author)
enlightment_book.authors.append(sm_author)

db_session.add(cookbook_book)
db_session.add(learning_book)
db_session.add(pocket_book)
db_session.add(enlightment_book)

db_session.add(bkj_author)
db_session.add(db_author)
db_session.add(ml_author)
db_session.add(sm_author)

db_session.commit()
