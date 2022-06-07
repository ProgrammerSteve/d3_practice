import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import './App.css';
import { Motion, spring, presets } from "react-motion";


const handleSubmitForm=(e)=>{
  e.preventDefault();
}

const initialArray=[
10,5,12,3,7,15,7,17
];

function App() {

const [data,setData]=useState([...initialArray]);
const [field,setField]=useState('');





//Animation
const [startAnimation, setAnimation] = useState(false);
const initialStyle = { 
  opacity: 0, 
  translateY: 30,
};



useEffect(()=>{
  let width = 1000;
  let scaleFactor = 10;
  let barHeight = 20;

  let graph = d3.select("#container")
    .append("svg")
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
    d3.selectAll("svg").remove();
  }
}
,[data]);




  return (
    <div>
      <div className="top">




        <Motion
          style={
            startAnimation
              ? {
                  opacity: spring(1),
                  translateY: spring(0, presets.wobbly),
                }
              : initialStyle
          }
        >
          {interpolatedStyles => (
            <div
              style={{
                transform: `translateY(${interpolatedStyles.translateY}px)`,
                opacity: interpolatedStyles.opacity
              }}
            >
              <h1>ANIMATION</h1>
            </div>
          )}
        </Motion>

        <button 
        id="resetButton"
        onClick={(e)=>{
        handleSubmitForm(e,data);
        setAnimation(true);
        setTimeout(function(){
          setAnimation(false);
        }, 1000);
        }}>ANIMATE</button>  






      





















      <h3>Textfield: '{field}'</h3>
      <h3>Data: {data.map(num=>`${num}, `)}</h3>
      <form>
        <label>Enter a number...</label>
        <input 
        type="number" 
        onChange={(e)=>setField(e.target.value)}
        value={field}
        ></input>
      <button 
        id="button"
        onClick={(e)=>{
        handleSubmitForm(e,data);
        (field>0)?setData(arr=>[...arr, field]):setData(arr=>[...arr]);
        console.log(data);
        setField('');
      }}>  
      Send</button>


      <div>
      <button 
        id="resetButton"
        onClick={(e)=>{
        handleSubmitForm(e,data);
        setData(arr=>[...initialArray]);
        setField('');
        d3.select('#log').selectAll('p').remove();
        d3.select('#log').selectAll('hr').remove();
      }}>RESET</button>  


      <button 
        id="sortButton"
        onClick={(e)=>{
        handleSubmitForm(e,data);
        let arr=[...data];
        d3.select('#log')        
        .append('p')
        .text(`Original: ${data.map(num=>`${num}`)}`);
        d3.select('#log')
        .append('p')
        .text(`Length: ${data.length}`);

        for(let i=0;i<data.length;i++){
          for(let j=0;j<data.length-1;j++){
            if (arr[j]>arr[i]){
              let temp=arr[j]
              arr[j]=arr[i];
              arr[i]=temp;

              d3.select('#log')
              .append('p')
              .text(`Iteration ${i},${j}:  ${arr[j]} to ${arr[i]} // ${arr.map(num=>`${num}`)}`);              
            }
          }
        }
        d3.select('#log').append('hr')
        setData(data=>[...arr]);
        setField('');
      }}>ASCENDING</button> 



      <button 
        id="sortButton"
        onClick={(e)=>{
        handleSubmitForm(e,data);
        let arr=[...data];
        d3.select('#log')        
        .append('p')
        .text(`Original: ${data.map(num=>`${num}`)}`);
        d3.select('#log')
        .append('p')
        .text(`Length: ${data.length}`);

        for(let i=0;i<data.length;i++){
          for(let j=0;j<data.length-1;j++){
            if (arr[j]<arr[i]){
              let temp=arr[j]
              arr[j]=arr[i];
              arr[i]=temp;

              d3.select('#log')
              .append('p')
              .text(`Iteration ${i},${j}:  ${arr[j]} to ${arr[i]} // ${arr.map(num=>`${num}`)}`);              
            }
          }
        }
        d3.select('#log').append('hr')
        setData(data=>[...arr]);
        setField('');
      }}>DESC</button> 



      </div>
      </form> 
      </div>



      <div id="container"></div>
      <div id="log">
        <h3>LOG:</h3>
      </div>
    </div>
  );
}

export default App;

