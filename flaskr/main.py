# coding=utf-8

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
# from flaskr.app.utils import get_pred_bbox, get_pred_accuracy
from app.metrics import get_accuracy
from app.utils import get_p,get_flatten_data

import os


app = Flask(__name__)
socket_io = SocketIO(app)


# @app.route("/accuracy", methods=['GET'])
# def get_accuracy():
#     return jsonify()

@app.route("/accuracy_bl", methods=['GET'])
@app.route("/accuracy", methods=['GET'])
def accuracy():
    video = (request.args.get("video",None))
    path = (request.args.get("path",None))
    window_size = float(request.args.get("window_size",None))
    iou_threshold = float(request.args.get("iou_threshold",None))

    return get_accuracy(path,video,iou_threshold,window_size)


@app.route("/get_flatten", methods=['GET'])
def flatten():
    path = (request.args.get("path",None))

    return get_flatten_data(path)


@app.route("/get_p", methods=['GET'])
def p():
    path = (request.args.get("path",None))

    return get_p(path)


@app.route('/index', methods=["GET"])
@app.route('/', methods=["GET"])
def main():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
