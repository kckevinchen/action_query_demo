var rec_length = 250;
var rec_width = 30;
var margin = 20;
function setUpBar(data, process, bl) {
    var video_array = data["result"]
    var index = data["index"]
    var total = data["total"]
    var video_total = data["video_total"];
    var c;
    if (bl) {
        c = document.getElementById("bar_bl");
    } else {
        c = document.getElementById("bar");
    }

    var ctx = c.getContext("2d");


    ctx.clearRect(0, 0, 400, 100);
    ctx.strokeStyle = "#1E212B"
    ctx.strokeRect(0, 0, rec_length, rec_width);
    ctx.font = 'lighter 10px serif';
    ctx.fillText('Selected', 260, 30);
    ctx.fillStyle = '#4F759B';
    ctx.fillRect(270, 10, 10, 10);
    var cur_video_frame = process * video_total
    var cur_frame = 0;
    var found = false;
    for (var i = 0; i < video_array.length; i++) {
        var length,
            y;
        if (index.includes(i)) {
            y = video_array[i][0] / total
            length = (video_array[i][1] - video_array[i][0]) / total
            ctx.fillRect(y * rec_length, 1, length * rec_length, rec_width - 1);
        }
        if (! found) {
            if ((video_array[i][1] - video_array[i][0]) / 2 > cur_video_frame) {
                cur_frame = cur_video_frame * 2 + video_array[i][0]
                found = true
            } else {
                cur_video_frame = cur_video_frame - ((video_array[i][1] - video_array[i][0])/ 2)
            }
        }
    }

    if (cur_frame == 0 && cur_video_frame != 0) {
        cur_frame = total;
    }
    var cur_y = (cur_frame / total)
    ctx.fillStyle = '#1E212B';
    ctx.fillRect(cur_y * rec_length, 0, 1.5, rec_width);
}
