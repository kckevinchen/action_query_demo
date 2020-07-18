

// // video update link
// function tennisOptUpdateLink(){
//     var tennis_opt = document.getElementById("tennis_opt");
//     var progress = tennis_opt.currentTime / tennis_opt.duration;
//     if (0 <= progress && progress < 0.167) {
//         tennis_graph1();
//     }
//     if (0.167 <= progress && progress < 0.333) {
//         tennis_graph2();
//     }
//     if (0.333 <= progress && progress < 0.5) {
//         tennis_graph3();
//     }
//     if (0.5 <= progress && progress < 0.667) {
//         tennis_graph4();
//     }
//     if (0.667 <= progress && progress < 0.833) {
//         tennis_graph5();
//     }
//     if (0.833 <= progress && progress < 1.0) {
//         tennis_graph6();
//     }
//     // Pop out performance for Optimization Mode
//     if (progress === 1){
//         tennis_graph7();
//         $("#time").css("display", "inline");
//         $("#my_dataviz").css("display", "inline");
//     }
//     if(!tennis_opt.paused) {
//         setTimeout("tennisOptUpdateLink()", 100);
//     }
// }


function washingDishesUpdateLink(){
    var washingDishes = document.getElementById("washingDishesVideo");
    var progress = washingDishes.currentTime / washingDishes.duration;
    if (progress === 1){
        $("#my_dataviz").css("display", "inline");
    }
    if(!washingDishes.paused) {
        setTimeout("washingDishesUpdateLink()", 500);
    }
}

