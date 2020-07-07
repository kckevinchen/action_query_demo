// var labels = false;

// var margin = {top: 30, right: 50, bottom: 70, left: 50};
// var width = 400 - margin.left - margin.right;
// var height = 250 - margin.top - margin.bottom;

// var min = Infinity,
//     max = -Infinity;

// function accuracy(video, mode) {
//     var file = "static/results/default.csv";
//     var id = "my_dataviz";

//     if (video === "tennis" && mode === "opt") {
//         file = "static/results/tennis_opt.csv";
//     } else if (video === "baseball" && mode === "opt") {
//         file = "static/results/baseball_opt.csv";
//     } else if (video === "surfing" && mode === "opt") {
//         file = "static/results/surfing_opt.csv";
//     } else if (video === "skate" && mode === "opt") {
//         file = "static/results/skate_opt.csv";
//     }

// // parse in the data	
//     d3.csv(file, function (error, csv) {

//         var data = [];
//         data[0] = [];
//         data[1] = [];
//         data[2] = [];
//         data[3] = [];
//         // add more rows if your csv file has more columns

//         // add here the header of the csv file
//         data[0][0] = "F1";
//         data[1][0] = "TPR";
//         data[2][0] = "FPR";
//         data[3][0] = "PRE";
//         // add more rows if your csv file has more columns

//         data[0][1] = [];
//         data[1][1] = [];
//         data[2][1] = [];
//         data[3][1] = [];

//         csv.forEach(function (x) {
//             var v1 = Math.floor(x.F1),
//                 v2 = Math.floor(x.TPR),
//                 v3 = Math.floor(x.FPR),
//                 v4 = Math.floor(x.PRE);
//             // add more variables if your csv file has more columns

//             var rowMax = Math.max(v1, Math.max(v2, Math.max(v3, v4)));
//             var rowMin = Math.min(v1, Math.min(v2, Math.min(v3, v4)));
//             data[0][1].push(v1);
//             data[1][1].push(v2);
//             data[2][1].push(v3);
//             data[3][1].push(v4);
//             // add more rows if your csv file has more columns

//             if (rowMax > max) max = rowMax;
//             if (rowMin < min) min = rowMin;
//         });

//         var chart = d3.box()
//             .height(height)
//             .domain([min, max])
//             .showLabels(labels);

//         d3.select("#" + id).select("svg").remove();

//         var svg = d3.select("#" + id).append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .attr("class", "box")
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         // the x-axis
//         var x = d3.scale.ordinal()
//             .domain(data.map(function (d) {
//                 return d[0]
//             }))
//             .rangeRoundBands([0, width], 0.7, 0.3);

//         var xAxis = d3.svg.axis()
//             .scale(x)
//             .orient("bottom");

//         // the y-axis
//         var y = d3.scale.linear()
//             .domain([min, max])
//             .range([height + margin.top, 0 + margin.top]);

//         var yAxis = d3.svg.axis()
//             .scale(y)
//             .orient("left");

//         // draw the boxplots
//         svg.selectAll(".box")
//             .data(data)
//             .enter().append("g")
//             .attr("transform", function (d) {
//                 return "translate(" + x(d[0]) + "," + margin.top + ")";
//             })
//             .call(chart.width(x.rangeBand()));

//         // draw y axis
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text") // and text1
//             .attr("transform", "rotate(-90)")
//             .attr("x", -100)
//             .attr("y", -40)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .style("font-size", "10px")
//             .text("%");

//         // draw x axis
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + (height + margin.top + 10) + ")")
//             .call(xAxis)
//             .append("text")
//             .attr("x", (width / 2))
//             .attr("y", 20)
//             .attr("dy", ".71em")
//             .style("text-anchor", "middle")
//             .style("font-size", "16px");
//     });
// }

// function accuracy_bf(video, mode) {
//     var file = "static/results/default.csv";
//     var id = "my_dataviz_bf";

//     if (video === "tennis" && mode === "bru") {
//         file = "static/results/tennis_bru.csv";
//     } else if (video === "baseball" && mode === "bru") {
//         file = "static/results/baseball_bru.csv";
//     } else if (video === "surfing" && mode === "bru") {
//         file = "static/results/surfing_bru.csv";
//     } else if (video === "skate" && mode === "bru") {
//         file = "static/results/skate_bru.csv";
//     }

