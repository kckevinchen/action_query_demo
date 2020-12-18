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
        sql_query, // Output sql query
        videoMode, // Fix,dynamic
        predicates, // current predicates
        action, // Selected action
        classes, // Selected object classes
        display_bl, // wether to display brute force method
        path, // path to access video
        path_bl; // path to access brute force video

    classes = []

    var parameters = {
        "frame_p": 0,
        "clip_p": 0,
        "clip_size": 0,
        "iou": 0
    };
    var parameters_bl = {
        "frame_crt_k": 0,
        "clip_crt_k": 0,
        "iou": 0
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
                window_size: parameters["clip_size"],
                iou_threshold: parameters["iou"]
            },
            success: function (response) {
                console.log(response)
                var sum = response["fn"] + response["fp"] + response["tp"];
                var data = [
                    {
                        "metric": "tp",
                        "value": response["tp"] / sum
                    },
                    {
                        "metric": "fn",
                        "value": response["fn"] / sum
                    }, {
                        "metric": "fp",
                        "value": response["fp"] / sum
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
                window_size: parameters["clip_size"],
                iou_threshold: parameters_bl["iou"]
            },
            success: function (response) {
                console.log(response)
                var sum = response["fn"] + response["fp"] + response["tp"];
                var data = [
                    {
                        "metric": "tp",
                        "value": response["tp"] / sum
                    },
                    {
                        "metric": "fn",
                        "value": response["fn"] / sum
                    }, {
                        "metric": "fp",
                        "value": response["fp"] / sum
                    }
                ];
                display_data(data, true);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }


    var clip_p_slider = document.getElementById("select_clip_p");
    var clip_p_output = document.getElementById("select_clip_p_text");
    parameters["clip_p"] = clip_p_slider.value;
    clip_p_output.innerHTML = clip_p_slider.value; // Display the default slider value
    clip_p_slider.oninput = function () {
        clip_p_output.innerHTML = this.value;
    }

    var frame_p_slider = document.getElementById("select_frame_p");
    var frame_p_output = document.getElementById("select_frame_p_text");
    parameters["frame_p"] = frame_p_slider.value;
    frame_p_output.innerHTML = frame_p_slider.value; // Display the default slider value
    frame_p_slider.oninput = function () {
        frame_p_output.innerHTML = this.value;
    }



    var window_slider = document.getElementById("clip_size");
    var window_output = document.getElementById("clip_size_text");
    parameters["clip_size"] = window_slider.value;
    window_output.innerHTML = window_slider.value; // Display the default slider value
    window_slider.oninput = function () {
        window_output.innerHTML = this.value;
    }

    var action_map = [1,5,10];
    var object_map = [1,10,50];

    // var frame_slider = document.getElementById("frame_crt_k");
    // var frame_output = document.getElementById("frame_crt_k_text");
    // parameters_bl["frame_crt_k"] = valMap[frame_slider.value]; 
    // frame_output.innerHTML = valMap[frame_slider.value]; // Display the default slider value
    // frame_slider.oninput = function () {
    //     frame_output.innerHTML = valMap[this.value];
    //     parameters_bl["frame_crt_k"] = valMap[this.value]; 
    // }

    // var clip_slider = document.getElementById("clip_crt_k");
    // var clip_output = document.getElementById("clip_crt_k_text");
    // parameters_bl["clip_crt_k"] = valMap[clip_slider.value]; 
    // clip_output.innerHTML = valMap[clip_slider.value]; // Display the default slider value
    // clip_slider.oninput = function () {
    //     clip_output.innerHTML = valMap[this.value];
    //     parameters_bl["clip_crt_k"] = valMap[this.value]; 
    // }
    $("#frame_crt_k").slider({
           // min: 0,
            max: object_map.length - 1,
            value:0,
            create: function() {
                $( "#frame_crt_k_handle" ).text( object_map[0]);
                parameters_bl["frame_crt_k"] = object_map[0];
              },
            slide: function(event, ui) {
                $( "#frame_crt_k_handle" ).text(object_map[ui.value]);
                parameters_bl["frame_crt_k"] = object_map[ui.value];
            }
    });

    $("#clip_crt_k").slider({
        // min: 0,
         max: action_map.length - 1,
         value:0,
         create: function() {
            $( "#clip_crt_k_handle" ).text( action_map[0] );
            parameters_bl["clip_crt_k"] = action_map[0];
           },
         slide: function(event, ui) {
            $( "#clip_crt_k_handle" ).text(action_map[ui.value]);
            parameters_bl["clip_crt_k"] = action_map[ui.value];

         }
 });

    // $( "input[type='radio']"  ).checkboxradio({
    //     icon: false
    // });


    // var frame_crt_k_slider = document.getElementById("frame_crt_k");
    // var frame_crt_k_output = document.getElementById("frame_crt_k_text");
    // parameters_bl["frame_crt_k"] = frame_crt_k_slider.value;
    // frame_crt_k_output.innerHTML = frame_crt_k_slider.value; // Display the default slider value
    // frame_crt_k_slider.oninput = function () {
    //     parameters_bl["frame_crt_k"] = this.value;
    //     frame_crt_k_output.innerHTML = this.value;
    //     $("#display_frame_crt_k_text").html(parameters_bl["frame_crt_k"]);
    // }


    $("#radio").controlgroup();
    // $("#radio_data").controlgroup();
    // $("#radio_mode").controlgroup();
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
    $('input.source').change(function () {
        $(".modal_select").css("display", "none");
        $('.modal_select').prop('checked', false);
        predicates = "";
        action = "";
        classes = [];
        $('#predicate').html("");
        $("#sql_text").html("");
        $('input.class_select').prop('checked', false);
        $('input.action_select').prop('checked', false);
        inputVideo = $('input.source:checked').val().toLowerCase();
        console.log(inputVideo)

        switch (inputVideo) {
            case("washingdishesclip"):
                $("#select_clip_p").attr('min', 0.005);
                $("#select_clip_p").attr('max', 0.015);
                $("#select_clip_p").attr('step', 0.005);
                $("#select_clip_p").val(0.01);
                parameters["clip_p"] = 0.01;

                $("#select_frame_p").attr('min', 0.005);
                $("#select_frame_p").attr('max', 0.015);
                $("#select_frame_p").attr('step', 0.005);
                $("#select_frame_p").val(0.01);
                parameters["frame_p"] = 0.01;


                $("#clip_size").attr('min', 100);
                $("#clip_size").attr('max', 200);
                $("#clip_size").attr('step', 50);
                $("#clip_size").val(150);
                parameters["clip_size"] = 150;

                $("#washingDishes").css("display", "inline");
                $("#washingDishes1").css("display", "inline");
                break;

            case("guitarandpianoclip"):
                $("#select_clip_p").attr('min', 0.01);
                $("#select_clip_p").attr('max', 0.05);
                $("#select_clip_p").attr('step', 0.02);
                $("#select_clip_p").val(0.03)
                parameters["clip_p"] = 0.03;

                $("#select_frame_p").attr('min', 0.01);
                $("#select_frame_p").attr('max', 0.05);
                $("#select_frame_p").attr('step', 0.02);
                $("#select_frame_p").val(0.03)
                parameters["frame_p"] = 0.03;

                $("#clip_size").attr('min', 50);
                $("#clip_size").attr('max', 150);
                $("#clip_size").attr('step', 50);
                $("#clip_size").val(100);
                parameters["clip_size"] = 100;


                $('#piano').css("display", "inline");
                $('#piano1').css("display", "inline");
                $('#guitar').css("display", "inline");
                $('#guitar1').css("display", "inline");
                break;

            case("ridingabikeclip"):
                $("#select_clip_p").attr('min', 0.01);
                $("#select_clip_p").attr('max', 0.03);
                $("#select_clip_p").attr('step', 0.01);
                $("#select_clip_p").val(0.02)
                parameters["clip_p"] = 0.02;


                $("#select_frame_p").attr('min', 0.01);
                $("#select_frame_p").attr('max', 0.09);
                $("#select_frame_p").attr('step', 0.04);
                $("#select_frame_p").val(0.05);
                parameters["frame_p"] = 0.05;

                $("#clip_size").attr('min',100);
                $("#clip_size").attr('max', 200);
                $("#clip_size").attr('step', 50);
                $("#clip_size").val(150);
                parameters["clip_size"] = 150;

                $('#ridingabike').css("display", "inline");
                $('#ridingabike1').css("display", "inline");
                break;

            case("horseandarcheryclip"):
                $("#select_clip_p").attr('min', 0.005);
                $("#select_clip_p").attr('max', 0.015);
                $("#select_clip_p").attr('step', 0.005);
                $("#select_clip_p").val(0.01)
                parameters["clip_p"] = 0.01;

                $("#select_frame_p").attr('min', 0.005);
                $("#select_frame_p").attr('max', 0.015);
                $("#select_frame_p").attr('step', 0.005);
                $("#select_frame_p").val(0.01)
                parameters["frame_p"] = 0.01;

                $("#clip_size").attr('min', 50);
                $("#clip_size").attr('max', 150);
                $("#clip_size").attr('step', 50);
                $("#clip_size").val(100);
                parameters["clip_size"] = 100;


                $('#archery').css("display", "inline");
                $('#archery1').css("display", "inline");
                $('#horse').css("display", "inline");
                $('#horse1').css("display", "inline");
                break;
            default:
                console.log("Didn't match");
                break;


        }
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


    $('input.action_select').change(function () {
        $(".class_select").css("display", "none");
        $('input.class_select').prop('checked', false);
        $('#predicate').html("");
        action = $('input.action_select:checked').val().toLowerCase();
        console.log(action)
        $('#predicate').html(action)
        switch (action) {
            case("washing dishes"):
                $("#knife").css("display", "inline");
                $("#knife1").css("display", "inline");
                $("#glass").css("display", "inline");
                $("#glass1").css("display", "inline");
                break;
            // case("surfing water"):
            //     $("#surfingBoard").css("display", "inline");
            //     $("#surfingBoard1").css("display", "inline");
            //     break;
            // case("playing beach volleyball"):
            //     $("#volleyball_class").css("display", "inline");
            //     $("#volleyball_class1").css("display", "inline");
            //     break;
            // case("playing piano"):
            //     $("#piano_class").css("display", "inline");
            //     $("#piano_class1").css("display", "inline");
            //     break;
            case("playing guitar"):
                $("#guitar_class").css("display", "inline");
                $("#guitar_class1").css("display", "inline");
                $("#dog_class").css("display", "inline");
                $("#dog_class1").css("display", "inline");
                break;
            case("riding a bike"):
                $("#traffic_light").css("display", "inline");
                $("#traffic_light1").css("display", "inline");
                $("#car").css("display", "inline");
                $("#car1").css("display", "inline");
                break;
            // case("horseback riding"):
            //     $("#horse_class").css("display", "inline");
            //     $("#horse_class1").css("display", "inline");
            //     break;
            // case("archery"):

            //     $("#archery_class").css("display", "inline");
            //     $("#archery_class1").css("display", "inline");
            //     break;
            default:
                break;
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
    $('input.class_select').change(function () {
        var checked_classes = $('input[name="class_checkbox"]:checked');
        classes = new Array(checked_classes.length);
        for (var i = 0; i < checked_classes.length; i++) {
            classes[i] = checked_classes[i].value;
        }
        console.log(classes);
        if(classes.length > 0){
            $('#predicate').html(action + " with " + classes.join(", "));
        }
       
    });


    // select speed of frames
    $('input[name="mode"]').change(function () {
        if ($('input[name="mode"]:checked').val() == "Dynamic") {
            videoMode = "dynamic";
            $("#select_frame_p_container").css("display", "none");
            $("#select_clip_p_container").css("display", "none");
        } else {
            videoMode = "fixed";
            $("#select_frame_p_container").css("display", "block");
            $("#select_clip_p_container").css("display", "block");
        }
    });




    // path = "data/horse_archery_dynamic/horse_archery_archery_dynamic_10"
    // $.ajax({
    //     url: "/get_flatten", type: "get", // send it through get method
    //     data: {
    //         path: path
    //     },
    //     success: function (response) {
    //         setUpBar(response,0.7);
    //     }
    // });

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
        $('#Display').css("display", "block")

        path = "data/" + action.replaceAll(" ","_");
        path_bl = "data/" + action.replaceAll(" ","_");


        if (videoMode === "fixed") {
            path = path  + "/" + classes.concat(["fixed",parameters["clip_size"],parameters["frame_p"],parameters["clip_p"]]).join("_");
            path = path.replaceAll(" ","_");
            playFixVideo(path);
        }
        if(videoMode === "dynamic") {
            path = path  + "/" + classes.concat(["dynamic",parameters["clip_size"]]).join("_");
            path = path.replaceAll(" ","_");
            playDynamicVideo(path);
        }

        if (display_bl) {
            path_bl = path_bl + "/" + classes.concat(["bl",parameters_bl["frame_crt_k"],parameters_bl["clip_crt_k"]]).join("_");
            path_bl =  path_bl.replaceAll(" ","_");
            $("#display_frame_k_text").html(parameters_bl["frame_crt_k"]);
            $("#display_clip_k_text").html(parameters_bl["clip_crt_k"]);
    
            playBlVideo(path_bl);
        }
        console.log(path);

        $("#display_frame_p_text").html(parameters["frame_p"]);
        $("#display_clip_p_text").html(parameters["clip_p"]);


        // display
        $.ajax({
            url: "/accuracy", type: "get", // send it through get method
            data: {
                path: path,
                video: inputVideo,
                window_size: parameters["clip_size"],
                iou_threshold: parameters["iou"]
            },
            success: function (response) {
                var sum = response["fn"] + response["fp"] + response["tp"];
                var data = [
                    {
                        "metric": "tp",
                        "value": response["tp"] / sum
                    },
                    {
                        "metric": "fn",
                        "value": response["fn"] / sum
                    }, {
                        "metric": "fp",
                        "value": response["fp"] / sum
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
                    window_size: parameters["clip_size"],
                    iou_threshold: parameters_bl["iou"]
                },
                success: function (response) {
                    var sum = response["fn"] + response["fp"] + response["tp"];
                    var data = [
                        {
                            "metric": "tp",
                            "value": response["tp"] / sum
                        },
                        {
                            "metric": "fn",
                            "value": response["fn"] / sum
                        }, {
                            "metric": "fp",
                            "value": response["fp"] / sum
                        }
                    ];
                    display_data(data, true);
                }
            });

        }
    });

});
