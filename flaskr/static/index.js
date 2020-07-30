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
        display_bl; // human KICK smallBall


    $('#display_baseline').click(function () {
        display_bl = this.checked;
        console.log(display_bl)
    });


    var parameters = {
        "p": 0,
        "window": 0,
        "iou": 50
    };
    var parameters_bl = {
        "frame_k": 10,
        "clip_k": 10,
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


    var iou_slider = document.getElementById("IoU_bl");
    var iou_output = document.getElementById("IoU_bl_text");
    parameters_bl["iou"] = iou_slider.value;
    iou_output.innerHTML = iou_slider.value; // Display the default slider value
    iou_slider.oninput = function () {
        iou_output.innerHTML = this.value;
        parameters["iou"] = this.value
        $.ajax({
            url: "/accuracy_bl",
            type: "get", // send it through get method
            data: {
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


    var clip_k_slider = document.getElementById("clip_k");
    var clip_k_output = document.getElementById("clip_k_text");
    parameters_bl["clip_k"] = clip_k_slider.value;
    $("#display_clip_k_text").html(parameters_bl["clip_k"]);
    clip_k_output.innerHTML = clip_k_slider.value; // Display the default slider value
    clip_k_slider.oninput = function () {
        parameters_bl["clip_k"] = this.value;
        clip_k_output.innerHTML = this.value;
        $("#display_clip_k_text").html(parameters_bl["clip_k"]);
    }


    var frame_k_slider = document.getElementById("frame_k");
    var frame_k_output = document.getElementById("frame_k_text");
    parameters_bl["frame_k"] = frame_k_slider.value;
    $("#display_frame_k_text").html(parameters_bl["frame_k"]);
    frame_k_output.innerHTML = frame_k_slider.value; // Display the default slider value
    frame_k_slider.oninput = function () {
        parameters_bl["frame_k"] = this.value;
        frame_k_output.innerHTML = this.value;
        $("#display_frame_k_text").html(parameters_bl["frame_k"]);
    }




    var washingDishesVideo_bl = document.getElementById("washingDishesVideo_bl");
    var washingDishesVideo = document.getElementById("washingDishesVideo");

    $("#radio").controlgroup();
    $("#radio_data").controlgroup();
    $("#radio_mode").controlgroup();
    $("#selectable").selectable();

    // init selection
    $(".modal_select").css("display", "none");


    // init video
    $("#washingDishesVideo").css("display", "none");

    // init performance
    $("#dataviz").css("display", "none");
    $("#dataviz_bl").css("display", "none");
    $(".slidercontainer").css("display", "none");
    $(".slidercontainer_bl").css("display", "none");
    

    $(".display_parameter_bl").css("display","none");

    $(".display_parameter").css("display","none");


    // change part 3 with respect to part 1
    $('input[name="project"]').change(function () {
        inputVideo = $('input[name="project"]:checked').val().toLowerCase();
        if (inputVideo == "washingdishesclip") {
            $("#washingDishes").css("display", "inline");
            $("#washingDishes1").css("display", "inline");
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
        action = $('input[name="action_checkbox"]:checked')[0].id.toLowerCase();
        if (action == "washingdishes") {
            $("#knife").css("display", "inline");
            $("#knife1").css("display", "inline");
            $("#faucet").css("display", "inline");
            $("#faucet1").css("display", "inline");
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
                $('#predicate').html("washing dishes with " + classes.join(", "));
            }
        } else {
            $('#predicate').html("");
        }
    });


    // select speed of frames
    $('input[name="mode"]').change(function () {
        ($('input[name="mode"]:checked').val() == "Fixed") ? refreshInterval = 0.7 : refreshInterval = 1000;
        ($('input[name="mode"]:checked').val() == "Dynamic") ? videoMode = "dynamic" : videoMode = "fixed";
    });


    // select to run the
    $("#run").click(function () {
        if (predicates == "") {
            alert("Empty predicate");
            return;
        }
        $("#washingDishesVideo").css("display", "none");
        $("#washingDishesVideo_bl").css("display", "none");
        $("#dataviz").css("display", "none");
        $("#dataviz_bl").css("display", "none");
        $(".slidercontainer").css("display", "none");
        $(".slidercontainer_bl").css("display", "none");
        $(".display_parameter").css("display", "none");
        $(".display_parameter_bl").css("display", "none");
        if (videoMode === "fixed") {
            if (inputVideo === "washingdishesclip") {
                $("#Display").css("display", "block");
                $("#Selection").css("display", "none");
                $(".display_parameter").css("display", "block");
                $("#display_p_text").html(parameters["p"]);
                if (display_bl) {
                    $("#washingDishesVideo_bl").css("display", "inline");
                    $(".display_parameter_bl").css("display", "block");
                    washingDishesVideo_bl.play();
                }
                $("#washingDishesVideo").css("display", "inline");
                washingDishesVideo.play();


                if(display_bl){
                    $.ajax({
                        url: "/accuracy_bl", type: "get", // send it through get method
                        data: {
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
                            display_data(data,true);
                        }
                    });

                }
                $.ajax({
                    url: "/accuracy", type: "get", // send it through get method
                    data: {
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
                        display_data(data,false);
                    }
                });
            }
        } else {
            console.log("no mode")
        }
    });

});
