var data;
var bar_data;
var bar_data_bl;
var static = "./static/";
var data_path = "./static/data/";
var offline_rank;


function videoFixUpdateLink() {
    var video = document.getElementById("video");
    var progress = video.currentTime / video.duration;

    setUpBar(bar_data, progress, false);
    if (progress == 1) {
        $("#dataviz").css("display", "inline");
        $(".slidercontainer").css("display", "block");
    }
    if (!video.paused) {
        setTimeout("videoFixUpdateLink()", 500);
    }
}

function offlineVideoUpdateLink() {
    var video = document.getElementById("video");
    var progress = video.currentTime / video.duration;

    setUpBar(bar_data, progress, false);
    if (!video.paused) {
        setTimeout("videoFixUpdateLink()", 500);
    }
}

function videoDynamicUpdateLink(e) {
    var video = document.getElementById("video");
    var progress = video.currentTime / video.duration;
    setUpBar(bar_data, progress, false);
    progress = progress.toFixed(2);
    console.log(progress)
    if (progress in data["clip"]) {
        $("#display_clip_p_text").html(parseFloat(data["clip"][progress]).toFixed(4));

    }
    if (progress in data["frame"]) {
        $("#display_frame_p_text").html(parseFloat(data["frame"][progress]).toFixed(4));
    }

    if (progress == 1) {
        $("#dataviz").css("display", "inline");
        $(".slidercontainer").css("display", "block");
    }
    if (!video.paused) {
        setTimeout("videoDynamicUpdateLink()", 500);
    }
}


function videoBlUpdateLink() {
    var video = document.getElementById("video_bl");
    var progress = video.currentTime / video.duration;
    setUpBar(bar_data_bl, progress, true);
    if (progress == 1) {
        $("#dataviz_bl").css("display", "inline");
        $(".slidercontainer_bl").css("display", "block");
    }
    if (!video.paused) {
        setTimeout("videoBlUpdateLink()", 500);
    }
}


function playDynamicVideo(path) {
    var video = document.getElementById("video");
    var src = path + "/video.mp4";
    $("#video").html('<source src="' + static + src + '" type="video/mp4"></source>');
    $("#Display").css("display", "block");
    $("#Selection").css("display", "none");
    $(".display_parameter").css("display", "block");
    $("#video").css("display", "inline");

    $.ajax({
        url: "/get_p",
        type: "get", // send it through get method
        data: {
            path: path
        },
        success: function (response) {
            data = response
            $.ajax({
                url: "/get_flatten",
                type: "get", // send it through get method
                data: {
                    path: path
                },
                success: function (r) {
                    bar_data = r;
                    setUpBar(r, 0.0, false);
                    $("#video").on("play", videoDynamicUpdateLink)
                    video.play();
                }
            });
        }
    });
}



function setup_offline_video(result,k) {
    var handle = $( "#rank_handle" );
    offline_rank = result;


    $("#sequence_num").html(`Sequence rank: 1`)
    handle.text( 1 );
    $("video").html(('<source src="' + data_path + offline_rank[1]["path"] + '" type="video/mp4"></source>'));
    $("video")[0].load();
    $(".play-button").fadeIn();

    $( "#rank_slider" ).slider({
        max: k,
        min:1,
        value:1,
      create: function() {
        $("#sequence_num").html(`Sequence rank: ${$( this ).slider( "value" )}`)
        handle.text( $( this ).slider( "value" ) );
        $("video").html(('<source src="' + data_path + offline_rank[$( this ).slider( "value" )]["path"] + '" type="video/mp4"></source>'));
        $("video")[0].load();
        $(".play-button").fadeIn();
        console.log(offline_rank[$( this ).slider( "value" )]["score"])

        draw_score_plot(offline_rank,k, $( this ).slider( "value" ));

        $("#display_s_text").html(offline_rank[$( this ).slider( "value" )]["score"]);
      },
      slide: function( event, ui ) {
        $("#sequence_num").html(`Sequence rank: ${ui.value}`)
        handle.text( ui.value );
        $("video").html(('<source src="' + data_path + offline_rank[ui.value]["path"] + '" type="video/mp4"></source>'));
        $("video")[0].load();
        $(".play-button").fadeIn();
        draw_score_plot(offline_rank,k, ui.value);



        $("#display_s_text").html(offline_rank[ui.value]["score"]);
      }
    });
}


function playFixVideo(path) {
    var video = document.getElementById("video");
    var src = path + "/video.mp4";
    $("#video").html('<source src="' + static + src + '" type="video/mp4"></source>');
    $("#Display").css("display", "block");
    $("#Selection").css("display", "none");
    $(".display_parameter").css("display", "block");
    $("#video").css("display", "inline");
    $.ajax({
        url: "/get_flatten",
        type: "get", // send it through get method
        data: {
            path: path
        },
        success: function (r) {
            bar_data = r;
            setUpBar(r, 0.0, false);
            $("#video").on("play", () => {
                videoFixUpdateLink();
            });
            video.play();
        }
    });

}


function playBlVideo(path) {
    var video_bl = document.getElementById("video_bl");
    var src = path + "/video.mp4";
    $("#video_bl").html('<source src="' + static + src + '" type="video/mp4"></source>');
    $("#video_bl").css("display", "inline");
    $(".display_parameter_bl").css("display", "block");

    $.ajax({
        url: "/get_flatten",
        type: "get", // send it through get method
        data: {
            path: path
        },
        success: function (r) {
            bar_data_bl = r;
            setUpBar(r, 0.0, true);
            $("#video_bl").on("play", () => {
                videoBlUpdateLink();
            })
            video_bl.play();
        }
    });


}