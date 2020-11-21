var score_margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};
var score_width = 480 - score_margin.left - score_margin.right;
var score_height = 200 - score_margin.top - score_margin.bottom;


function draw_score_plot(score,k, hightlight){
    var data = [];
    var color = {}
    console.log(score)
    console.log(hightlight)
    for(var i =1; i < k+1; i ++){
        data.push({"rank":i,"score":score[i]["score"]})
        if(i == hightlight){
            color[i]= "#fc8d62"
        }
        else{
            color[i] = "#31708f"
        }
    }


    var id = "display_s_plot"
    d3.select("#" + id).select("svg").remove();
    var svg = d3.select("#" + id).append("svg").attr("width", score_width + score_margin.left + score_margin.right).attr("height", score_height + score_margin.top + score_margin.bottom).append("g").attr("transform", "translate(" + score_margin.left + "," + score_margin.top + ")");
    var y = d3.scaleLinear().range([score_height,0]).domain([0, d3.max(data, function(d) { return d.score; })]);

    // Add x axis
    var x = d3.scaleBand().range([0, score_width]).padding(0.4).domain(data.map(d=>d.rank));

    svg.append("g").call(d3.axisLeft(y));

    svg.append("g").attr("transform", "translate(0," + score_height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end");

    svg.append("text").attr("text-anchor", "end").attr("x", score_width).attr("y", score_height + score_margin.top - 10 ).text("Rank");

    // Y axis label:
    svg.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", - score_margin.left + 10).attr("x", - score_margin.top).text("Score");

    svg.selectAll(".bar").data(data).enter().append("rect").attr("x", d=>x(d.rank))
    .attr("y", d=>y(d.score)).attr("width",  x.bandwidth()).attr("height", function(d) { return score_height - y(d.score); }).attr("fill", function(d) { return color[d.rank];});






    
}
