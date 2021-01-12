# coding=utf-8

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
# from flaskr.app.utils import get_pred_bbox, get_pred_accuracy
from app.metrics import get_accuracy
from app.utils import get_p,get_flatten_data,get_offline_rank,get_offline_query

import os


application = Flask(__name__)
socket_io = SocketIO(application)


# @app.route("/accuracy", methods=['GET'])
# def get_accuracy():
#     return jsonify()

@application.route("/accuracy_bl", methods=['GET'])
@application.route("/accuracy", methods=['GET'])
def accuracy():
    video = (request.args.get("video",None))
    path = (request.args.get("path",None))
    window_size = float(request.args.get("window_size",None))
    iou_threshold = float(request.args.get("iou_threshold",None))

    return get_accuracy(path,video,iou_threshold,window_size)


@application.route("/get_flatten", methods=['GET'])
def flatten():
    path = (request.args.get("path",None))

    return get_flatten_data(path)

@application.route("/get_se", methods=['GET'])
def get_sequence():
    video = (request.args.get("video",None))
    k = (request.args.get("k",None))
    return get_offline_rank(video,k)


@application.route("/get_p", methods=['GET'])
def p():
    path = (request.args.get("path",None))

    return get_p(path)


@application.route('/online', methods=["GET"])
@application.route('/', methods=["GET"])
def main():
    return render_template("index.html")

@application.route('/offline', methods=["GET"])
def offline():
    return render_template("offline.html")

@application.route('/get_query_process', methods=["GET"])
def query_process():
    video = (request.args.get("video",None))
    k = (request.args.get("k",None))
    return get_offline_query(video,k)

# coffee_and_cigarettes
if __name__ == '__main__':
    application.debug = True
    application.run()
