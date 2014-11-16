elib
====
### Для работы необходимы:
`virtualenv`, `sqlite3`
### Команды для локального развертывания

    git clone https://github.com/Riliam/elib.git
    cd elib
    virtualenv venv
    . venv/bin/activate
    pip install -r requirements.txt
    sqlite3 db.sqlite3 < create_db.sql
    sqlite3 db.sqlite3 < populate_db.sql
    python app.py

### Развернутое приложение на heroku.com
http://floating-beach-6335.herokuapp.com/
