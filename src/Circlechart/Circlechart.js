import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import './Circlechart.css';



const Circlechart=()=>{

    var width2 = 400;      
    var height2 = 400;
    var data2 = [10, 20, 30];
    var colors = ['green', 'purple', 'yellow'];
    useEffect(()=>{
        var svg = d3
        .select("#div2")
        .append("svg")
        .attr("width", width2)
        .attr("height", height2);
        var g = svg.selectAll("g")
        .data(data2)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(0,0)";
        })
        g.append("circle").attr("cx", function(d, i) {
        return i*75 + 50;
        })
        .attr("cy", function(d, i) {
        return 75;
        })
        .attr("r", function(d) {
        return d*1.5;
        })
        .attr("fill", function(d, i){
        return colors[i];
        })
        g.append("text").attr("x", function(d, i) {
        return i * 75 + 25;
        })
        .attr("y", 80)
        .attr("stroke", "teal")
        .attr("font-size", "10px")
        .attr("font-family", "sans-serif").text(function(d) {
        return d;
        });
    }
    ,[data2]);
    






    return(<div id="div2"></div>);
}
export default Circlechart;
