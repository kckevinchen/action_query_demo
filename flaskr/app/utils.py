# coding=utf-8

import json
import os
STATIC_PATH = "./static/"


def get_p(path):
    print(path)
    frame_file = os.path.join(STATIC_PATH , path,"frame_p.json")
    clip_file = os.path.join(STATIC_PATH , path,"clip_p.json")
    with open(frame_file) as json_file:
        frame_data = json.load(json_file)
    with open(clip_file) as json_file:
        clip_data = json.load(json_file)
    
    return {"frame":frame_data, "clip":clip_data}


def flatten(x):
    tmp = []
    for t in x:
        for j in t:
            tmp.append(j)
    tmp = sorted(list(set(tmp)))
    return tmp

def get_result_snippets(result_frames_all):
    result_snippets_ = []  # result snippets
    if result_frames_all:
        index = 1
        temp = [result_frames_all[0]]
        while index < len(result_frames_all):
            if result_frames_all[index] - result_frames_all[index - 1] > 1:
                result_snippets_.append(temp)
                temp = []
            temp.append(result_frames_all[index])
            index += 1
        if temp:
            result_snippets_.append(temp)
    return result_snippets_

def get_flatten_data(path):
    file = os.path.join(STATIC_PATH , path,"result.json")
    with open(file) as json_file:
        data = json.load(json_file)
        result_clips_ = data["result_clips"]
        od_window_size = int(data["od_window_size"])
        total_clips = int(data["total_clips"])*od_window_size
        result_clips_sorted = sorted(list(set(flatten(result_clips_))))
        result_frames_all = []
        for clip in result_clips_sorted:
            result_frames_all += [i + (clip - 1) * od_window_size for i in list(range(1, od_window_size + 1))]
        snippets  = [[ss[0], ss[-1]] for ss in get_result_snippets(result_frames_all)]
        video_array = []
        critical_index = []
        base = 0
        video_total = 0
        if(len(snippets) == 0):
            video_array.append([1,total_clips])
        else:
            if(snippets[0][0]>1):
                video_array.append([1,snippets[0][0]-1])
                base = 1
        i= 0
        for snippet in snippets:
            video_array.append(snippet)
            critical_index.append(base+i)
            i += 1
            if(len(snippets)>i):
                video_array.append([snippet[1]+1,snippets[i][0]-1])
                base += 1
            else:
                if(snippet[1] < total_clips):
                    video_array.append([snippet[1]+1,total_clips])
        
        video_total = total_clips/2
    return {"result":video_array,"index":critical_index,"total":total_clips,"video_total": video_total}


def get_offline_rank(video,k):
    if(video == "coffee_and_cigarettes"):
        path = os.path.join(STATIC_PATH , "data", "coffee_and_cigarettes")
    else:
        path = os.path.join(STATIC_PATH , "data", "free_solo")
    
    result = {}

    with open(os.path.join(path,"result.json")) as json_file:
        with open(os.path.join(path,"score.json")) as score_file:
            data = json.load(json_file)
            scores = json.load(score_file)
            for i in range(1,int(k)+1):
                index = str(i)
                result[i] = {}
                result[i]["name"] =  data[index]
                result[i]["score"] = round(scores[str(data[index])],2)
                if(video == "coffee_and_cigarettes"):
                    result[i]["path"] = os.path.join("coffee_and_cigarettes","{}.mp4".format(data[index]))
                else:
                    result[i]["path"] = os.path.join("free_solo","{}.mp4".format(data[index]))
    print(result)
    return result 



def get_offline_query(video,k):
    if(video == "coffee_and_cigarettes"):
        f = os.path.join(STATIC_PATH , "data", "coffee_and_cigarettes","query_process_{}.json".format(k))
    else:
        f = os.path.join(STATIC_PATH , "data", "free_solo","query_process_{}.json".format(k))
    with open(f) as json_file:
        data = json.load(json_file)
    
    return data

