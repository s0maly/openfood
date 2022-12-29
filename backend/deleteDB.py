from pymongo import MongoClient
from dns import *

from mongoengine import connect
from mongoengine import connect

DB_URI = "mongodb+srv://admindb:passer@cluster0.lpx7goj.mongodb.net/?retryWrites=true&w=majority"

db = connect(host=DB_URI)
db.drop_database('db_django')
