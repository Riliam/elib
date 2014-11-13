# -*- coding: utf-8 -*-
from wtforms import Form, StringField
from wtforms.validators import DataRequired


class BookForm(Form):
    booktitle = StringField('booktitle', [DataRequired()])


class AuthorForm(Form):
    name = StringField('Имя автора', validators=[DataRequired()])
