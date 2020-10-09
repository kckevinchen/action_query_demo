"""
Get the number of true positives, false positives, and false negatives
Four modes:
    1) [traditional] used by traditional action detection method:
        ...
    2) [improved] consider true and predicted action snippets separately:
        ...
    3) [clip] consider each clip (with size od_window) individually
    4) [frame] consider each frame individually

[frame]        precision:0.84606, recall:0.81818, f1:0.83189, fp_rate:0.19145
[clip]         precision:0.84474, recall:0.81735, f1:0.83082, fp_rate:0.19296
[traditional]  precision:0.50000, recall:0.39130, f1:0.43902, fp_rate:1.00000
[improved]     precision:1.00000, recall:0.73913, f1:0.85000, fp_rate:0.00000
"""
import json
import os
STATIC_PATH = "./static/"
def get_iou(a, b):
    """ Get IOU of predicted frames and true labeled frames. """
    if len(set(a).union(set(b))) > 0:
        return len(set(a).intersection(set(b))) / len(set(a).union(set(b)))
    return 0


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


def get_labeled_snippet(video_, cate, video_info_, fps):
    labeled_snippets_ = []
    for ann in video_info_[video_]['annotation']:  # iterate all the annotation
        if ann['label'] == cate:
            if ann['segment']:
                labeled_frames_ = list(range(int(ann['segment'][0] * fps), int(ann['segment'][1] * fps)))
                if labeled_frames_:
                    labeled_snippets_.append(labeled_frames_)
    return labeled_snippets_


def get_labeled_frames_all(video_, video_info_, fps):
    labeled_frames_all = []
    for ann in video_info_[video_]['annotation']:  # iterate all the annotation
        if ann['segment']:
            labeled_frames_all += list(range(int(ann['segment'][0] * fps), int(ann['segment'][1] * fps)))
    return labeled_frames_all



def traditional_mode(iou_threshold, result_snippet_, labeled_snippet_):
    tp, all_relevant, all_selected = 0, 0, len([sni for sni in result_snippet_ if sni])
    for labeled_frames_ in labeled_snippet_:
        if labeled_frames_:
            all_relevant += 1
            for snippet_ in result_snippet_:
                if get_iou(snippet_, labeled_frames_) >= iou_threshold:
                    tp += 1
    fp = max(0, all_selected - tp)
    fn = max(0, all_relevant - tp)
    # if all_selected == 0:
    #     return 0, 0, 0
    return tp, fp, fn



def flatten(x):
    tmp = []
    for t in x:
        for j in t:
            tmp.append(j)
    tmp = sorted(list(set(tmp)))
    return tmp


def get_tp_fp_fn(video_, cate, video_info_, result_clips_, iou_threshold, od_window_size, total_clips):
    """
    Get the number of true positives, false positives, and false negatives
    Four modes:
        1) [traditional] used by traditional action detection method:
            ...
        2) [improved] consider true and predicted action snippets separately:
            ...
        3) [clip] consider each clip (with size od_window) individually
        4) [frame] consider each frame individually
    :param video_: video name, e.g., 'abc.mp4'
    :param cate: category, e.g., 'MINE'
    :param video_info_: information of videos
    :param result_clips_: list of the index of result clips
    :param iou_threshold: threshold of IOU
    :param od_window_size: window size for frame-level scan stats
    :param total_clips: total number of clips of this video
    :return: number of true positives, false positives, and false negatives
    """
    result_clips_sorted = sorted(list(set(flatten(result_clips_))))
    result_frames_all = []
    for clip in result_clips_sorted:
        result_frames_all += [i + (clip - 1) * od_window_size for i in list(range(1, od_window_size + 1))]
    fps = video_info_[video_]['fps']
    result_snippets_ = get_result_snippets(result_frames_all)
    labeled_snippets_ = get_labeled_snippet(video_, cate, video_info_, fps)
    labeled_frames_all = get_labeled_frames_all(video_, video_info_, fps)
    return traditional_mode(iou_threshold, result_snippets_, labeled_snippets_)

def get_accuracy(path,video, iou_threshold, window_size):
    file = os.path.join(STATIC_PATH , path,"result.json")
    with open(file) as json_file:
        data = json.load(json_file)
        tp, fp, fn = get_tp_fp_fn(data["video"], data["cate"], data["video_info"],data["result_clips"], iou_threshold, data["od_window_size"], data["total_clips"])
    return {"tp":tp,"fp":fp,"fn":fn}

