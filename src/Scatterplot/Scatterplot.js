import './Scatterplot.css';
import * as d3 from "d3";
import { useEffect } from 'react';



const Scatterplot=({data_x,data_y,minX,maxX,minY,maxY,chartWidth,chartHeight})=>{

    // const scatterpoints = [
    //     [90, 20], 
    //     [20, 100], 
    //     [66, 44], 
    //     [53, 80], 
    //     [24, 182], 
    //     [80, 72], 
    //     [10, 76], 
    //     [33, 150], 
    //     [100, 15]
    // ];

    // const data_x=[0,1,2,3,4,5,6,7,8,9]
    // const data_y=[5,1,8,3,6,2,1,2,9,3]

    //set up dimensions for svg element

    function getTextWidth(text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
      
        context.font = font || getComputedStyle(document.body).font;
      
        return context.measureText(text).width;
    }


    const margin = { top: 50, right: 10, bottom: 50, left: 50 }
    const width = chartWidth - margin.left - margin.right
    const height = chartHeight - margin.top - margin.bottom

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
        const svg = d3
            .select('#scatter')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        // create X and Y axis
        svg
            .append('g')
            .attr('class', 'x_axis')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("class", "tickmarks")
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









            
        // Title
        svg.append('text')
        .attr('text-anchor',"middle")
        // .attr("alignment-baseline", "alphabetic")
        .attr('class','titleText')
        .attr('x', chartWidth)
        .attr('y', margin.top-5)
        // .style('font-family', 'Helvetica')
        // .style('font-size', 50)
        .text('Scatter Plot');
        

















        // X label
        svg.append('text')
        .attr('x', width/2 + 100)
        .attr('y', height - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Independant');
        
        // Y label
        svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Dependant');


        // create scatter points
        svg.append('g')
            .selectAll("dot")
            .data(dataset)
            .enter()
            .append("circle")
                .attr("cx", function (d) { return xScale(d.x); } )
                .attr("cy", function (d) { return yScale(d.y); } )
                .attr("r", 3)
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .style("fill", "#CC0000");


        return ()=>{
            d3.selectAll("svg").remove();
        }
    },[data_x,data_y])

    return(
        <div id="scatter"></div>
    )
}

export default Scatterplot;