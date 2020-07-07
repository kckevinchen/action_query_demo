//enable/disable table rows
function modal_checkbox_display(car, truck, person, bus, human, object) {
    if (truck && person && car && bus) {
        document.getElementById('row1').style.display = '';
        document.getElementById('row2').style.display = '';
        document.getElementById('row3').style.display = '';
        document.getElementById('row4').style.display = '';
        document.getElementById('row5').style.display = '';
        document.getElementById('row6').style.display = '';
        document.getElementById('row_val1').style.display = '';
        document.getElementById('row_val2').style.display = '';
        document.getElementById('row_val3').style.display = '';
        document.getElementById('row_val4').style.display = '';
        document.getElementById('row_val5').style.display = '';
        document.getElementById('row_val6').style.display = '';
    } else if (car && person) {
        document.getElementById('row1').style.display = '';
        document.getElementById('row2').style.display = '';
        document.getElementById('row_val1').style.display = '';
        document.getElementById('row_val2').style.display = '';
        document.getElementById('row3').style.display = 'none';
        document.getElementById('row4').style.display = 'none';
        document.getElementById('row5').style.display = 'none';
        document.getElementById('row6').style.display = 'none';
        document.getElementById('row_val3').style.display = 'none';
        document.getElementById('row_val4').style.display = 'none';
        document.getElementById('row_val5').style.display = 'none';
        document.getElementById('row_val6').style.display = 'none';
    } else if (truck && person) {
        document.getElementById('row1').style.display = '';
        document.getElementById('row2').style.display = '';
        document.getElementById('row_val1').style.display = '';
        document.getElementById('row_val2').style.display = '';
        document.getElementById('row3').style.display = 'none';
        document.getElementById('row4').style.display = 'none';
        document.getElementById('row5').style.display = 'none';
        document.getElementById('row6').style.display = 'none';
        document.getElementById('row_val3').style.display = 'none';
        document.getElementById('row_val4').style.display = 'none';
        document.getElementById('row_val5').style.display = 'none';
        document.getElementById('row_val6').style.display = 'none';
    } else if (car && truck) {
        document.getElementById('row1').style.display = '';
        document.getElementById('row2').style.display = '';
        document.getElementById('row_val1').style.display = '';
        document.getElementById('row_val2').style.display = '';
        document.getElementById('row3').style.display = 'none';
        document.getElementById('row4').style.display = 'none';
        document.getElementById('row5').style.display = 'none';
        document.getElementById('row6').style.display = 'none';
        document.getElementById('row_val3').style.display = 'none';
        document.getElementById('row_val4').style.display = 'none';
        document.getElementById('row_val5').style.display = 'none';
        document.getElementById('row_val6').style.display = 'none';
    } else if (car && bus) {
        document.getElementById('row1').style.display = '';
        document.getElementById('row2').style.display = '';
        document.getElementById('row_val1').style.display = '';
        document.getElementById('row_val2').style.display = '';
        document.getElementById('row3').style.display = 'none';
        document.getElementById('row4').style.display = 'none';
        document.getElementById('row5').style.display = 'none';
        document.getElementById('row6').style.display = 'none';
        document.getElementById('row_val3').style.display = 'none';
        document.getElementById('row_val4').style.display = 'none';
        document.getElementById('row_val5').style.display = 'none';
        document.getElementById('row_val6').style.display = 'none';
    } else if (human && object) {
        document.getElementById('row1').style.display = '';
        document.getElementById('row2').style.display = 'none';
        document.getElementById('row3').style.display = 'none';
        document.getElementById('row4').style.display = 'none';
        document.getElementById('row5').style.display = 'none';
        document.getElementById('row6').style.display = 'none';
        document.getElementById('row_val1').style.display = '';
        document.getElementById('row_val2').style.display = 'none';
        document.getElementById('row_val3').style.display = 'none';
        document.getElementById('row_val4').style.display = 'none';
        document.getElementById('row_val5').style.display = 'none';
        document.getElementById('row_val6').style.display = 'none';
    } else {
        document.getElementById('row1').style.display = 'none';
        document.getElementById('row2').style.display = 'none';
        document.getElementById('row3').style.display = 'none';
        document.getElementById('row4').style.display = 'none';
        document.getElementById('row5').style.display = 'none';
        document.getElementById('row6').style.display = 'none';
        document.getElementById('row_val1').style.display = 'none';
        document.getElementById('row_val2').style.display = 'none';
        document.getElementById('row_val3').style.display = 'none';
        document.getElementById('row_val4').style.display = 'none';
        document.getElementById('row_val5').style.display = 'none';
        document.getElementById('row_val6').style.display = 'none';
    }
}

