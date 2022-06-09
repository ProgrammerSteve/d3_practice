
import React, {useEffect, useState} from "react";
// import Linechart from "./Linechart/Linechart";
// import Linechart2 from "./Linechart2/Linechart2";
import Scatterplot from "./Scatterplot/Scatterplot";
// import * as d3 from "d3";
import './Container.css';


const Container=()=> {


    const [mass,setMass]=useState([]);
    const [year,setYear]=useState([]);
    const [minMaxMass, setMinMaxMass]=useState([0,0]);
    const [minMaxYear, setMinMaxYear]=useState([0,0]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{


        fetch('https://api.spacex.land/graphql/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { query: 
                    `
                    query Launches {
                        launches {
                        rocket {
                            rocket {
                            mass {
                                kg
                            }
                            }
                        }
                        launch_date_local
                        }
                    }
                    ` 
                }   
            ),
            })
            .then(res => res.json())
            .then(res => 
                {
                    // console.log(res.data.launches[0].launch_date_local.substring(0,4).parseInt());
                    // console.log(res.data.launches[0].rocket.rocket.mass.kg);
                    setMass(mass=>res.data.launches.map(obj=>obj.rocket.rocket.mass.kg/2000))
                    setYear(year=>res.data.launches.map(obj=>Number(obj.launch_date_local.substring(0,4))))
                    // setMinMaxMass(mass=>[findMinValue(mass),findMaxValue(mass)])
                    // setMinMaxYear(year=>[findMinValue(year),findMaxValue(year)])
                    setLoading(loading=>false)

                }

            );


    },[])


    const findMaxValue=(arr)=>{
        let maxValue=0;
        arr.map((num,ind)=>{
            if(num>maxValue)maxValue=num;
        })
        return maxValue
    }

    const findMinValue=(arr)=>{
        let minValue=99999999;
        arr.map((num,ind)=>{
            if(num<minValue)minValue=num;
        })
        return minValue
    }



    const findMaxValues=(arr)=>{
        let maxX=0;
        let maxY=0;
        arr.map((arr2,ind)=>{
            if(arr2[0]>maxX)maxX=arr2[0];
            if(arr2[1]>maxY)maxY=arr2[1];
        })
        return [maxX,maxY]
    }




    
    const data=[
        [0,2],
        [4,7],
        [5,3],
        [11,6],
        [15,3],
        [17,2],
        [21,6],
    ]
    const data2=[
        [0,0],
        [1,1],
        [2,4],
        [3,9],
        [4,16],
        [5,25],
        [6,36],
    ]
    const [x1,y1]=findMaxValues(data);
    const [x2,y2]=findMaxValues(data2);

    // const x3min=findMinValue(mass);
    // const y3min=findMinValue(year);
    // const x3max=findMaxValue(mass);
    // const y3max=findMaxValue(year);

    return(
        <div style={{display:'grid', placeItems:'center'}}>
            
            {/* <Linechart 
            data={data} 
            maxX={x1+1} 
            maxY={y1+3} 
            chartWidth={1000} 
            chartHeight={420}
            />

            <Linechart 
            data={data2} 
            maxX={x2+1} 
            maxY={y2+3} 
            chartWidth={800} 
            chartHeight={420}
            /> */}


            {/* <Scatterplot
            data_x={[0,1,2,3,4,5,6,7,8,9]} 
            data_y={[0,1,2,3,4,5,6,7,8,9]} 
            minX={0}
            maxX={10} 
            minY={0} 
            maxY={10} 
            chartWidth={800} 
            chartHeight={420}
            /> */}

            <div style={{height:"250px"}}></div>

            {
                loading||mass.length==0||year.length==0?
                <Scatterplot
                data_x={[]} 
                data_y={[]} 
                minX={2005}
                maxX={2023} 
                minY={0} 
                maxY={800}  
                chartWidth={800} 
                chartHeight={420}
                />
                :
                <>
                <Scatterplot
                data_x={year} 
                data_y={mass} 
                minX={2005}
                maxX={2023} 
                minY={0} 
                maxY={800}  
                chartWidth={800} 
                chartHeight={420}
                />
                </>
            }
{/* 
            <button onClick={()=>console.log('mass: ', minMaxMass)}>Mass</button>
            <button onClick={()=>console.log('year: ', minMaxYear)}>Year</button> 
*/}
        </div>
    )

}

export default Container;