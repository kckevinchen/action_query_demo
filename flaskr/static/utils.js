//enable/disable table rows

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

function queries_per_filter_predicates(videoMode, inputVideo, action, classes) {
    var query;

    // if (val == "count") {
    query = "SELECT cameraID, frameID FROM (PROCESS "
     + inputVideo + 
     " PRODUCE cameraID, frameID USING " + videoMode + " mode) WHERE action = " + action + " AND class = " + classes;
  
    return query;
}