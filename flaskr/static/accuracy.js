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

//d3.v5
function percentage(video, mode) {
    var id = "my_dataviz";
    file = "static/results/washingDishes.csv";
    if (video === "washingDishesVideo" && mode === "fixed") {
        file = "static/results/washingDishes.csv";
    }
    d3.select("#" + id).select("svg").remove();
    var svg = d3.select("#" + id).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    // This is what is written on the Axis: from 0 to 100.range([height, 0]) // This is where the axis is placed: from 100 px to 800px.padding([0]) // Goes between 0 and 1. Default is 0

    // Add X axis label:

    d3.csv(file, function(d) {
        return {
           metric:d.metric,
           value:d.value
        };
      })
        .then(function (data) {
        console.log(data);
        // Add X axis
        var x = d3.scaleLinear().range([0, width]).domain([0, 1]);

        // Add Y axis
        var y = d3.scaleBand().range([0, height]).padding(0.1).domain(data.map(function (d) {
            return d.metric;
        }));

        svg.append("g").call(d3.axisLeft(y));

        svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

        svg.append("text").attr("text-anchor", "end").attr("x", width).attr("y", height + margin.top + 20).text("X axis title");

        // Y axis label:
        svg.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", - margin.left + 20).attr("x", - margin.top).text("Y axis title");
        svg.selectAll("myRect")
            .data(data)
                .enter()
                .append("rect")
                .attr("x", x(0) )
                .attr("y", function(d) { return y(d.metric); })
                .attr("width", function(d) { return x(d.value); })
                .attr("height", y.bandwidth() )
                .attr("fill", "#69b3a2")
    });


}

//d3.v3
function accuracy_bar_opt(video, mode) {
    var file;
    var id = "my_dataviz";
    if (video === "tennis" && mode === "fixed") {
        file = "static/results/tennis_opt_bar.csv"
    }

    d3.select("#" + id).select("svg").remove();

    var y = d3.scale.ordinal().rangeRoundBands([
        0, width
    ], .05);

    var x = d3.scale.linear().range([height, 0]);

    var yAxis = d3.svg.axis().scale(y).orient("bottom");

    var xAxis = d3.svg.axis().scale(x).orient("left").ticks(10);

    var svg = d3.select("#" + id).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(file, function (error, data) {

        data.forEach(function (d) { // d.metric = parseDate(d.metric);
            d.metric = d.metric;
            d.value = + d.value;
        });
        console.log(data);

        x.domain(data.map(function (d) {
            return d.metric;
        }));
        y.domain([0, 1]);

        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "0em").attr("dy", "1em").attr("transform", "rotate(0)");

        svg.append("g").attr("class", "y axis").call(yAxis);


        svg.selectAll("bar").data(data).enter().append("rect").style("fill", "steelblue").attr("x", function (d) {
            return x(d.metric) + x.rangeBand() / 4;
        }).attr("width", x.rangeBand() / 2).attr("y", function (d) {
            return y(d.value);
        }).attr("height", function (d) {
            return height - y(d.value);
        });


        svg.selectAll(".bartext").data(data).enter().append("text").attr("class", "bartext").attr("text-anchor", "middle").attr("dx", "1.7em").attr("dy", "-0.5em").attr("fill", "black").attr("font-size", 10).attr('y', function (d) {
            return y(d.value);
        }).attr('x', function (d) {
            return x(d.metric) + x.rangeBand() / 4;
        }).text(function (d) {
            return d.value
        });

    });

}
