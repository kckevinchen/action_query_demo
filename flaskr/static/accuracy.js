var margin = {
    top: 50,
    right: 50,
    bottom: 70,
    left: 50
};
var width = 400 - margin.left - margin.right;
var height = 250 - margin.top - margin.bottom;
var barWidth = 25;
var barHeight = 300;

// d3.v5
function display_data(data,is_base_line) {
    var id;
    if(is_base_line){
        id = "dataviz_bl";
    }
    else{
        id = id = "dataviz";
    }
    d3.select("#" + id).select("svg").remove();
    var svg = d3.select("#" + id).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    // This is what is written on the Axis: from 0 to 100.range([height, 0]) // This is where the axis is placed: from 100 px to 800px.padding([0]) // Goes between 0 and 1. Default is 0

    // Add X axis label:


    console.log(data);
    // Add y axis
    var y = d3.scaleLinear().range([0, height]).domain([1, 0]);

    // Add x axis
    var x = d3.scaleBand().range([0, width]).padding(0.4).domain(data.map(d=>d.metric));

    svg.append("g").call(d3.axisLeft(y));

    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end");

    svg.append("text").attr("text-anchor", "end").attr("x", width).attr("y", height + margin.top-10).text("Metric");

    // Y axis label:
    svg.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", - margin.left + 20).attr("x", - margin.top).text("Score");

    svg.selectAll("myRect").data(data).enter().append("rect").attr("x", d=>x(d.metric)).attr("y", d=>y(d.value)).attr("width",  x.bandwidth())
    .attr("height",d=>height - y(d.value)).attr("fill", "#69b3a2")
}