// // parse in the data
//     d3.csv(file, function (error, csv) {

//         var data = [];
//         data[0] = [];
//         data[1] = [];
//         data[2] = [];
//         data[3] = [];
//         // add more rows if your csv file has more columns

//         // add here the header of the csv file
//         data[0][0] = "F1";
//         data[1][0] = "TPR";
//         data[2][0] = "FPR";
//         data[3][0] = "PRE"; 
//         // add more rows if your csv file has more columns

//         data[0][1] = [];
//         data[1][1] = [];
//         data[2][1] = [];
//         data[3][1] = [];

//         csv.forEach(function (x) {
//             var v1 = Math.floor(x.F1),
//                 v2 = Math.floor(x.TPR),
//                 v3 = Math.floor(x.FPR),
//                 v4 = Math.floor(x.PRE);
//             // add more variables if your csv file has more columns

//             var rowMax = Math.max(v1, Math.max(v2, Math.max(v3, v4)));
//             var rowMin = Math.min(v1, Math.min(v2, Math.min(v3, v4)));
//             data[0][1].push(v1);
//             data[1][1].push(v2);
//             data[2][1].push(v3);
//             data[3][1].push(v4);
//             // add more rows if your csv file has more columns

//             if (rowMax > max) max = rowMax;
//             if (rowMin < min) min = rowMin;
//         });

//         var chart = d3.box()
//             .height(height)
//             .domain([min, max])
//             .showLabels(labels);

//         d3.select("#" + id).select("svg").remove();

//         var svg = d3.select("#" + id).append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .attr("class", "box")
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         // the x-axis
//         var x = d3.scale.ordinal()
//             .domain(data.map(function (d) {
//                 return d[0]
//             }))
//             .rangeRoundBands([0, width], 0.7, 0.3);

//         var xAxis = d3.svg.axis()
//             .scale(x)
//             .orient("bottom");

//         // the y-axis
//         var y = d3.scale.linear()
//             .domain([min, max])
//             .range([height + margin.top, 0 + margin.top]);

//         var yAxis = d3.svg.axis()
//             .scale(y)
//             .orient("left");

//         // draw the boxplots
//         svg.selectAll(".box")
//             .data(data)
//             .enter().append("g")
//             .attr("transform", function (d) {
//                 return "translate(" + x(d[0]) + "," + margin.top + ")";
//             })
//             .call(chart.width(x.rangeBand()));

//         // draw y axis
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text") // and text1
//             .attr("transform", "rotate(-90)")
//             .attr("x", -100)
//             .attr("y", -40)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .style("font-size", "10px")
//             .text("%");

//         // draw x axis
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + (height + margin.top + 10) + ")")
//             .call(xAxis)
//             .append("text")
//             .attr("x", (width / 2))
//             .attr("y", 20)
//             .attr("dy", ".71em")
//             .style("text-anchor", "middle")
//             .style("font-size", "16px");
//     });
// }


// // Returns a function to compute the interquartile range.
// function iqr(k) {
//     return function (d, i) {
//         var q1 = d.quartiles[0],
//             q3 = d.quartiles[2],
//             iqr = (q3 - q1) * k,
//             i = -1,
//             j = d.length;
//         while (d[++i] < q1 - iqr) ;
//         while (d[--j] > q3 + iqr) ;
//         return [i, j];
//     };
// }

function accuracy(video, mode) {
    var file = "static/results/default.csv";
    var id = "my_dataviz";

    if (video === "tennis" && mode === "opt") {
        file = "static/results/tennis_opt.csv";
    } else if (video === "baseball" && mode === "opt") {
        file = "static/results/baseball_opt.csv";
    } else if (video === "surfing" && mode === "opt") {
        file = "static/results/surfing_opt.csv";
    } else if (video === "skate" && mode === "opt") {
        file = "static/results/skate_opt.csv";
    }

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 400 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.7, 0.3);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

d3.select("#" + id).select("svg").remove();
var svg = d3.select("#" + id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv(file, function(error, data) {
    console.log(data);
    data.forEach(function(d) {
        d.metric = d.metric;
        d.value = +d.value;
    });
    
  x.domain(data.map(function(d) { return d.metric; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.metric); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) {return height - y(d.value); });
});
}