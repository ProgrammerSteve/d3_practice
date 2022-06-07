import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import './Linechart.css';



const Linechart=()=>{

    //set up dimensions for svg element
    const margin = { top: 10, right: 10, bottom: 50, left: 50 }
    const width = 1000 - margin.left - margin.right
    const height = 420 - margin.top - margin.bottom

    const maxX = 25 // Max x value
    const maxY = 10 // Max y value

    //creates the xScale and yScale functions
    const xScale = d3.scaleLinear().domain([0, maxX]).range([0, width])
    const yScale = d3.scaleLinear().domain([0, maxY]).range([height, 0])

    const data=[
        [0,2],
        [4,7],
        [5,3],
        [11,6],
        [15,3],
        [17,2],
    ]


    //creates a dataset object
    const dataset = d3.range(data.length).map((d,ind) => {
        return { x: data[ind][0], y: data[ind][1] }
      })


    useEffect(()=>{

        //creates the svg object for the chart
        const svg = d3
        .select('#plot')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

        // create an svg group for x axis
        svg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(xScale))
        
        // create an svg group for y axis
        svg
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(d3.axisLeft(yScale))

        // creates the line
        const line = d3
            .line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y))
        
        //appends the line
        const lineWrapper = svg
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
        //appends the path between the points
        lineWrapper
            .append('path')
            .datum(dataset)
            .attr('class', 'line')
            .attr('d', line)
        

        //whenever the chart rerenders, remove old data with callback
        return ()=>{
            d3.selectAll("svg").remove();
        }

    }
    ,[data])



    return(<div 
        style={{marginInline:'auto',backgroundColor:'grey', marginTop:'25%'}}
        id="plot"></div>);
}
export default Linechart;
