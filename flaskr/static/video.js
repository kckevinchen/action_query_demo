

// video update link
function tennisOptUpdateLink(){
    var tennis_opt = document.getElementById("tennis_opt");
    var progress = tennis_opt.currentTime / tennis_opt.duration;
    if (0 <= progress && progress < 0.167) {
        tennis_graph1();
    }
    if (0.167 <= progress && progress < 0.333) {
        tennis_graph2();
    }
    if (0.333 <= progress && progress < 0.5) {
        tennis_graph3();
    }
    if (0.5 <= progress && progress < 0.667) {
        tennis_graph4();
    }
    if (0.667 <= progress && progress < 0.833) {
        tennis_graph5();
    }
    if (0.833 <= progress && progress < 1.0) {
        tennis_graph6();
    }
    // Pop out performance for Optimization Mode
    if (progress === 1){
        tennis_graph7();
        $("#time").css("display", "inline");
        $("#my_dataviz").css("display", "inline");
    }
    if(!tennis_opt.paused) {
        setTimeout("tennisOptUpdateLink()", 100);
    }
}

function tennisOptSlowUpdateLink(){
    var tennis_opt_slow = document.getElementById("tennis_opt_slow");
    var progress = tennis_opt_slow.currentTime / tennis_opt_slow.duration;
    if (0 <= progress && progress < 0.167) {
        tennis_graph1();
    }
    if (0.167 <= progress && progress < 0.333) {
        tennis_graph2();
    }
    if (0.333 <= progress && progress < 0.5) {
        tennis_graph3();
    }
    if (0.5 <= progress && progress < 0.667) {
        tennis_graph4();
    }
    if (0.667 <= progress && progress < 0.833) {
        tennis_graph5();
    }
    if (0.833 <= progress && progress < 1.0) {
        tennis_graph6();
    }
    // Pop out performance
    if (progress === 1){
        tennis_graph7();
        $("#time").css("display", "inline");
        $("#my_dataviz").css("display", "inline");
    }
    if(!tennis_opt_slow.paused) {
        setTimeout("tennisOptSlowUpdateLink()", 100);
    }
}

function baseballOptUpdateLink(){
    var baseball_opt = document.getElementById("baseball_opt");
    var progress = baseball_opt.currentTime / baseball_opt.duration;
    if (0 <= progress && progress < 0.167) {
        baseball_graph1();
    }
    if (0.167 <= progress && progress < 0.333) {
        baseball_graph2();
    }
    if (0.333 <= progress && progress < 0.5) {
        baseball_graph3();
    }
    if (0.5 <= progress && progress < 0.667) {
        baseball_graph4();
    }
    if (0.667 <= progress && progress < 0.833) {
        baseball_graph5();
    }
    if (0.833 <= progress && progress < 1.0) {
        baseball_graph6();
    }

    if (progress === 1) {
        baseball_graph7();
        $("#my_dataviz").css("display", "inline");
        $("#time").css("display", "inline");
    }
    
    if(!baseball_opt.paused) {
        setTimeout("baseballOptUpdateLink()", 500);
    }
}

function baseballOptSlowUpdateLink(){
    var baseball_opt_slow = document.getElementById("baseball_opt_slow");
    var progress = baseball_opt_slow.currentTime / baseball_opt_slow.duration;
    if (0 <= progress && progress < 0.167) {
        baseball_graph1();
    }
    if (0.167 <= progress && progress < 0.333) {
        baseball_graph2();
    }
    if (0.333 <= progress && progress < 0.5) {
        baseball_graph3();
    }
    if (0.5 <= progress && progress < 0.667) {
        baseball_graph4();
    }
    if (0.667 <= progress && progress < 0.833) {
        baseball_graph5();
    }
    if (0.833 <= progress && progress < 1.0) {
        baseball_graph6();
    }

    if (progress === 1) {
        baseball_graph7();
        $("#my_dataviz").css("display", "inline");
        $("#time").css("display", "inline");
    }

    if(!baseball_opt_slow.paused) {
        setTimeout("baseballOptSlowUpdateLink()", 500);
    }
}

