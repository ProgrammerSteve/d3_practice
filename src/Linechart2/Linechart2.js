import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import './Linechart2.css';



const Linechart2=({data_x,data_y,minX=0,minY=0,maxX,maxY,chartWidth,chartHeight})=>{

    //set up dimensions for svg element
    const margin = { top: 10, right: 10, bottom: 50, left: 50 }
    const width = chartWidth - margin.left - margin.right
    const height = chartHeight - margin.top - margin.bottom

    // const maxX = 25 // Max x value
    // const maxY = 10 // Max y value

    //creates the xScale and yScale functions
    const xScale = d3.scaleLinear().domain([minX, maxX]).range([0, width])
    const yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0])


    //create the grids
    const xAxisGrid = d3.axisBottom(xScale)
    .tickSize(-height)
    .tickFormat('')
    .ticks(10);
    const yAxisGrid = d3.axisLeft(yScale)
    .tickSize(-width)
    .tickFormat('')
    .ticks(10);


    //creates a dataset object
    const dataset = d3.range(data_x.length).map((d,ind) => {
        return { x: data_x[ind], y: data_y[ind] }
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
            .attr('class', 'x_axis')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("class", "tickmarks")
        //d3.axisBottom(xScale)
        //.ticks(20)
        //.tickValues([3000,5000,9000])
        //.format(".2s")
        //let tickLabels = ['A','B','C'];
        //axisBottom(xScale).tickFormat((d,i) => tickLabels[i]);
        //.tickSize(-200);

        
        // create an svg group for y axis
        svg
            .append('g')
            .attr('class', 'y_axis')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .attr("class", "tickmarks")










        // create the grids
        svg.append('g')
            .attr('class', 'axis-grid')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(xAxisGrid);
        svg.append('g')
            .attr('class', 'axis-grid')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(yAxisGrid);
        










    
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
    ,[data_x,data_y])



    return(<div id="plot"></div>);
}
export default Linechart2;
