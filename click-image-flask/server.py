from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
import os
import json
from datetime import datetime
import base64

import sqlite3
from sqlite3 import Error

def create_app():

    app = Flask(__name__)
    CORS(app)

    def create_connection(db_file):
        conn = None
        try: 
            conn = sqlite3.connect(db_file, check_same_thread=False)
        except Error as e:
            print(e)
        
        return conn

    def create_table(db_file, conn):
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS labels 
                (filename, label, filetype, date)    
                ''')
        conn.commit()

    def insert_into_db(conn, file_name, file_type, label):
        try:
            cursor = conn.cursor()
            sqlite_insert_query = """INSERT INTO labels 
                        ('filename', 'label', 'filetype', 'date') 
                        VALUES (?, ?, ?, ?);"""

            date_string = datetime.now().strftime("%m-%d-%YT%H:%M:%S")

            data_tuple = (file_name, label, file_type, date_string)
            cursor.execute(sqlite_insert_query, data_tuple)
            print(cursor.rowcount, "Record inserted successfully into table")
            conn.commit() 

        except Error as e:
            print (e)

    def img_to_str(img):
        with open(img, 'rb') as binary_file:
            binary_file_data = binary_file.read()
            base64_encoded_data = base64.b64encode(binary_file_data)
            return base64_encoded_data.decode('utf-8')

    def text_file_to_str(file):
        with open (file, "r") as myfile:
            return myfile.read()

    image_dir = 'data/images/'
    text_dir = './data/text/'
    image_label_file = './data/image_labels.json'
    text_label_file = './data/text_labels.json'
    db_file = 'labels.db'
    
    image_files = [os.path.join(image_dir, fn) for fn in os.listdir(image_dir)]
    text_files = [os.path.join(text_dir, fn) for fn in os.listdir(text_dir)]

    img_str_arr = []
    text_str_arr = []
    for i in image_files:
        img_str_arr.append(img_to_str(i))
    for i in text_files:
        text_str_arr.append(text_file_to_str(i))

    with open(image_label_file, 'r', encoding='utf-8') as f:
        image_labels = json.loads(f.read())
    with open(text_label_file, 'r', encoding='utf-8') as f:
        text_labels = json.loads(f.read())

    conn = create_connection(db_file)
    create_table(db_file, conn)

    @app.route('/get_data', methods=['POST'])
    def get_data():
        data_json = {
                    'image_files': img_str_arr,
                    'image_dir': image_files,
                    'text_files': text_str_arr,
                    'text_dir': text_files,
                    'image_labels': image_labels,
                    'text_labels': text_labels
                    }

        return data_json

    @app.route('/grab_data', methods=['POST'])
    def grab_data():
        file_name = request.json['filename']
        if file_name.endswith(('.jpg', '.jpeg', '.png')):
            file_type = 'image'
        else:
            file_type = 'text'
        label = request.json['label']

        insert_into_db(conn, file_name, file_type, label)
        return {}

    return app

if __name__ == '__main__':
   app = create_app()
   app.run(host='0.0.0.0', port='5000', debug=True)