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
        classes; // human KICK smallBall
    var parameters = {"p":0,"window":0,"iou": 0};
    var modal = document.getElementById("exampleModalLong");
    var param = document.getElementById("parametersLong");

    var iou_slider = document.getElementById("IoU");
    var iou_output = document.getElementById("IoU_text");
    parameters["iou"] = iou_slider.value;
    iou_output.innerHTML = iou_slider.value; // Display the default slider value
    iou_slider.oninput = function() {
        iou_output.innerHTML = this.value;
    }

    var p_slider = document.getElementById("select_p");
    var p_output = document.getElementById("select_p_text");
    parameters["p"] = p_slider.value;
    p_output.innerHTML = p_slider.value; // Display the default slider value
    p_slider.oninput = function() {
        p_output.innerHTML = this.value;
    }



    var window_slider = document.getElementById("window_size");
    var window_output = document.getElementById("window_size_text");
    parameters["window"] = window_slider.value;
    window_output.innerHTML = window_slider.value; // Display the default slider value
    window_slider.oninput = function() {
        window_output.innerHTML = this.value;
    }

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
    $("#my_dataviz").css("display", "none");
    $(".slidecontainer").css("display", "none");


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
        }
    });

    $('#parameters_button').bind('click', function () {
        if (inputVideo && videoMode) {
            param.style.display = "block";
            $('.parameterSelect > input').each(function () {
                $(this)[0].value= parameters[$(this)[0].name];
                $(this)[0].oninput();
            });
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
    $("#param_save").bind("click", function(){
        $('.parameterSelect > input').each(function () {
            parameters[$(this)[0].name] = $(this)[0].value;
        });
        param.style.display = "none";
    })

    // save predicates
    $("#save").bind('click', function () {
        predicates = $('#predicate').text();
        console.log(predicates.length);
        if(predicates == ""){
            alert("Empty predicate");
            return;
        }
        sql_query = queries_per_filter_predicates(videoMode, inputVideo, action,classes);
        $("#sql_text").html(sql_query);
        modal.style.display = "none";
    });

    // gets the input video and defines the query
    // modal checkbox
    $('input[name="class_checkbox"]').change(function () {
        var checked_classes = $('input[name="class_checkbox"]:checked');
        classes =  new Array(checked_classes.length);
        for(var i = 0; i < checked_classes.length; i++ ){
            classes[i] = checked_classes[i].id;
        }
        console.log(classes);
        if(classes.length > 0){
            if(action == "washingdishes"){
                $('#predicate').html("washing dishes with " + classes.join(", "));
            }
        }
        else{
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
        if(predicates == ""){
            alert("Empty predicate");
            return;
        }
        $("#washingDishesVideo").css("display", "none");
        $("#my_dataviz").css("display", "none");
        if (videoMode === "fixed") {
            if (inputVideo === "washingdishesclip") {
                console.log("Here");
                $("#washingDishesVideo").css("display", "inline");
                washingDishesVideo.play();
                percentage("washingDishesVideo", "fixed");
            }
        } else {
            console.log("no mode")
        }
    });

});
