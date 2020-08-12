var data;
var static = "./static/";



function videoFixUpdateLink() {
    var video = document.getElementById("video");
    var progress = video.currentTime / video.duration;
    if (progress === 1) {
        $("#dataviz").css("display", "inline");
        $(".slidercontainer").css("display", "block");
    }
    if (! video.paused) {
        setTimeout("videoFixUpdateLink()", 500);
    }
}

function videoDynamicUpdateLink(e) {
    var video = document.getElementById("video");
    var progress = video.currentTime / video.duration;
    progress = Math.round((progress + Number.EPSILON) * 100) / 100
    if (progress in data) {
        $("#display_p_text").html(data[progress]);

    }
    if (progress === 1) {
        $("#dataviz").css("display", "inline");
        $(".slidercontainer").css("display", "block");
    }
    if (! video.paused) {
        setTimeout("videoDynamicUpdateLink()", 500);
    }
}


function videoBlUpdateLink() {
    var video = document.getElementById("video_bl");
    var progress = video.currentTime / video.duration;
    if (progress === 1) {
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
        url: "/get_p", type: "get", // send it through get method
        data: {
            path: path
        },
        success: function (response) {
            data = response
            $("#video").on("play", videoDynamicUpdateLink)
            video.play();
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

    $("#video").on("play", () => {
        videoFixUpdateLink();
    })
    video.play();

}


function playBlVideo(path) {
    var video_bl = document.getElementById("video_bl");
    var src = path + "/video.mp4";
    $("#video_bl").html('<source src="' + static + src + '" type="video/mp4"></source>');
    $("#video_bl").css("display", "inline");
    $(".display_parameter_bl").css("display", "block");
    $("#video_bl").on("play", () => {
        videoBlUpdateLink();
    })
    video_bl.play();

}
