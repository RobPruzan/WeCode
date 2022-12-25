# Welcome to the programmers chat site!

This messasging app specifically designed for coders to connect and share ideas.

## Setup

To get started, make sure you have Python and Typescript installed on your machine.
### Database 
Install neccesary dependencies for django postgres intergration (with brew)
```
brew install postgresql
```
Start up postgres
```
brew services start postgresql
```
Create db
```
createdb <db_name>
```
Create user and password
```
psql <db_name>
<db_name>=# CREATE USER <user> WITH PASSWORD '<password>'
<db_name>=# GRANT ALL PRIVILEGES ON DATABASE postgres TO <user>;
```
To confirm the role exists run the following commands and the role should appear
```
psql <db_name>
\ds
```

#### Python

1. Install the necessary requirements by running the following command:
```
pip install -r requirements.txt
```
2. Navigate to the backend directory:
```
cd backend
```
In settings.py replace your DATABASES with:
```
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "<db_name>",
        "USER": "<username>",
        "PASSWORD": "<password>",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```
3. Run the following commands to migrate the database and start the server:
```
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```
#### Typescript

1. Navigate to the web directory:
```
cd web
```
2. Install the necessary packages by running the following command:
```
npm install
```

3. Start the development server by running the following command:
```
npm run start
```
And that's it! You should now be able to access the social network at http://localhost:3000.

Thanks for choosing the Engineer's Social Network!
