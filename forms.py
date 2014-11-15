# -*- coding: utf-8 -*-
from flask.ext.wtf import Form
from wtforms import StringField, SelectMultipleField, SubmitField, HiddenField
from wtforms import PasswordField
from wtforms.validators import DataRequired


class BookForm(Form):
    id = HiddenField()
    booktitle = StringField(u'Название книги', validators=[DataRequired()])
    authors = SelectMultipleField(u'Авторы книги', coerce=int)
    submit = SubmitField(u'Сохранить')


class AuthorForm(Form):
    name = StringField('Имя автора', validators=[DataRequired()])
    submit = SubmitField(u'Сохранить')


class UserForm(Form):
    username = StringField(u'Логин', validators=[DataRequired()])
    password = PasswordField(u'Пароль', validators=[DataRequired()])
    submit = SubmitField(u'Войти')
