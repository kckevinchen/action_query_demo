
var dataSet1 = {
    nodes: [
        { name: "Filter1", id:"1", x:27.31191418045182, y:39.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter2", id:"2", x:63.1651006560272, y:90.78448049334696, fixed:true, color:"#EA3535"},
        { name: "Filter3", id:"3", x:99.31191418045182, y:39.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter4", id:"4", x:135.31191418045182, y:90.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter5", id:"5", x:171.31191418045182, y:39.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter6", id:"6", x:207.31191418045182, y:90.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter1", id:"7", x:283.31191418045182, y:39.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter2", id:"8", x:319.1651006560272, y:90.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter3", id:"9", x:355.31191418045182, y:39.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter4", id:"10", x:391.31191418045182, y:90.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter5", id:"11", x:427.31191418045182, y:39.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter6", id:"12", x:460.31191418045182, y:90.78448049334696, fixed:true, color:"#EABA35"},
        { name: "IS", id:"13", x:540.31191418045182, y:64.78520431471384, fixed:true, color:"#35BAEA"}
    ],
    edges: [
        // { source: 0, target: 1, value: 1, color:"#EA3535"},
        // { source: 1, target: 2, value: 1, color:"#EA3535"},
        { source: 0, target: 2, value: 1, color:"#EA3535"},
        { source: 2, target: 3, value: 1, color:"#EA3535"},
        { source: 3, target: 4, value: 1, color:"#EABA35"},
        { source: 4, target: 5, value: 1, color:"#EABA35"},
        { source: 5, target: 6, value: 1, color:"#EABA35"},
    ]
};

var default_dataSet = {
    nodes: [
        { name: "Filter1", id:"1", x:27.31191418045182, y:39.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter2", id:"2", x:63.1651006560272, y:90.78448049334696, fixed:true, color:"#EA3535"},
        { name: "Filter3", id:"3", x:99.31191418045182, y:39.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter4", id:"4", x:135.31191418045182, y:86.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter5", id:"5", x:171.31191418045182, y:39.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter6", id:"6", x:207.31191418045182, y:90.78520431471384, fixed:true, color:"#EA3535"},
        { name: "Filter1", id:"7", x:283.31191418045182, y:39.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter2", id:"8", x:319.1651006560272, y:90.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter3", id:"9", x:355.31191418045182, y:39.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter4", id:"10", x:391.31191418045182, y:86.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter5", id:"11", x:427.31191418045182, y:39.78448049334696, fixed:true, color:"#EABA35"},
        { name: "Filter6", id:"12", x:460.31191418045182, y:90.78448049334696, fixed:true, color:"#EABA35"},
        { name: "IS", id:"13", x:550.31191418045182, y:64.78520431471384, fixed:true, color:"#35BAEA"}
    ],
    edges: []
};

function myGraph(el, dataSet) {

    // set up the D3 visualisation in the specified element
    var w = 615,
        h = 115,
        rect_width = 16,
        rect_height = 16;
    var vis = d3.select(el)
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id","svg")
        .attr("pointer-events", "all")
        .attr("viewBox","0 0 "+w+" "+h)
        .attr("perserveAspectRatio","xMinYMid")
        .append('svg:g');
    var force = d3.layout.force()
        .links(dataSet.edges)
        .nodes(dataSet.nodes);
    var nodes = force.nodes();
    var links = force.links();

    // Add and remove elements on the graph object
    this.addNode = function (id,x,y,fixed) {
        nodes.push({"id":id,"x":x,"y":y,"fixed":fixed});
        update();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] == n)||(links[i]['target'] == n))
            {
                links.splice(i,1);
            }
            else i++;
        }
        nodes.splice(findNodeIndex(id),1);
        update();
    };

    this.removeLink = function (source,target){
        for(var i=0;i<links.length;i++) {
            if(links[i].source.id == source && links[i].target.id == target) {
                links.splice(i,1);
                break;
            }
        }
        update();
    };

    this.removeAllLinks = function(){
        links.splice(0,links.length);
        update();
    };

    this.removeAllNodes = function(){
        nodes.splice(0,links.length);
        update();
    };

    this.addLink = function (source, target, value, color) {
        links.push({"source":source,"target":target,"value":value,"color":color});
        update();
    };

    this.generateAgain = function (newDataSet) {
        force = d3.layout.force()
            .links(dataSet.edges)
            .nodes(dataSet.nodes);
        nodes = force.nodes();
        links = force.links();
    };

    var findNode = function(id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id) return nodes[i];
        }
    };

    var findNodeIndex = function(id) {
        for (var i=0;i<nodes.length;i++) {
            if (nodes[i].id==id){
                return i;
            }
        }
    };

    var rec = vis.selectAll('rect')
        .data([1,2]);
    var newRects = rec.enter();
    newRects.append('rect')
        .attr('x', 10)
        .attr("y", 10)
        .attr("width", 240)
        .attr("height", 100)
        .attr("fill", "transparent")
        .attr("stroke", "#EA3535");
    newRects.append('text')
        .attr("x", "130")
        .attr("y", "108")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#EA3535")
        .text("Human Operator");
    newRects.append('rect')
        .attr('x', 265)
        .attr("y", 10)
        .attr("width", 240)
        .attr("height", 100)
        .attr("fill", "transparent")
        .attr("stroke", "#EABA35");
    newRects.append('text')
        .attr("x", "385")
        .attr("y", "108")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#EABA35")
        .text("Object Operator");
    newRects.append('rect')
        .attr('x', 520)
        .attr("y", 10)
        .attr("width", 80)
        .attr("height", 100)
        .attr("fill", "transparent")
        .attr("stroke", "#35BAEA");
    newRects.append('text')
        .attr("x", "560")
        .attr("y", "95")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#35BAEA")
        .text("Interaction");
    newRects.append('text')
        .attr("x", "560")
        .attr("y", "108")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#35BAEA")
        .text("Sheave");
    rec.exit().remove();

    var update = function () {

        // vis.append('defs').append('marker')
        //     .attr('id', 'arrow')
        //     .attr('viewBox', '0 -5 10 10')
        //     .attr('refX', 8)
        //     .attr('markerWidth', 6)
        //     .attr('markerHeight', 10)
        //     .attr('orient', 'auto');
        //     .append('path')
        //     .attr('d', 'M 0 -5 L 10 0 L 0 5')//arrow
        //     .attr('fill', 'black');

        var link = vis.selectAll("line")
            .data(links, function (d) {
                return d.source.id + "-" + d.target.id;
            });

        link.enter()
            .append("line")
            .style("stroke", function(d){return d.color})
            .style("stroke-width", function(d){return d.value})
            .attr("id",function(d){return d.source.id + "-" + d.target.id;})
            .attr("class","link");
            // .attr("marker-end", "url(#arrow)");
        link.append("title")
            .text(function(d){
                return d.value;
            });
        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id;});
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);
        nodeEnter.append("circle")
            .attr("r", rect_width/2)
            .attr("stroke", function(d) { return d.color;})
            .attr("fill", function(d) { return d.color;})
            .attr("id", function(d) { return "Node;"+d.id;})
            .attr("class","nodeStrokeClass");
        nodeEnter.append("svg:text")
            .attr("x", "15")
            .attr("y", "-10")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("dy", "-0.3em")
            .attr("class","textClass")
            .text( function(d){return d.name;});
        node.exit().remove();

        force.on("tick", function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        });

        // Restart the force layout.
        force
            .gravity(0.01)
            .distance(50)
            .linkDistance(50)
            .size([w, h])
            .start();
    };

    // Make it all go
    update();
}

