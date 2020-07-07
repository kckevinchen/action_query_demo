
var margin = {top: 50, right: 50, bottom: 70, left: 50};
var width = 400 - margin.left - margin.right;
var height = 250 - margin.top - margin.bottom;
var barWidth = 25;
var barHeight = 300;

function accuracy_bar_opt(video, mode) {
    var file;
    var id = "my_dataviz";
    if (video === "tennis" && mode === "opt") {
        file = "static/results/tennis_opt_bar.csv"
    } else if (video === "baseball" && mode === "opt") {
        file = "static/results/baseball_opt_bar.csv"
    } else if (video === "surfing" && mode === "opt") {
        file = "static/results/surfing_opt_bar.csv"
    } else if (video === "skate" && mode === "opt") {
        file = "static/results/skate_opt_bar.csv"
    }

    d3.select("#" + id).select("svg").remove();

    var	parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("#" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(file, function(error, data) {

        data.forEach(function(d) {
            // d.metric = parseDate(d.metric);
            d.metric = d.metric;
            d.value = +d.value;
        });

        x.domain(data.map(function(d) { return d.metric; }));
        y.domain([0, 1]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0em")
            .attr("dy", "1em")
            .attr("transform", "rotate(0)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.metric) + x.rangeBand() / 4; })
            .attr("width", x.rangeBand()/2)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });

        svg.selectAll(".bartext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "middle")
            .attr("dx", "1.7em")
            .attr("dy", "-0.5em")
            .attr("fill", "black")
            .attr("font-size",10)
            .attr('y', function(d) { return y(d.value); })
            .attr('x', function(d) { return x(d.metric) + x.rangeBand() / 4; })
            .text(function (d) {return d.value});

    });

}


function accuracy_bar_bru(video, mode) {
    var file;
    var id = "my_dataviz_bf";
    if (video === "tennis" && mode === "bru") {
        file = "static/results/tennis_bru_bar.csv"
    } else if (video === "baseball" && mode === "bru") {
        file = "static/results/baseball_bru_bar.csv"
    } else if (video === "surfing" && mode === "bru") {
        file = "static/results/surfing_bru_bar.csv"
    } else if (video === "skate" && mode === "bru") {
        file = "static/results/skate_bru_bar.csv"
    }

    d3.select("#" + id).select("svg").remove();

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("#" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(file, function(error, data) {

        data.forEach(function(d) {
            // d.metric = parseDate(d.metric);
            d.metric = d.metric;
            d.value = +d.value;
        });

        x.domain(data.map(function(d) { return d.metric; }));
        y.domain([0, 1]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0em")
            .attr("dy", "1em")
            .attr("transform", "rotate(0)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.metric) + x.rangeBand() / 4; })
            .attr("width", x.rangeBand()/2)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });

        svg.selectAll(".bartext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "middle")
            .attr("dx", "1.7em")
            .attr("dy", "-0.5em")
            .attr("fill", "black")
            .attr("font-size",10)
            .attr('y', function(d) { return y(d.value); })
            .attr('x', function(d) { return x(d.metric) + x.rangeBand() / 4; })
            .text(function (d) {return d.value});

    });

}
