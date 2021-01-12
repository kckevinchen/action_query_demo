function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var score_margin = {
    top: 60,
    right: 50,
    bottom: 50,
    left: 50
};
var score_width = 400 - score_margin.left - score_margin.right;
var score_height = 250 - score_margin.top - score_margin.bottom;
var barWidth = 25;
var barHeight = 300;

// d3.v5
function draw_performnance_result(total,baseline,rounds) {
    var time = rounds*0.05
    var id = "display_performance"
    d3.select("#" + id).select("svg").remove();
    var svg = d3.select("#" + id).append("svg").attr("width", score_width + score_margin.left + score_margin.right).attr("height", score_height + score_margin.top + score_margin.bottom).append("g").attr("transform", "translate(" + score_margin.left + "," + score_margin.top + ")");

    // Add X axis
    // This is what is written on the Axis: from 0 to 100.range([height, 0]) // This is where the axis is placed: from 100 px to 800px.padding([0]) // Goes between 0 and 1. Default is 0

    // Add X axis label:


    var data = [{"model":"our model", "random_access":time},{"model":"baseline", "random_access":time*baseline/total}];

    // Add y axis
    var y = d3.scaleLinear().range([score_height,0]).domain([0, d3.max(data, function(d) { return d.random_access; })]);

    // Add x axis
    var x = d3.scaleBand().range([0, score_width]).padding(0.4).domain(data.map(d=>d.model));

    svg.append("g").call(d3.axisLeft(y));

    svg.append("g").attr("transform", "translate(0," + score_height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end");

    svg.append("text").attr("text-anchor", "end").attr("x", score_width).attr("y", score_height + score_margin.top-15).text("Model");

    // Y axis label:
    svg.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", - score_margin.left + 10).attr("x", - score_margin.top).text("Time");

    svg.selectAll(".bar").data(data).enter().append("rect").attr("x", d=>x(d.model))
    .attr("y", d=>y(d.random_access)).attr("width",  x.bandwidth()).attr("height", function(d) { return score_height - y(d.random_access); }).attr("fill", "#31708f")
}




async function display_query_process(data) {
    var all_rounds = $.map(data, function (v, i) {
        return parseInt(i);
    });
    var rounds = Math.max(...all_rounds)
    let baseline = data["-1"]
    let total_random_access = data[rounds.toString()]["random_access"]

    draw_performnance_result(total_random_access,baseline,rounds)
    $("#query_progress_bar").width("0%");
    $("#query_progress_bar").html("0%");
    await sleep(200);
    $("#display_query_process").css("display","block");
    $("#display_query_text").css("display","block");
    for (let i = 1; i <= rounds; i++) { 
        let cur_round = i.toString()
        let cur_data = data[cur_round]
        let definite_top_se = cur_data["definite_top_se"]
        let random_access = cur_data["random_access"]
        let percentage = Math.round(100*(cur_round/rounds));

        $("#query_progress_bar").width(`${percentage}%`);
        $("#query_progress_bar").html(`${percentage}%`);

        // $("#round").html(cur_round);
        $("#sequence").html(definite_top_se);
        $("#random_access").html(random_access);
        await sleep(50);
    }
    await sleep(500);
    $("#video_container").css("display", "block");
    $('#slider_container').css("display","block");
    $('#display_performance').css("display","block");
    $('#display_score_text').css("display","block");
    $('#display_score_plot').css("display","block");
    $('#back_button').prop('disabled', false);

}