graph = new myGraph("#architecture", default_dataSet);

function to_delete_link(source, target) {
    graph.removeLink(source, target);
}
function to_add_link(source, target, value, color) {
    graph.addLink(source, target, value, color);
}
function remove_all_links() {
    graph.removeAllLinks();
}

function get_graph1() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 7, 1, "#EABA35");
    graph.addLink(7, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}

function get_graph2() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}

function get_graph3() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 4, 1, "#EA3535");
    graph.addLink(4, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}

function get_graph4() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 1, "#EA3535");
    graph.addLink(2, 4, 1, "#EA3535");
    graph.addLink(4, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 8, 1, "#EABA35");
    graph.addLink(8, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}

function get_graph5() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 4, 1, "#EA3535");
    graph.addLink(4, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 7, 1, "#EABA35");
    graph.addLink(7, 8, 1, "#EABA35");
    graph.addLink(8, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}


function tennis_graph1() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 2, 5, "#EA3535");
    graph.addLink(2, 3, 5, "#EA3535");
    graph.addLink(3, 5, 5, "#EA3535");
    graph.addLink(5, 7, 5, "#EABA35");
    graph.addLink(11, 12, 5, "#EABA35");
}
function tennis_graph2() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 3, 5, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 5, "#EA3535");
    graph.addLink(6, 7, 5, "#EA3535");
    graph.addLink(7, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function tennis_graph3() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 5, "#EA3535");
    graph.addLink(2, 3, 5, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 7, 5, "#EA3535");
    graph.addLink(7, 9, 5, "#EABA35");
    graph.addLink(9, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function tennis_graph4() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 7, 1, "#EA3535");
    graph.addLink(7, 9, 1, "#EABA35");
    graph.addLink(9, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function tennis_graph5() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 3, 5, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 5, "#EABA35");
    graph.addLink(6, 7, 5, "#EABA35");
    graph.addLink(7, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function tennis_graph6() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 5, "#EA3535");
    graph.addLink(2, 5, 5, "#EA3535");
    graph.addLink(5, 7, 5, "#EABA35");
    graph.addLink(7, 8, 5, "#EABA35");
    graph.addLink(8, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function tennis_graph7() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 5, 1, "#EA3535");
    graph.addLink(5, 7, 1, "#EABA35");
    graph.addLink(7, 8, 1, "#EABA35");
    graph.addLink(8, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}


