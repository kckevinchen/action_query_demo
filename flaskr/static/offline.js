$(function () {

    var inputVideo, // tennis clip, baseball clip, surfing clip, skate clip
        sql_query, // Output sql query
        predicates, // current predicates
        action,
        objects


    var parameters = {
        "k": 0,
    };

    $('.container.main.content').css('z-index', -1)



    // var k_slider = document.getElementById("k");
    // var k_output = document.getElementById("k_text");
    // parameters["k"] = k_slider.value;
    // k_output.innerHTML = k_slider.value;
    // k_slider.oninput = function () {
    //     k_output.innerHTML = this.value;
    //     parameters["k"] = this.value
    // }


    $("#radio").controlgroup();
    $("#selectable").selectable();

    // Set up the control button
    $('#video').parent().click(function () {
        if ($(this).children("#video").get(0).paused) {
            $(this).children("#video").get(0).play();
            $(this).children(".play-button").fadeOut();
        } else {
            $(this).children("#video").get(0).pause();
            $(this).children(".play-button").fadeIn();
        }
    });
    $('#video').on("ended", () => {
        $(".play-button").fadeIn();
    })


    $("#back_button").bind("click", function () {
        location.reload();
        $("#Display").css("display", "none");
        $("#Selection").css("display", "block");

    })


    // init video
    // $("#video").css("display", "none");


    var k_handle = $("#k_handle")
    // change part 3 with respect to part 1
    $('input.source').change(function () {
        predicates = "";
        $('#predicate').html("");
        $("#sql_text").html("");
        inputVideo = $('input.source:checked').val().toLowerCase();
        switch (inputVideo) {
            case ("coffee_and_cigarettes"):
                predicates = "Smoking with cup or glass"
                action = "smoking"
                objects = ["cup or glass"]
                $("#predicates").html("Smoking with cup or glass")
                parameters["k"] = 1;
                k_handle.text(1);
                $("#sql_text").html(offline_sql(inputVideo, action, objects, parameters["k"]));
                $("#select_K").slider({
                    range: "min",
                    min: 1,
                    max: 13,
                    value:1,
                    create: function () {
                        parameters["k"] = $(this).slider("value");
                        k_handle.text($(this).slider("value"));
                        $("#sql_text").html(offline_sql(inputVideo, action, objects, parameters["k"]));
                    },
                    slide: function (event, ui) {
                        parameters["k"] = ui.value;
                        k_handle.text(ui.value);
                        $("#sql_text").html(offline_sql(inputVideo, action, objects, parameters["k"]));
                    },
                    animate: true
                });
                break;
            case ("free_solo"):
                predicates = "Climbing the Cliff"
                action = "climbing"
                objects = ["cliff"]
                $("#predicates").html("Climbing the Cliff")
                parameters["k"] = 1;
                k_handle.text(1);
                $("#sql_text").html(offline_sql(inputVideo, action, objects, parameters["k"]));
                $("#select_K").slider({
                    range: "min",
                    min: 1,
                    max: 7,
                    value:1,
                    create: function () {
                        parameters["k"] = $(this).slider("value");
                        k_handle.text($(this).slider("value"));
                        $("#sql_text").html(offline_sql(inputVideo, action, objects, parameters["k"]));
                    },
                    slide: function (event, ui) {
                        parameters["k"] = ui.value;
                        k_handle.text(ui.value);
                        $("#sql_text").html(offline_sql(inputVideo, action, objects, parameters["k"]));
                    },
                    animate: true
                });
                break;
            default:
                console.log("Didn't match");
                break;

        }
    });

    // select to run the
    $("#run").click(function () {
        // if (predicates == "") {
        //     alert("Empty predicate");
        //     return;
        // }
        console.log(inputVideo)
        $('#back_button').prop('disabled', true);

        $("#Display").css("display", "block");
        $("#Selection").css("display", "none");
        $("#display_predicate").html(predicates);

        $("#video_container").css("display", "none");
        $("#display_query_process").css("display", "none");
        $("#display_query_text").css("display", "none");
        $('#slider_container').css("display", "none");
        $('#display_performance').css("display", "none");


        $.ajax({
            url: "/get_query_process",
            type: "get", // send it through get method
            data: {
                video: inputVideo,
                k: parameters["k"]
            },
            success: function (response) {
                display_query_process(response);
            }
        });
        $.ajax({
            url: "/get_se",
            type: "get", // send it through get method
            data: {
                video: inputVideo,
                k: parameters["k"]
            },
            success: function (response) {
                setup_offline_video(response, parameters["k"]);
            }
        });
    });

});