import React, {useEffect, useState} from "react";
import Button from "./Button";
import * as d3 from "d3";
import './App.css';

const initialArray=[10,5,12,3,7,15,7,17];
const App=({dynamicWidth,loading})=>{
const [data,setData]=useState([...initialArray]);
const [field,setField]=useState('');

const handleResetButton=(e)=>{
  e.preventDefault();
  setData(arr=>[...initialArray]);
  setField('');
}

const handleSendButton=(e)=>{
  e.preventDefault();
  if(field>0){
    setData(arr=>[...arr, parseInt(field)]);
  }
  setField('');
}

const handleAscendButton=(e)=>{
  e.preventDefault();
  let arr=[...data];
  for(let i=0;i<data.length;i++){
    for(let j=i+1;j<data.length;j++){
      if (arr[j]>arr[i]){
        let temp=arr[j]
        arr[j]=arr[i];
        arr[i]=temp;            
      }
    }
  }
  setData(data=>[...arr]);
}

const handleDescendButton=(e)=>{
  e.preventDefault();
  let arr=[...data];
  for(let i=0;i<data.length;i++){
    for(let j=i+1;j<data.length;j++){
      if (arr[j]<arr[i]){
        let temp=arr[j]
        arr[j]=arr[i];
        arr[i]=temp;            
      }
    } 
  }
  setData(data=>[...arr]);
}

useEffect(()=>{
  let width = dynamicWidth;
  let scaleFactor = 10;
  let barHeight = 20;

  let graph = d3.select("#container")
    .append("svg")
    .attr("class","barChartSort")
    .attr("width", width)
    .attr("height", barHeight * data.length);

  let bar = graph.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
    return "translate(0," + i * barHeight + ")";
    });

  bar.append("rect")
    .attr("width", function(d) {
    return d * scaleFactor;
    })
    .attr("height", barHeight - 1);

  bar.append("text")
    .attr("x", function(d) { return (d*scaleFactor); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

  return ()=>{
    d3.select(".barChartSort").remove();
  }
}
,[data, dynamicWidth, loading]);

  return (
    <div>
      <div className="top">
        <h4>Data:</h4>
        <h5>{data.map(num=>`${num}, `)}</h5>
        <form>
                <div>
                  <label>Enter a number...</label>
                </div>
                <div>
                  <input 
                    type="number" 
                    onChange={(e)=>setField(e.target.value)}
                    value={field}
                  ></input>
                  <Button
                    handler={handleSendButton}
                    text={'SEND'}
                  />
                </div>
        </form> 
      </div>
      <Button handler={handleResetButton} text={'RESET'}/>
      <Button handler={handleAscendButton} text={'ASCEND'}/>
      <Button handler={handleDescendButton} text={'DESCEND'}/>
      <div id="container"></div>
    </div>
  );
}

export default App;