function modal_row_innertext(inputVideo, filter_type, car, truck, person, bus, human, object) {
    if (inputVideo === "baseball clip") {
        if (filter_type === "action") {
            if (human && object) {
                document.getElementById('row_val1').innerText = 'human THROW baseball';
            }
        }
    } else if (inputVideo === "tennis clip") {
        if (filter_type === "action") {
            if (human && object) {
                document.getElementById('row_val1').innerText = 'human KICK tennis ball';
            }
        }
    } else if (inputVideo === "surfing clip") {
        if (filter_type === "action") {
            if (human && object) {
                document.getElementById('row_val1').innerText = 'human RIDE surfboard';
            }
        }
    } else if (inputVideo === "skate clip") {
        if (filter_type === "action") {
            if (human && object) {
                document.getElementById('row_val1').innerText = 'human RIDE skateboard';
            }
        }
    } else {
        if (filter_type === 'localisation') {
            if (car && truck && person) {
                document.getElementById('row_val1').innerText = 'car LEFT TO A truck';
                document.getElementById('row_val2').innerText = 'truck LEFT TO A car';
                document.getElementById('row_val3').innerText = 'car LEFT TO A person';
                document.getElementById('row_val4').innerText = 'person LEFT TO A car';
                document.getElementById('row_val5').innerText = 'truck LEFT TO A person';
                document.getElementById('row_val6').innerText = 'person LEFT TO A truck';
            } else if (car && person) {
                document.getElementById('row_val1').innerText = 'car LEFT TO A person';
                document.getElementById('row_val2').innerText = 'person LEFT TO A car';
            } else if (truck && person) {
                document.getElementById('row_val1').innerText = 'truck LEFT TO A person';
                document.getElementById('row_val2').innerText = 'person LEFT TO A truck';
            } else if (truck && car) {
                document.getElementById('row_val1').innerText = 'car LEFT TO A truck';
                document.getElementById('row_val2').innerText = 'truck LEFT TO A car';
            } else if (car && bus) {
                document.getElementById('row_val1').innerText = 'car LEFT TO A bus';
                document.getElementById('row_val2').innerText = 'car BEHIND car';
            }
        } else if (filter_type === "class count") {
            if (car && bus) {
                document.getElementById('row_val1').innerText = 'car > 1';
                document.getElementById('row_val2').innerText = 'bus == 1';
            } else if (car) {
                document.getElementById('row_val1').innerText = 'car > 1';
            } else if (bus) {
                document.getElementById('row_val1').innerText = 'bus == 1';
            }
        } else if (filter_type === "action") {
            if (human && object) {
                document.getElementById('row_val1').innerText = 'human KICK smallBall';
            }
        }
    }
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

function queries_per_filter_predicates(val, inputVideo, map) {
    if (val == "count") {
        query = "SELECT cameraID, count(frameID), C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
    } else if (val == 'localisation' && map != 0) {
        map.forEach(function (item, key, mapObj) {
            query = "SELECT cameraID, frameID, C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WHERE " + key + " WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
        });
    } else if (val == 'class count' && map != 0) {
        map.forEach(function (item, key, mapObj) {
            query = "SELECT cameraID, frameID, C1(F1(vehBox1)) AS vehType1, C3(F3(SignBox1)) AS SignType2, C2(F2(vehBox1)) AS vehColor FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, vehBox1 USING VehDetector, SignBox1 USING SignDetector) WHERE " + key + " WINDOW HOPING (SIZE 5000, ADVANCE BY 5000)";
        });
    } else if (val == 'action' && map != 0) {
        map.forEach(function (item, key, mapObj) {
            var res = key.split(" ");
            query = "SELECT " + "cameraID, frameID, C1(F1(HumanBox1)) AS HumanType1, C2(F2(BallBox1)) AS BallType1 FROM (PROCESS " + inputVideo + " PRODUCE cameraID, frameID, HumanBox1 USING HumanDetector, BallBox1 USING BallDetector) WHERE HumanType1 = " + res[0] + " AND BallType1 = " + res[2] + " AND INTERACTION(HumanType1, BallType1) = " + res[1];
        });
    }
    return query;
}