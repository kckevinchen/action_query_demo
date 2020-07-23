# coding=utf-8

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
# from flaskr.app.utils import get_pred_bbox, get_pred_accuracy
from app.metrics import get_accuracy

import os


app = Flask(__name__)
socket_io = SocketIO(app)


# @app.route("/accuracy", methods=['GET'])
# def get_accuracy():
#     return jsonify()


@app.route("/accuracy", methods=['GET'])
def accuracy():
    return jsonify()


@app.route('/index', methods=["GET"])
@app.route('/', methods=["GET"])
def main():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
