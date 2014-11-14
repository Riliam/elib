# -*- coding: utf-8 -*-
from flask.ext.wtf import Form
from wtforms import StringField, SelectMultipleField, SubmitField
from wtforms.validators import DataRequired


class BookForm(Form):
    booktitle = StringField(u'Название книги', validators=[DataRequired()])
    authors = SelectMultipleField(u'Авторы книги', coerce=int,
                                  validators=[DataRequired()])
    submit = SubmitField(u'Сохранить')

class AuthorForm(Form):
    name = StringField('Имя автора', validators=[DataRequired()])
