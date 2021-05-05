from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
import os
import json
from datetime import datetime
import base64
import random

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
        c.execute('''CREATE TABLE IF NOT EXISTS multimodallabels 
                (N1, N2, N3, R1, R2, R3, C1, C2, C3, caption, firstimg,
                secondimg, dfgan, dfganbaselineimg, yeschecked, nochecked, date)    
                ''')
        conn.commit()

    def insert_into_db(conn, json_data):
        try:
            cursor = conn.cursor()
            sqlite_insert_query = """INSERT INTO multimodallabels 
                        ('N1', 'N2', 'N3', 'R1', 'R2', 'R3', 'C1', 'C2', 'C3', 
                            'caption', 'firstimg',
                            'secondimg', 'dfgan', 'dfganbaselineimg', 'yeschecked', 'nochecked', 'date') 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );"""

            date_string = datetime.now().strftime("%m-%d-%YT%H:%M:%S")

            # data_tuple = (file_name, label, file_type, date_string)
            data_tuple = ( json_data['NState'][0], json_data['NState'][1], json_data['NState'][2],
                json_data['RState'][0], json_data['RState'][1], json_data['RState'][2],
                json_data['CState'][0], json_data['CState'][1], json_data['CState'][2],
                json_data['caption'], json_data['firstimg'],
                json_data['secondimg'], json_data['dfganimg'], json_data['dfganbaselineimg'], 
                json_data['yeschecked'], json_data['nochecked'], date_string
            )

            print(data_tuple)

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

    db_file = 'labels_multimodal.db'

    conn = create_connection(db_file)
    create_table(db_file, conn)

    @app.route('/get_data', methods=['POST'])
    def get_data():
        data_label_file = './data/test_generated_data.json'
        with open(data_label_file, 'r', encoding='utf-8') as f:
            data_labels = json.loads(f.read())

        random.shuffle(data_labels)
        response = jsonify({'data': data_labels})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @app.route('/send_data', methods=['POST'])
    def send_data():
        insert_into_db(conn, request.json)
        return {}

    return app

if __name__ == '__main__':
   app = create_app()
   app.run(host='0.0.0.0', port='5000', debug=True)