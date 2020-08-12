// import {videoUpdateLink,videoUpdateBlLink} from './video.js';

flag = true;
var canvas,
    canvas1,
    context,
    ii,
    img,
    url;
$(function () {

    var inputVideo, // tennis clip, baseball clip, surfing clip, skate clip
        sql_query, //
        videoMode, // Fix,dynamic
        predicates,
        action,
        classes,
        display_bl,
        path,
        path_bl; // human KICK smallBall


    var parameters = {
        "p": 0,
        "window": 0,
        "iou": 50
    };
    var parameters_bl = {
        "crt_k": 10,
        "iou": 50
    }
    var modal = document.getElementById("exampleModalLong");
    var param = document.getElementById("parametersLong");

    var iou_slider = document.getElementById("IoU");
    var iou_output = document.getElementById("IoU_text");
    parameters["iou"] = iou_slider.value;
    iou_output.innerHTML = iou_slider.value; // Display the default slider value
    iou_slider.oninput = function () {
        iou_output.innerHTML = this.value;
        parameters["iou"] = this.value
        $.ajax({
            url: "/accuracy",
            type: "get", // send it through get method
            data: {
                path: path,
                video: inputVideo,
                window_size: parameters["window"],
                iou_threshold: parameters["iou"]
            },
            success: function (response) {
                console.log(response)
                var sum = response["fn"] + response["fp"] + response["tp"];
                var data = [
                    {
                        "metric": "fn",
                        "value": response["fn"] / sum
                    }, {
                        "metric": "fp",
                        "value": response["fp"] / sum
                    }, {
                        "metric": "tp",
                        "value": response["tp"] / sum
                    }
                ];
                display_data(data, false);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }


    var iou_bl_slider = document.getElementById("IoU_bl");
    var iou_bl_output = document.getElementById("IoU_bl_text");
    parameters_bl["iou"] = iou_bl_slider.value;
    iou_bl_output.innerHTML = iou_bl_slider.value; // Display the default slider value
    iou_bl_slider.oninput = function () {
        iou_bl_output.innerHTML = this.value;
        parameters_bl["iou"] = this.value
        $.ajax({
            url: "/accuracy_bl",
            type: "get", // send it through get method
            data: {
                path: path_bl,
                video: inputVideo,
                window_size: parameters["window"],
                iou_threshold: parameters_bl["iou"]
            },
            success: function (response) {
                console.log(response)
                var sum = response["fn"] + response["fp"] + response["tp"];
                var data = [
                    {
                        "metric": "fn",
                        "value": response["fn"] / sum
                    }, {
                        "metric": "fp",
                        "value": response["fp"] / sum
                    }, {
                        "metric": "tp",
                        "value": response["tp"] / sum
                    }
                ];
                display_data(data, true);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }


    var p_slider = document.getElementById("select_p");
    var p_output = document.getElementById("select_p_text");
    parameters["p"] = p_slider.value;
    p_output.innerHTML = p_slider.value; // Display the default slider value
    p_slider.oninput = function () {
        p_output.innerHTML = this.value;
    }


    var window_slider = document.getElementById("window_size");
    var window_output = document.getElementById("window_size_text");
    parameters["window"] = window_slider.value;
    window_output.innerHTML = window_slider.value; // Display the default slider value
    window_slider.oninput = function () {
        window_output.innerHTML = this.value;
    }


    var crt_k_slider = document.getElementById("crt_k");
    var crt_k_output = document.getElementById("crt_k_text");
    parameters_bl["crt_k"] = crt_k_slider.value;
    crt_k_output.innerHTML = crt_k_slider.value; // Display the default slider value
    crt_k_slider.oninput = function () {
        parameters_bl["crt_k"] = this.value;
        crt_k_output.innerHTML = this.value;
        $("#display_crt_k_text").html(parameters_bl["crt_k"]);
    }


    $("#radio").controlgroup();
    $("#radio_data").controlgroup();
    $("#radio_mode").controlgroup();
    $("#selectable").selectable();

    // init selection
    $(".modal_select").css("display", "none");


    // init video
    $("#video").css("display", "none");

    // init performance
    $("#dataviz").css("display", "none");
    $("#dataviz_bl").css("display", "none");
    $(".slidercontainer").css("display", "none");
    $(".slidercontainer_bl").css("display", "none");


    $(".display_parameter_bl").css("display", "none");

    $(".display_parameter").css("display", "none");


    $('#display_baseline').click(function () {
        display_bl = this.checked;
        console.log(display_bl)
    });


    // change part 3 with respect to part 1
    $('input[name="project"]').change(function () {
        $(".modal_select").css("display", "none");
        inputVideo = $('input[name="project"]:checked').val().toLowerCase();
        if (inputVideo == "washingdishesclip") {
            $("#select_p").attr('min', 0.001);
            $("#select_p").attr('max', 0.003);
            $("#select_p").attr('step', 0.001);
            $("#select_p").val(0.002);
            parameters["p"] = 0.002;

            $("#window_size").attr('min', 10);
            $("#window_size").attr('max', 30);
            $("#window_size").attr('step', 10);
            $("#window_size").val(20);
            parameters["window"] = 20;


            $("#crt_k").attr('min', 1);
            $("#crt_k").attr('max', 3);
            $("#crt_k").attr('step', 1);
            $("#crt_k").val(2);
            parameters_bl["crt_k"] = 2;
            $("#display_crt_k_text").html(2);
            $("#crt_k_text").html(2);



            $("#washingDishes").css("display", "inline");
            $("#washingDishes1").css("display", "inline");
        }
        if (inputVideo == "surfingandvolleyballclip") {

            $("#select_p").attr('min', 0.005);
            $("#select_p").attr('max', 0.015);
            $("#select_p").attr('step', 0.005);
            $("#select_p").val(0.01)
            parameters["p"] = 0.01;

            $("#window_size").attr('min', 5);
            $("#window_size").attr('max', 15);
            $("#window_size").attr('step', 5);
            $("#window_size").val(10);
            parameters["window"] = 10;

            $("#crt_k").attr('min', 3);
            $("#crt_k").attr('max', 7);
            $("#crt_k").attr('step', 2);
            $("#crt_k").val(5);
            parameters_bl["crt_k"] = 5;
            $("#display_crt_k_text").html(5);
            $("#crt_k_text").html(5);


            $('#surfing').css("display", "inline");
            $('#surfing1').css("display", "inline");
            $('#volleyball').css("display", "inline");
            $('#volleyball1').css("display", "inline");


        }
    });

    // map = new Map();
    // $("table tr").click(function () {
    //     $(this).closest('tr').find('td').each(function (i) {
    //         if (map.has($(this).text())) {
    //             map.delete($(this).text());
    //             $(this).closest('tr').children('td,th').css('background-color', '#FFFFFF');
    //         } else {
    //             $(this).closest('tr').children('td,th').css('background-color', '#33FFB8');
    //             map.set($(this).text(), 1);
    //         }
    //     });
    // });

    // pull modal
    $('#predicates_button').bind('click', function () {
        if (inputVideo && videoMode) {
            modal.style.display = "block";
        } else {
            alert("Please select video source and mode");
        }
    });

    $('#parameters_button').bind('click', function () {
        if (inputVideo && videoMode) {
            param.style.display = "block";
            $('.parameterSelect > input').each(function () {
                $(this)[0].value = parameters[$(this)[0].name];
                $(this)[0].oninput();
            });
        } else {
            alert("Please select video source and mode");
        }
    });


    $('input[name="action_checkbox"]').change(function () {
        $(".class_select").css("display", "none");
        $('input[name="class_checkbox"]').prop('checked', false);
        $('#predicate').html("");
        action = $('input[name="action_checkbox"]:checked')[0].id.toLowerCase();
        console.log(action)
        if (action == "washingdishes") {
            $("#knife").css("display", "inline");
            $("#knife1").css("display", "inline");
        }
        if (action == "surfing") {
            $("#surfingBoard").css("display", "inline");
            $("#surfingBoard1").css("display", "inline");
        }
        if (action == "volleyball") {
            $("#volleyball_class").css("display", "inline");
            $("#volleyball_class1").css("display", "inline");
        }

    });
    // hidden param
    $('#param_button').bind('click', function () {
        param.style.display = "none";

    });

    // hidden modal
    $('#modal_button').bind('click', function () {
        modal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == param) {
            param.style.display = "none";
        }
    };
    $("#param_save").bind("click", function () {
        $('.parameterSelect > input').each(function () {
            parameters[$(this)[0].name] = $(this)[0].value;
        });
        console.log(parameters["p"])
        $("#display_p_text").html(parameters["p"]);
        param.style.display = "none";
    })

    $("#back_button").bind("click", function () {
        location.reload();
        $("#Display").css("display", "none");
        $("#Selection").css("display", "block");

    })

    // save predicates
    $("#save").bind('click', function () {
        predicates = $('#predicate').text();
        console.log(predicates.length);
        if (predicates == "") {
            alert("Empty predicate");
            return;
        }
        sql_query = queries_per_filter_predicates(videoMode, inputVideo, action, classes);
        $("#sql_text").html(sql_query);
        modal.style.display = "none";
    });

    // gets the input video and defines the query
    // modal checkbox
    $('input[name="class_checkbox"]').change(function () {
        var checked_classes = $('input[name="class_checkbox"]:checked');
        classes = new Array(checked_classes.length);
        for (var i = 0; i < checked_classes.length; i++) {
            classes[i] = checked_classes[i].id;
        }
        console.log(classes);
        if (classes.length > 0) {
            if (action == "washingdishes") {
                $('#predicate').html("Washing " + classes.join(", "));
            }
            if (action == "volleyball") {
                $('#predicate').html("Playing volleyball");
            }
            if (action == "surfing") {
                $('#predicate').html("Surfing");
            }
        } else {
            $('#predicate').html("");
        }

    });


    // select speed of frames
    $('input[name="mode"]').change(function () {
        if ($('input[name="mode"]:checked').val() == "Dynamic") {
            videoMode = "dynamic";
            $("#select_p_container").css("display", "none");
            console.log("here")
        } else {
            videoMode = "fixed";
            $("#select_p_container").css("display", "block");
        }
    });


    // select to run the
    $("#run").click(function () {
        if (predicates == "") {
            alert("Empty predicate");
            return;
        }
        $("#video").css("display", "none");
        $("#video_bl").css("display", "none");
        $("#dataviz").css("display", "none");
        $("#dataviz_bl").css("display", "none");
        $(".slidercontainer").css("display", "none");
        $(".slidercontainer_bl").css("display", "none");
        $(".display_parameter").css("display", "none");
        $(".display_parameter_bl").css("display", "none");

        path = "data/";
        path_bl = "data/";
        if (display_bl) {
            if (inputVideo === "washingdishesclip") {
                var file = "washingDishes_bl_" + parameters_bl["crt_k"].toString();
                path_bl = path_bl + "washingDishes_bl/" + file;
            }
            if (inputVideo === "surfingandvolleyballclip") {
                if (action == "volleyball") {
                    var file = "volleyball_bl_" + parameters_bl["crt_k"].toString();
                    path_bl = path_bl + "volleyball_bl/" + file;
                } else {
                    var file = "surfing_bl_" + parameters_bl["crt_k"].toString();
                    path_bl = path_bl + "surfing_bl/" + file;
                }
            }
        }
        console.log(path_bl)

        if (videoMode === "fixed") {
            if (inputVideo === "washingdishesclip") {
                var file = "washingDishes_fix_" + parameters["window"].toString() + "_" + parameters["p"].toString();
                path = path + "washingDishes_fix/" + file;
            }
            if (inputVideo === "surfingandvolleyballclip") {
                if (action == "volleyball") {
                    var file = "volleyball_fix_" + parameters["window"].toString() + "_" + parameters["p"].toString();
                    path = path + "volleyball_fix/" + file;

                } else {
                    var file = "surfing_fix_" + parameters["window"].toString() + "_" + parameters["p"].toString();
                    path = path + "surfing_fix/" + file;

                }
            }
            $("#display_p_text").html(parameters["p"]);

            if (display_bl) {
                playBlVideo(path_bl);
            }

            playFixVideo(path);

        }

        if (videoMode === "dynamic") {

            if (inputVideo === "washingdishesclip") {
                var file = "washingDishes_dynamic_" + parameters["window"].toString();
                path = path + "washingDishes_dynamic/" + file;
            } else if (inputVideo === "surfingandvolleyballclip") {
                if (action == "volleyball") {
                    var file = "volleyball_dynamic_" + parameters["window"].toString();
                    path = path + "volleyball_dynamic/" + file;
                } else {
                    var file = "surfing_dynamic_" + parameters["window"].toString();
                    path = path + "surfing_dynamic/" + file;

                }
            }

            playDynamicVideo(path);

            if (display_bl) {
                playBlVideo(path_bl);
            }
        }


        // display
        $.ajax({
            url: "/accuracy", type: "get", // send it through get method
            data: {
                path: path,
                video: inputVideo,
                window_size: parameters["window"],
                iou_threshold: parameters["iou"]
            },
            success: function (response) {
                var sum = response["fn"] + response["fp"] + response["tp"];
                var data = [
                    {
                        "metric": "fn",
                        "value": response["fn"] / sum
                    }, {
                        "metric": "fp",
                        "value": response["fp"] / sum
                    }, {
                        "metric": "tp",
                        "value": response["tp"] / sum
                    }
                ];
                display_data(data, false);
            }
        });


        if (display_bl) {
            $.ajax({
                url: "/accuracy_bl", type: "get", // send it through get method
                data: {
                    path: path_bl,
                    video: inputVideo,
                    window_size: parameters["window"],
                    iou_threshold: parameters_bl["iou"]
                },
                success: function (response) {
                    var sum = response["fn"] + response["fp"] + response["tp"];
                    var data = [
                        {
                            "metric": "fn",
                            "value": response["fn"] / sum
                        }, {
                            "metric": "fp",
                            "value": response["fp"] / sum
                        }, {
                            "metric": "tp",
                            "value": response["tp"] / sum
                        }
                    ];
                    display_data(data, true);
                }
            });

        }
    });

});