function baseball_graph1() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 5, 5, "#EA3535");
    graph.addLink(5, 7, 5, "#EABA35");
    graph.addLink(7, 8, 5, "#EABA35");
    graph.addLink(8, 11, 5, "#EABA35");
    graph.addLink(11, 12, 5, "#EABA35");
}
function baseball_graph2() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 5, "#EA3535");
    graph.addLink(2, 5, 5, "#EA3535");
    graph.addLink(5, 7, 1, "#EA3535");
    graph.addLink(7, 8, 1, "#EABA35");
    graph.addLink(8, 9, 5, "#EABA35");
    graph.addLink(9, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function baseball_graph3() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 5, 5, "#EA3535");
    graph.addLink(5, 6, 5, "#EA3535");
    graph.addLink(6, 8, 5, "#EABA35");
    graph.addLink(8, 10, 5, "#EABA35");
    graph.addLink(10, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function baseball_graph4() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 5, "#EA3535");
    graph.addLink(2, 5, 5, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 9, 5, "#EABA35");
    graph.addLink(9, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function baseball_graph5() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 5, 5, "#EA3535");
    graph.addLink(5, 7, 5, "#EABA35");
    graph.addLink(7, 10,5, "#EABA35");
    graph.addLink(10, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function baseball_graph6() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 5, 1, "#EA3535");
    graph.addLink(5, 7, 1, "#EABA35");
    graph.addLink(7, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function baseball_graph7() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 5, 1, "#EA3535");
    graph.addLink(5, 7, 1, "#EABA35");
    graph.addLink(7, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}


function surfing_graph1() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 5, 5, "#EA3535");
    graph.addLink(5, 7, 5, "#EABA35");
    graph.addLink(7, 8, 5, "#EABA35");
    graph.addLink(8, 11, 5, "#EABA35");
    graph.addLink(11, 12, 5, "#EABA35");
}
function surfing_graph2() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 5, "#EA3535");
    graph.addLink(2, 5, 5, "#EA3535");
    graph.addLink(5, 7, 1, "#EABA35");
    graph.addLink(7, 8, 1, "#EABA35");
    graph.addLink(8, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function surfing_graph3() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 5, 5, "#EA3535");
    graph.addLink(5, 7, 1, "#EABA35");
    graph.addLink(7, 8, 1, "#EABA35");
    graph.addLink(8, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function surfing_graph4() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 5, "#EA3535");
    graph.addLink(2, 5, 5, "#EA3535");
    graph.addLink(5, 6, 5, "#EA3535");
    graph.addLink(6, 9, 5, "#EABA35");
    graph.addLink(9, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function surfing_graph5() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 5, 5, "#EA3535");
    graph.addLink(5, 6, 1, "#EABA35");
    graph.addLink(6, 9, 1, "#EABA35");
    graph.addLink(9, 10, 5, "#EABA35");
    graph.addLink(10, 11, 5, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function surfing_graph6() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 5, 1, "#EA3535");
    graph.addLink(5, 7, 5, "#EABA35");
    graph.addLink(7, 8, 5, "#EABA35");
    graph.addLink(8, 10, 5, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function surfing_graph7() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 5, 1, "#EA3535");
    graph.addLink(5, 7, 1, "#EABA35");
    graph.addLink(7, 8, 1, "#EABA35");
    graph.addLink(8, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}


function skate_graph1() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 5, "#EA3535");
    graph.addLink(1, 2, 5, "#EA3535");
    graph.addLink(2, 3, 5, "#EA3535");
    graph.addLink(3, 4, 5, "#EA3535");
    graph.addLink(4, 5, 5, "#EA3535");
    graph.addLink(5, 6, 5, "#EA3535");
    graph.addLink(6, 7, 5, "#EABA35");
    graph.addLink(7, 8, 5, "#EABA35");
    graph.addLink(8, 9, 5, "#EABA35");
    graph.addLink(9, 10, 5, "#EABA35");
    graph.addLink(10, 11, 5, "#EABA35");
    graph.addLink(11, 12, 5, "#EABA35");
}
function skate_graph2() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 1, "#EA3535");
    graph.addLink(2, 4, 5, "#EA3535");
    graph.addLink(4, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 8, 5, "#EABA35");
    graph.addLink(8, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function skate_graph3() {
    graph.removeAllLinks();
    graph.addLink(0, 1, 1, "#EA3535");
    graph.addLink(1, 2, 1, "#EA3535");
    graph.addLink(2, 3, 5, "#EA3535");
    graph.addLink(3, 4, 5, "#EA3535");
    graph.addLink(4, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 9, 5, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function skate_graph4() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 5, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 5, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function skate_graph5() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 7, 5, "#EABA35");
    graph.addLink(7, 9, 5, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function skate_graph6() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 7, 1, "#EABA35");
    graph.addLink(7, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
function skate_graph7() {
    graph.removeAllLinks();
    graph.addLink(0, 2, 1, "#EA3535");
    graph.addLink(2, 3, 1, "#EA3535");
    graph.addLink(3, 5, 1, "#EA3535");
    graph.addLink(5, 6, 1, "#EA3535");
    graph.addLink(6, 7, 1, "#EABA35");
    graph.addLink(7, 9, 1, "#EABA35");
    graph.addLink(9, 10, 1, "#EABA35");
    graph.addLink(10, 11, 1, "#EABA35");
    graph.addLink(11, 12, 1, "#EABA35");
}