function surfingOptUpdateLink() {
    var surfing_opt = document.getElementById("surfing_opt");
    var progress = surfing_opt.currentTime / surfing_opt.duration;
    if (0 <= progress && progress < 0.167) {
        surfing_graph1();
    }
    if (0.167 <= progress && progress < 0.333) {
        surfing_graph2();
    }
    if (0.333 <= progress && progress < 0.5) {
        surfing_graph3();
    }
    if (0.5 <= progress && progress < 0.667) {
        surfing_graph4();
    }
    if (0.667 <= progress && progress < 0.833) {
        surfing_graph5();
    }
    if (0.833 <= progress && progress < 1.0) {
        surfing_graph6();
    }

    if (progress === 1) {
        surfing_graph7();
        $("#my_dataviz").css("display", "inline");
        $("#time").css("display", "inline");
    }
    if(!surfing_opt.paused) {
        setTimeout("surfingOptUpdateLink()", 500);
    }
}

function surfingOptSlowUpdateLink() {
    var surfing_opt_slow = document.getElementById("surfing_opt_slow");
    var progress = surfing_opt_slow.currentTime / surfing_opt_slow.duration;
    if (0 <= progress && progress < 0.167) {
        surfing_graph1();
    }
    if (0.167 <= progress && progress < 0.333) {
        surfing_graph2();
    }
    if (0.333 <= progress && progress < 0.5) {
        surfing_graph3();
    }
    if (0.5 <= progress && progress < 0.667) {
        surfing_graph4();
    }
    if (0.667 <= progress && progress < 0.833) {
        surfing_graph5();
    }
    if (0.833 <= progress && progress < 1.0) {
        surfing_graph6();
    }

    if (progress === 1) {
        surfing_graph7();
        $("#my_dataviz").css("display", "inline");
        $("#time").css("display", "inline");
    }

    if(!surfing_opt_slow.paused) {
        setTimeout("surfingOptSlowUpdateLink()", 500);
    }
}


function tennisBruUpdateLink(){
    var tennis_bru = document.getElementById("tennis_bf");
    var progress = tennis_bru.currentTime / tennis_bru.duration;
    if (progress === 1){
        $("#time_bf").css("display", "inline");
        $("#my_dataviz_bf").css("display", "inline");
    }
    if(!tennis_bru.paused) {
        setTimeout("tennisBruUpdateLink()", 500);
    }
}

function tennisBruSlowUpdateLink(){
    var tennis_bru_slow = document.getElementById("tennis_bf_slow");
    var progress = tennis_bru_slow.currentTime / tennis_bru_slow.duration;
    if (progress === 1){
        $("#time_bf").css("display", "inline");
        $("#my_dataviz_bf").css("display", "inline");
    }
    if(!tennis_bru_slow.paused) {
        setTimeout("tennisBruSlowUpdateLink()", 500);
    }
}

function baseballBruUpdateLink(){
    var baseball_bru = document.getElementById("baseball_bf");
    var progress = baseball_bru.currentTime / baseball_bru.duration;
    if (progress === 1) {
        $("#my_dataviz_bf").css("display", "inline");
        $("#time_bf").css("display", "inline");
    }
    if(!baseball_bru.paused) {
        setTimeout("baseballBruUpdateLink()", 500);
    }
}

function baseballBruSlowUpdateLink(){
    var baseball_bru_slow = document.getElementById("baseball_bf_slow");
    var progress = baseball_bru_slow.currentTime / baseball_bru_slow.duration;
    if (progress === 1) {
        $("#my_dataviz_bf").css("display", "inline");
        $("#time_bf").css("display", "inline");
    }
    if(!baseball_bru_slow.paused) {
        setTimeout("baseballBruSlowUpdateLink()", 500);
    }
}

function surfingBruUpdateLink(){
    var surfing_bru = document.getElementById("surfing_bf");
    var progress = surfing_bru.currentTime / surfing_bru.duration;
    if (progress === 1) {
        $("#my_dataviz_bf").css("display", "inline");
        $("#time_bf").css("display", "inline");
    }
    if(!surfing_bru.paused) {
        setTimeout("surfingBruUpdateLink()", 500);
    }
}

function surfingBruSlowUpdateLink(){
    var surfing_bru_slow = document.getElementById("surfing_bf_slow");
    var progress = surfing_bru_slow.currentTime / surfing_bru_slow.duration;
    if (progress === 1) {
        $("#my_dataviz_bf").css("display", "inline");
        $("#time_bf").css("display", "inline");
    }
    if(!surfing_bru_slow.paused) {
        setTimeout("surfingBruSlowUpdateLink()", 500);
    }
}
