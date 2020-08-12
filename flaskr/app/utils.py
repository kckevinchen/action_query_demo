# coding=utf-8

import json
import os
STATIC_PATH = "./static/"


def get_p(path):
    file = os.path.join(STATIC_PATH , path,"p.json")
    with open(file) as json_file:
        data = json.load(json_file)
    return data