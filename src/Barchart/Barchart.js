import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import './Barchart.css';



const Barchart=()=>{


    let data = [10, 5, 12, 15];
    let width = 300;
    let scaleFactor = 20;
    let barHeight = 30;

useEffect(()=>{
    var graph = d3.select("#div1")
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length);

    var bar = graph.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
    return "translate(0," + i * barHeight + ")";
    });

    bar.append("rect").attr("width", function(d) {
    return d * scaleFactor;
    }).attr("height", barHeight - 1);

    bar.append("text")
    .attr("x", function(d) { return (d*scaleFactor); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
    return ()=>{
    d3.selectAll("svg").remove();
    }
}
,[data]);



    return(<div id="div1"></div>);
}

export default Barchart;