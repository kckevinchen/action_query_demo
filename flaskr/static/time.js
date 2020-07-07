function time(video, mode) {

    var data = [
        {name: 'red', count: 1, percentage: 0, color: '#EA3535'},
        {name: 'yellow', count: 1, percentage: 0, color: '#EABA35'},
        {name: 'blue', count: 1, percentage: 0, color: '#35BAEA'}
    ];
    var total_fps = "nan fps";
    var total_time = "nan sec";

    if (video === "tennis" && mode === "opt") {
        data = [
            {name: 'red', count: 0.3, percentage: 645, color: '#EA3535'},
            {name: 'yellow', count: 0.3, percentage: 764, color: '#EABA35'},
            {name: 'blue', count: 4, percentage: 55, color: '#35BAEA'}
        ];
        total_fps = "55 fps";
        total_time = "4.5 sec";
    } else if (video === "baseball" && mode === "opt") {
        data = [
            {name: 'red', count: 0.5, percentage: 690, color: '#EA3535'},
            {name: 'yellow', count: 0.5, percentage: 718, color: '#EABA35'},
            {name: 'blue', count: 4.5, percentage: 55, color: '#35BAEA'}
        ];
        total_fps = "55 fps";
        total_time = "5.5 sec";
    } else if (video === "surfing" && mode === "opt") {
        data = [
            {name: 'red', count: 2.5, percentage: 558, color: '#EA3535'},
            {name: 'yellow', count: 2.5, percentage: 536, color: '#EABA35'},
            {name: 'blue', count: 15, percentage: 55, color: '#35BAEA'}
        ];
        total_fps = "55 fps";
        total_time = "20 sec";
    } else if (video === "skate" && mode === "opt") {
        data = [
            {name: 'red', count: 70, percentage: 649, color: '#EA3535'},
            {name: 'yellow', count: 10, percentage: 679, color: '#EABA35'},
            {name: 'blue', count: 10, percentage: 55, color: '#35BAEA'}
        ];
        total_fps = "55 fps";
        total_time = "4 sec";
    }

    var totalCount = 112;		//calcuting total manually

    var width = 320,
        height = 250,
        radius = 70;

    var arc = d3.svg.arc()
        .outerRadius(radius + 15)
        .innerRadius(radius);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.count;
        });

    // d3.select("svg").remove();  // change it as following
    d3.select("#time").select("svg").remove();

    var svg = d3.select('#time').append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
            return d.data.color;
        });

    g.append("text")
        .attr("transform", function (d) {
            var _d = arc.centroid(d);
            _d[0] *= 1.5;	//multiply by a constant factor
            _d[1] *= 1.5;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function (d) {
            if (d.data.percentage < 8) {
                return '';
            }
            return d.data.percentage + ' fps';
        });

    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '1.5em')
        .attr('y', -5)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 0)
        .text(total_fps)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 40)
        .text(total_time);
    // .text("343 fps, 10 sec");

}

function time_bf(video, mode) {

    var data = [
        {name: 'red', count: 1, percentage: 0, color: '#EA3535'},
        {name: 'yellow', count: 1, percentage: 0, color: '#EABA35'},
        {name: 'blue', count: 1, percentage: 0, color: '#35BAEA'}
    ];
    var total_fps = "nan fps";
    var total_time = "nan sec";

    if (video === "tennis" && mode === "bru") {
        // data = [
        //     {name: 'red', count: 3, percentage: 33.3, color: '#EA3535'},
        //     {name: 'yellow', count: 3, percentage: 33.3, color: '#EABA35'},
        //     {name: 'blue', count: 4, percentage: 25, color: '#35BAEA'}
        // ];
        data = [
            {name: 'red', count: 3, percentage: "", color: '#00cc00'}
        ];
        total_fps = "10 fps";
        total_time = "25 sec";
    } else if (video === "baseball" && mode === "bru") {
        // data = [
        //     {name: 'red', count: 3, percentage: 33.3, color: '#EA3535'},
        //     {name: 'yellow', count: 3, percentage: 33.3, color: '#EABA35'},
        //     {name: 'blue', count: 4, percentage: 25, color: '#35BAEA'}
        // ];
        data = [
            {name: 'red', count: 3, percentage: "", color: '#00cc00'}
        ];
        total_fps = "10 fps";
        total_time = "30 sec";
    } else if (video === "surfing" && mode === "bru") {
        // data = [
        //     {name: 'red', count: 3, percentage: 33.3, color: '#EA3535'},
        //     {name: 'yellow', count: 3, percentage: 33.3, color: '#EABA35'},
        //     {name: 'blue', count: 4, percentage: 25, color: '#35BAEA'}
        // ];
        data = [
            {name: 'red', count: 3, percentage: "", color: '#00cc00'}
        ];
        total_fps = "10 fps";
        total_time = "110 sec";
    } else if (video === "skate" && mode === "bru") {
        // data = [
        //     {name: 'red', count: 3, percentage: 33.3, color: '#EA3535'},
        //     {name: 'yellow', count: 3, percentage: 33.3, color: '#EABA35'},
        //     {name: 'blue', count: 4, percentage: 25, color: '#35BAEA'}
        // ];
        data = [
            {name: 'red', count: 3, percentage: "", color: '#00cc00'}
        ];
        total_fps = "10 fps";
        total_time = "nan sec";
    }

    var totalCount = 112;		//calcuting total manually

    var width = 320,
        height = 250,
        radius = 70;

    var arc = d3.svg.arc()
        .outerRadius(radius + 15)
        .innerRadius(radius);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.count;
        });

    // d3.select("svg").remove();  // change it as following
    d3.select("#time_bf").select("svg").remove();

    var svg = d3.select('#time_bf').append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
            return d.data.color;
        });

    g.append("text")
        .attr("transform", function (d) {
            var _d = arc.centroid(d);
            _d[0] *= 1.5;	//multiply by a constant factor
            _d[1] *= 1.5;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function (d) {
            if (d.data.percentage < 8) {
                return '';
            }
            return d.data.percentage + ' fps';
        });

    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '1.5em')
        .attr('y', -5)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 0)
        .text(total_fps)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 40)
        .text(total_time);
    // .text("343 fps, 10 sec");

}
