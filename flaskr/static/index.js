flag = true;
var canvas, canvas1, context, ii, img, url;
$(function () {
    var inputVideo,  // tennis clip, baseball clip, surfing clip, skate clip
        results_id,
        sql_query,  //
        refreshInterval,  // 0.7, 1000
        videoMode,  // normal, slow
        filter_type,  // localisation, action
        predicates;  // human KICK smallBall
    var modal = document.getElementById("exampleModalLong");

    var tennis_opt_slow_video = document.getElementById("tennis_opt_slow");
    var baseball_opt_slow_video = document.getElementById("baseball_opt_slow");
    var tennis_bf_slow_video = document.getElementById("tennis_bf_slow");
    var baseball_bf_slow_video = document.getElementById("baseball_bf_slow");
    var tennis_opt_video = document.getElementById("tennis_opt");
    var baseball_opt_video = document.getElementById("baseball_opt");
    var tennis_bf_video = document.getElementById("tennis_bf");
    var baseball_bf_video = document.getElementById("baseball_bf");

    var surfing_opt_video = document.getElementById("surfing_opt");
    var surfing_opt_slow_video = document.getElementById("surfing_opt_slow");
    var surfing_bf_video = document.getElementById("surfing_bf");
    var surfing_bf_slow_video = document.getElementById("surfing_bf_slow");
    var skate_opt_video = document.getElementById("skate_opt");
    var skate_opt_slow_video = document.getElementById("skate_opt_slow");
    var skate_bf_video = document.getElementById("skate_bf");
    var skate_bf_slow_video = document.getElementById("skate_bf_slow");


    $("#radio").controlgroup();
    $("#radio_data").controlgroup();
    $("#radio_video").controlgroup();
    $("#selectable").selectable();

    // init selection
    $("#cou_label").css("display", "none");
    $("#cls_label").css("display", "none");
    $("#loc_label").css("display", "none");

    // init video
    $("#tennis_opt_slow").css("display", "none");
    $("#baseball_opt_slow").css("display", "none");
    $("#tennis_opt").css("display", "none");
    $("#baseball_opt").css("display", "none");
    $("#tennis_bf_slow").css("display", "none");
    $("#baseball_bf_slow").css("display", "none");
    $("#tennis_bf").css("display", "none");
    $("#baseball_bf").css("display", "none");

    $("#surfing_opt_slow").css("display", "none");
    $("#skate_opt_slow").css("display", "none");
    $("#surfing_opt").css("display", "none");
    $("#skate_opt").css("display", "none");
    $("#surfing_bf_slow").css("display", "none");
    $("#skate_bf_slow").css("display", "none");
    $("#surfing_bf").css("display", "none");
    $("#skate_bf").css("display", "none");

    // init performance
    $("#my_dataviz").css("display", "none");
    $("#my_dataviz_bf").css("display", "none");

    // init time
    $("#time").css("display", "none");
    $("#time_bf").css("display", "none");

    // change part 3 with respect to part 1
    $('input[name="project"]').change(function () {
        inputVideo = $('input[name="project"]:checked').val().toLowerCase();
        if (inputVideo == "baseball clip") {
            $("#cou").css("display", "none");
            $("#cou1").css("display", "none");
        } else if (inputVideo == "tennis clip") {
            $("#cou").css("display", "none");
            $("#cou1").css("display", "none");
        } else if (inputVideo == "surfing clip") {
            $("#cou").css("display", "none");
            $("#cou1").css("display", "none");
        } else if (inputVideo == "skate clip") {
            $("#cou").css("display", "none");
            $("#cou1").css("display", "none");
        } else {
        }
    });

    map = new Map();
    $("table tr").click(function () {
        $(this).closest('tr').find('td').each(function (i) {
            if (map.has($(this).text())) {
                map.delete($(this).text());
                $(this).closest('tr').children('td,th').css('background-color', '#FFFFFF');
            } else {
                $(this).closest('tr').children('td,th').css('background-color', '#33FFB8');
                map.set($(this).text(), 1);
            }
        });
    });

    // change predicates
    $('input[name="project1"]').change(function () {
        val = $('input[name="project"]:checked').val().toLowerCase();  // tennis clip, baseball clip, surfing clip, skate clip
        change_class_visibility_modal(val);

        filter_type = $('input[name="project1"]:checked').val().toLowerCase();  // localisation, action
        if (filter_type === 'count') {
            sql_query = queries_per_filter_predicates(filter_type, inputVideo, 0);
            $("#sql_text").html(sql_query);
            $("#isTruck1").css("display", "inline");
            $("#isPerson1").css("display", "inline");
            $("#isCar1").css("display", "inline");
            $("#isBus1").css("display", "inline");
            $("#isHuman1").css("display", "none");
            $("#isObject1").css("display", "none");
        } else if (filter_type === 'class count') {
            $("#isCar1").css("display", "inline");
            $("#isBus1").css("display", "inline");
            $("#isTruck1").css("display", "none");
            $("#isPerson1").css("display", "none");
            $("#isHuman1").css("display", "none");
            $("#isObject1").css("display", "none");
        } else if (filter_type === 'localisation') {
            $("#isCar1").css("display", "inline");
            $("#isBus1").css("display", "inline");
            $("#isTruck1").css("display", "none");
            $("#isPerson1").css("display", "none");
            $("#isHuman1").css("display", "none");
            $("#isObject1").css("display", "none");
        } else if (filter_type === "action") {
            $("#isTruck1").css("display", "none");
            $("#isPerson1").css("display", "none");
            $("#isCar1").css("display", "none");
            $("#isBus1").css("display", "none");
            $("#isHuman1").css("display", "inline");
            $("#isObject1").css("display", "inline");
        }
        predicates_button_visibility(inputVideo)
    });

    // pull modal
    $('#predicates_button').bind('click', function () {
        modal.style.display = "block";
        // $('#exampleModalLong').css('display','block');
        $('#exampleModalLong input').each(function () {
            $(this).val("");
        });
        var car = document.getElementById('isCar').checked;
        var truck = document.getElementById('isTruck').checked;
        var person = document.getElementById('isPerson').checked;
        var bus = document.getElementById('isBus').checked;
        var human = document.getElementById('isHuman').checked;
        var object = document.getElementById('isObject').checked;
        modal_checkbox_display(car, truck, person, bus, human, object);
        modal_row_innertext(inputVideo, filter_type, car, truck, person, bus, human, object);
    });

    // hidden modal
    $('#modal_button').bind('click', function () {
        modal.style.display = "none";
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // save predicates
    $("#save").bind('click', function () {
        map.forEach(function (item, key, mapObj) {
            predicates = key
        });
        remove_all_links();
        sql_query = queries_per_filter_predicates(filter_type, inputVideo, map);
        $("#sql_text").html(sql_query);
        modal.style.display = "none";
    });

    // gets the input video and defines the query
    // modal checkbox
    $('input[name="modal_checkbox"]').change(function () {
        var car = document.getElementById('isCar').checked;
        var truck = document.getElementById('isTruck').checked;
        var person = document.getElementById('isPerson').checked;
        var bus = document.getElementById('isBus').checked;
        var human = document.getElementById('isHuman').checked;
        var object = document.getElementById('isObject').checked;
        modal_checkbox_display(car, truck, person, bus, human, object);
        modal_row_innertext(inputVideo, filter_type, car, truck, person, bus, human, object);
    });

    //select speed of frames
    $('input[name="mode"]').change(function () {
        ($('input[name="mode"]:checked').val() == "Normal mode") ? refreshInterval = 0.7 : refreshInterval = 1000;
        ($('input[name="mode"]:checked').val() == "Normal mode") ? videoMode = "normal" : videoMode = "slow";
    });

    // select to run the optimised version
    $("#opt").click(function () {
        out_canv = "canvas1";
        if (refreshInterval == 300) {
            refreshInterval = 0.7;
        } else if (refreshInterval == 1001) {
            refreshInterval = 1000;
        }
        if (typeof predicates === 'undefined') {
            predicates = ""
        }

        $("#tennis_opt_slow").css("display", "none");
        $("#baseball_opt_slow").css("display", "none");
        $("#baseball_opt").css("display", "none");
        $("#tennis_opt").css("display", "none");
        $("#surfing_opt_slow").css("display", "none");
        $("#surfing_opt").css("display", "none");
        $("#skate_opt_slow").css("display", "none");
        $("#skate_opt").css("display", "none");
        if (videoMode === "normal") {
            if (inputVideo === "tennis clip") {
                $("#tennis_opt").css("display", "inline");
                tennis_opt_video.play();
                baseball_opt_video.pause();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.pause();
                surfing_opt_video.pause();
                surfing_opt_slow_video.pause();
                skate_opt_video.pause();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("tennis", "opt");
                time("tennis", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else if (inputVideo === "baseball clip") {
                $("#baseball_opt").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.play();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.pause();
                surfing_opt_video.pause();
                surfing_opt_slow_video.pause();
                skate_opt_video.pause();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("baseball", "opt");
                time("baseball", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else if (inputVideo === "surfing clip") {
                $("#surfing_opt").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.pause();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.pause();
                surfing_opt_video.play();
                surfing_opt_slow_video.pause();
                skate_opt_video.pause();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("surfing", "opt");
                time("surfing", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else if (inputVideo === "skate clip") {
                $("#skate_opt").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.pause();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.pause();
                surfing_opt_video.pause();
                surfing_opt_slow_video.pause();
                skate_opt_video.play();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("skate", "opt");
                time("skate", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else {
                console.log("no input video");
            }
        } else if (videoMode === "slow") {
            if (inputVideo === "tennis clip") {
                $("#tennis_opt_slow").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.pause();
                tennis_opt_slow_video.play();
                baseball_opt_slow_video.pause();
                surfing_opt_video.pause();
                surfing_opt_slow_video.pause();
                skate_opt_video.pause();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("tennis", "opt");
                time("tennis", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else if (inputVideo === "baseball clip") {
                $("#baseball_opt_slow").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.pause();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.play();
                surfing_opt_video.pause();
                surfing_opt_slow_video.pause();
                skate_opt_video.pause();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("baseball", "opt");
                time("baseball", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else if (inputVideo === "surfing clip") {
                $("#surfing_opt_slow").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.pause();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.pause();
                surfing_opt_video.pause();
                surfing_opt_slow_video.play();
                skate_opt_video.pause();
                skate_opt_slow_video.pause();
                accuracy_bar_opt("surfing", "opt");
                time("surfing", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else if (inputVideo === "skate clip") {
                $("#skate_opt_slow").css("display", "inline");
                tennis_opt_video.pause();
                baseball_opt_video.pause();
                tennis_opt_slow_video.pause();
                baseball_opt_slow_video.pause();
                surfing_opt_video.pause();
                surfing_opt_slow_video.pause();
                skate_opt_video.pause();
                skate_opt_slow_video.play();
                accuracy_bar_opt("skate", "opt");
                time("skate", "opt");
                $("#my_dataviz").css("display", "none");
                $("#time").css("display", "none");
            } else {
                console.log("no input video");
            }
        } else {
            console.log("no mode")
        }


        // canvas = document.getElementById("canvas");
        // canvas1 = document.getElementById(out_canv);
        // context = canvas.getContext("2d");
        // Myfunction(refreshInterval, inputVideo, predicates);
        // init(true, 0, refreshInterval, inputVideo, "accopt", predicates, "");
    });

    // select to run the brute force version
    $("#bru").click(function () {
        out_canv = "canvas3";
        (refreshInterval == 0.7) ? refreshInterval = 300 : refreshInterval = 1001;
        if (typeof predicates === 'undefined') {
            predicates = ""
        }
        if (videoMode === "normal") {
            if (inputVideo === "tennis clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "none");
                $("#baseball_bf").css("display", "none");
                $("#tennis_bf").css("display", "inline");
                tennis_bf_slow_video.pause();
                tennis_bf_video.play();
                baseball_bf_slow_video.pause();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.pause();
                surfing_bf_video.pause();
                skate_bf_slow_video.pause();
                skate_bf_video.pause();
                accuracy_bar_bru("tennis", "bru");
                time_bf("tennis", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else if (inputVideo === "baseball clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "none");
                $("#tennis_bf").css("display", "none");
                $("#baseball_bf").css("display", "inline");
                tennis_bf_slow_video.pause();
                tennis_bf_video.pause();
                baseball_bf_slow_video.pause();
                baseball_bf_video.play();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.pause();
                surfing_bf_video.pause();
                skate_bf_slow_video.pause();
                skate_bf_video.pause();
                accuracy_bar_bru("baseball", "bru");
                time_bf("baseball", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else if (inputVideo === "surfing clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "none");
                $("#tennis_bf").css("display", "none");
                $("#baseball_bf").css("display", "none");
                tennis_bf_slow_video.pause();
                tennis_bf_video.pause();
                baseball_bf_slow_video.pause();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "inline");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.pause();
                surfing_bf_video.play();
                skate_bf_slow_video.pause();
                skate_bf_video.pause();
                accuracy_bar_bru("surfing", "bru");
                time_bf("surfing", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else if (inputVideo === "skate clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "none");
                $("#tennis_bf").css("display", "none");
                $("#baseball_bf").css("display", "none");
                tennis_bf_slow_video.pause();
                tennis_bf_video.pause();
                baseball_bf_slow_video.pause();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "inline");
                surfing_bf_slow_video.pause();
                surfing_bf_video.pause();
                skate_bf_slow_video.pause();
                skate_bf_video.play();
                accuracy_bar_bru("skate", "bru");
                time_bf("skate", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else {
                console.log("no input video");
            }
        } else if (videoMode === "slow") {
            if (inputVideo === "tennis clip") {
                $("#tennis_bf_slow").css("display", "inline");
                $("#baseball_bf_slow").css("display", "none");
                $("#baseball_bf").css("display", "none");
                $("#tennis_bf").css("display", "none");
                tennis_bf_slow_video.play();
                tennis_bf_video.pause();
                baseball_bf_slow_video.pause();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.pause();
                surfing_bf_video.pause();
                skate_bf_slow_video.pause();
                skate_bf_video.pause();
                accuracy_bar_bru("tennis", "bru");
                time_bf("tennis", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else if (inputVideo === "baseball clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "inline");
                $("#tennis_bf").css("display", "none");
                $("#baseball_bf").css("display", "none");
                tennis_bf_slow_video.pause();
                tennis_bf_video.pause();
                baseball_bf_slow_video.play();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.pause();
                surfing_bf_video.pause();
                skate_bf_slow_video.pause();
                skate_bf_video.pause();
                accuracy_bar_bru("baseball", "bru");
                time_bf("baseball", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else if (inputVideo === "surfing clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "none");
                $("#tennis_bf").css("display", "none");
                $("#baseball_bf").css("display", "none");
                tennis_bf_slow_video.pause();
                tennis_bf_video.pause();
                baseball_bf_slow_video.pause();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "inline");
                $("#skate_bf_slow").css("display", "none");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.play();
                surfing_bf_video.pause();
                skate_bf_slow_video.pause();
                skate_bf_video.pause();
                accuracy_bar_bru("surfing", "bru");
                time_bf("surfing", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else if (inputVideo === "skate clip") {
                $("#tennis_bf_slow").css("display", "none");
                $("#baseball_bf_slow").css("display", "none");
                $("#tennis_bf").css("display", "none");
                $("#baseball_bf").css("display", "none");
                tennis_bf_slow_video.pause();
                tennis_bf_video.pause();
                baseball_bf_slow_video.pause();
                baseball_bf_video.pause();
                $("#surfing_bf_slow").css("display", "none");
                $("#skate_bf_slow").css("display", "inline");
                $("#surfing_bf").css("display", "none");
                $("#skate_bf").css("display", "none");
                surfing_bf_slow_video.pause();
                surfing_bf_video.pause();
                skate_bf_slow_video.play();
                skate_bf_video.pause();
                accuracy_bar_bru("skate", "bru");
                time_bf("skate", "bru");
                $("#my_dataviz_bf").css("display", "none");
                $("#time_bf").css("display", "none");
            } else {
                console.log("no input video");
            }
        } else {
            console.log("no mode")
        }


        // canvas = document.getElementById("canvas2");
        // canvas1 = document.getElementById(out_canv);
        // context = canvas.getContext("2d");
        // Myfunction(refreshInterval, inputVideo, predicates);
        // init(true, 0, refreshInterval, inputVideo, "accopt1", predicates, "");
    });

});

//display the frames as video
function init(flag, ii, refreshInterval, inputVideo, results_id, predicates, bbox) {
    img = new Image();
    if (flag) {
        var margin = {top: 5, right: 5, bottom: 5, left: 5}, width = 250, height = 250
        img.onload = function () {
            canvas.setAttribute("width", 390);
            canvas.setAttribute("height", 280);
            context.drawImage(this, 0, 0, 400, 280);
            context.beginPath();
            bbox = bbox.split(",");
            var tmp = [];
            var x = -1;
            for (let i = 0; i < bbox.length; i++) {
                tmp.push(parseFloat(bbox[i]));
                if (i == x + 4) {

                    context.rect(tmp[0] * 0.40625, tmp[1] * 0.518518519, (tmp[2] - tmp[0]) * 0.40625, (tmp[3] - tmp[1]) * 0.518518519);
                    x = x + 4;
                    tmp = [];
                }
            }
            context.lineWidth = 5;
            context.strokeStyle = 'black';
            context.stroke();

            if (true) {
                var now = new Date();
                var text = now.toLocaleDateString() + " " + now.toLocaleTimeString();
                var maxWidth = 100;
                var x = img.width - 10 - maxWidth;
                var y = img.height - 10;
                context.strokeStyle = 'black';
                context.lineWidth = 2;
                context.strokeText(text, x, y, maxWidth);
                context.fillStyle = 'white';
                context.fillText(text, x, y, maxWidth);
            }
        };
        $.ajax("{{ url_for('get_image_prediction') }}", {
            type: "POST",
            data: JSON.stringify({
                'count': ii,
                'input': inputVideo,
                'interval': refreshInterval,
                'predicates': predicates
            }, null, '\t'),
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                var obj = res.result;
                img_location = '/static/images/' + inputVideo + '/';
                url = img_location.concat(String(obj.value));
                (obj.prediction) ? $("#" + out_canv).css("background-color", "green") : $("#" + out_canv).css("background-color", "red");
                if (typeof obj.bbox !== 'undefined' && obj.bbox != null) {
                    var bbox_array = [];
                    obj.bbox.forEach(function (item, key, mapObj) {
                        bbox_array.push(item[0]);
                        bbox_array.push(item[1]);
                        bbox_array.push(item[2]);
                        bbox_array.push(item[3]);
                    });
                }
                ii = ii + 1;
                refresh(flag, ii, refreshInterval, inputVideo, results_id, predicates, bbox_array);
            },
            error: function (jqXHR, exception) {
                time_performance(refreshInterval);
                accuracy_pie(refreshInterval, results_id, predicates)
            }
        });
    }
}

//fix the speed of displaying video
function Myfunction(refreshInterval, inputVideo, predicates) {
    $.ajax("{{ url_for('get_accuracy') }}", {
        type: "POST",
        data: JSON.stringify({'input': inputVideo, 'interval': refreshInterval, 'predicates': predicates}, null, '\t'),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            var obj1 = res.result;
            $("#hid_div").text(String(obj1));
        }
    });
}


