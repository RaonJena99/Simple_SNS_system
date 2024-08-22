from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import sqlite3

con = sqlite3.connect('SNS.db',check_same_thread=False)
cur = con.cursor()

app = FastAPI()

app.mount("/", StaticFiles(directory="frontend",html=True), name="static")