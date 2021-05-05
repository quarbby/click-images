from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS, cross_origin
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
        c.execute(
            '''CREATE TABLE IF NOT EXISTS originallabels
            (caption, firstimg, yeschecked, date)
            '''
        )

        c.execute(
            '''CREATE TABLE IF NOT EXISTS imglabels
            (imgtype, imgname, naturalness, relevance, correctness, sum, date)
            '''
        )

        conn.commit()

    def insert_into_db(conn, json_data):
        date_string = datetime.now().strftime("%m-%d-%YT%H:%M:%S")

        # Insert original label
        try:
            cursor = conn.cursor()
            original_insert_query = """INSERT INTO originallabels
                                    ('caption', 'firstimg', 'yeschecked', 'date')
                                    VALUES (?,?,?,?);
                                    """
            data_tuple = ( json_data['caption'], json_data['firstimg'], json_data['yeschecked'], date_string
                        )

            cursor.execute(original_insert_query, data_tuple)
            print(cursor.rowcount, "Record inserted successfully into original labels")
            conn.commit() 
        except Error as e:
            print(e)

        # Insert count for each image
        try:
            cursor = conn.cursor()
            sqlite_insert_query = """INSERT INTO imglabels
                                    ('imgtype', 'imgname', 'naturalness', 'relevance', 'correctness', 'sum', 'date')
                                    VALUES (?,?,?,?,?,?,?);
                                    """

            sum = json_data['NState'] + json_data['RState'] + json_data['CState']
            data_tuple_img = ( json_data['imgtype'], json_data['imgname'], json_data['NState'], 
                            json_data['RState'], json_data['CState'], sum, date_string
                        )

            cursor.execute(sqlite_insert_query, data_tuple_img)
            print(cursor.rowcount, "Records inserted successfully into sqlite labels")
            conn.commit()

        except Error as e:
            print(e)

    def img_to_str(img):
        with open(img, 'rb') as binary_file:
            binary_file_data = binary_file.read()
            base64_encoded_data = base64.b64encode(binary_file_data)
            return base64_encoded_data.decode('utf-8')

    db_file = 'labels_multimodal_binary.db'

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
    @cross_origin()
    def send_data():
        insert_into_db(conn, request.json)
        return {}

    return app

if __name__ == '__main__':
   app = create_app()
   app.run(host='0.0.0.0', port='5000', debug=True)