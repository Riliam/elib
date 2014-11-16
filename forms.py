# -*- coding: utf-8 -*-
from flask.ext.wtf import Form
from wtforms import StringField, SelectMultipleField, SubmitField, HiddenField
from wtforms import PasswordField
from wtforms.validators import Length, Required


class BookForm(Form):
    id = HiddenField()
    booktitle = StringField(u'Название книги',
                            validators=[Required(message=u"Название книги - обязательное поле"),
                                        Length(min=4, max=256, message=u"Название книги должно быть от 4 до 256 символов")])
    authors = SelectMultipleField(u'Авторы книги', coerce=int)
    submit = SubmitField(u'Сохранить')


class AuthorForm(Form):
    id = HiddenField()
    book_title = HiddenField()
    name = StringField(u'Имя автора',
                       validators=[Required(message=u"Имя автора - обязательное поле"),
                                   Length(min=4, max=128, message=u"Имя автора должно быть от 4 до 128 символов")])
    submit = SubmitField(u'Сохранить')


class UserForm(Form):
    username = StringField(u'Логин',
                           validators=[Required(), Length(min=4, max=128)])
    password = PasswordField(u'Пароль',
                             validators=[Required(), Length(min=4, max=128)])
    submit = SubmitField(u'Войти')
