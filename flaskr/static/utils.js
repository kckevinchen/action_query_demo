//enable/disable table rows
function calculate_accuracy(fp_arr,tp_arr,fn_arr,tp_arr){
    var precision, recall, f1, fp_rate;


if (sum(fp_arr) + sum(tp_arr)) == 0 or (sum(fn_arr) + sum(tp_arr)) == 0:
precision, recall, f1, fp_rate = 0, 0, 0, 0
else:
precision = sum(tp_arr) / (sum(fp_arr) + sum(tp_arr))
recall = sum(tp_arr) / (sum(fn_arr) + sum(tp_arr))
if sum(fp_arr) + sum(tn_arr) == 0:
    fp_rate = 0
else:
    fp_rate = sum(fp_arr) / (sum(fp_arr) + sum(tn_arr))
if (precision + recall) == 0:
f1 = 0
else:
f1 = 2 * precision * recall / (precision + recall)
print("precision:%.5f, recall:%.5f, f1:%.5f, fp_rate:%.5f" % (precision, recall, f1, fp_rate))


}
//refresh frane
function refresh(flag, ii, refreshInterval, inputVideo, results_id, predicates, bbox) {

    var bbox_array = [];
    if (typeof bbox !== 'undefined') {
        bbox.forEach(function (item, key, mapObj) {
            bbox_array.push(item);
        });
    }
    img.src = url + "?t=" + new Date().getTime();
    setTimeout("init(" + flag + " , " + ii + " , " + refreshInterval + " , '" + inputVideo + "' , '" + results_id + "' , '" + predicates + "' , '" + bbox_array + "' )", refreshInterval);
}

// change the visibility of predicate selection on advanced queries
function predicates_button_visibility(inputVideo) {
    var algorithm = $('input[name="project1"]:checked').val();
    var count_query = "SELECT cameraID, count(frameID), C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
    if (algorithm == "Count") {
        $('#sql_text').val(count_query);
        $("#predicates_button").css("visibility", "hidden");
    } else {
        $("#predicates_button").css("visibility", "visible");
    }
}


function change_class_visibility_modal(val) {
    $("#isCar").prop('disabled', false);
    $("#isTruck").prop('disabled', false);
    $("#isBus").prop('disabled', false);
    $("#isPerson").prop('disabled', false);

    if (val == "detrac") {
        $("#isPerson").prop('disabled', true);
    } else if (val == 'aquarium') {
        $("#isCar").prop('disabled', true);
        $("#isTruck").prop('disabled', true);
        $("#isBus").prop('disabled', true);
    } else if (val == "square") {
        $("#isPerson").prop('disabled', true);
    }
}

function queries_per_filter_predicates(val, inputVideo, action,classes) {
    // if (val == "count") {
        query = "SELECT cameraID, count(frameID), C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
    // } else if (val == 'localisation' && map != 0) {
    //     map.forEach(function (item, key, mapObj) {
    //         query = "SELECT cameraID, frameID, C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WHERE " + key + " WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
    //     });
    // } else if (val == 'class count' && map != 0) {
    //     map.forEach(function (item, key, mapObj) {
    //         query = "SELECT cameraID, frameID, C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WHERE " + key + " WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
    //     });
    // } else if (val == 'action' && map != 0) {
    //     map.forEach(function (item, key, mapObj) {
    //         var res = key.split(" ");
    //         query = "SELECT " + "cameraID, frameID, C1(F1(HumanBox1)) AS HumanType1, C2(F2(BallBox1)) AS BallType1 FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, HumanBox1 USING HumanDetector, BallBox1 USING BallDetector) WHERE HumanType1 = " + res[0] + " AND BallType1 = " + res[2] + " AND INTERACTION(HumanType1, BallType1) = " + res[1];
    //     });
    // }
    return query;
}