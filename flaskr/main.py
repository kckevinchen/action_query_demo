# coding=utf-8

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
# from flaskr.app.utils import get_pred_bbox, get_pred_accuracy
from app.utils import get_pred_bbox, get_pred_accuracy

import os


app = Flask(__name__)
socket_io = SocketIO(app)


@app.route("/accuracy", methods=['POST'])
def get_accuracy():
    return jsonify()


@app.route("/prediction", methods=['POST'])
def get_image_prediction():
    return jsonify()

@app.route('/architecture', methods=["GET"])
def architecture():
    return render_template("architecture.html")

@app.route('/index', methods=["GET"])
@app.route('/', methods=["GET"])
def hello():
    return render_template("index.html")


if __name__ == '__main__':
    socket_io.run(app, port=5099, debug=True)
