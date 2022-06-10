
import React, {useEffect, useState, useRef, useLayoutEffect} from "react";
import Scatterplot from "./Scatterplot/Scatterplot";
import App from './App.js'
import './Container.css';

const Container=()=> {
    const [mass,setMass]=useState([]);
    const [year,setYear]=useState([]);
    const [loading,setLoading]=useState(true);

    const divRef=useRef(null);
    const [dynamicWidth,setDynamicWidth]=useState(0)

    const updateDimensions = () => {
        console.log(divRef.current.clientWidth);
        if (divRef.current) setDynamicWidth(divRef.current.clientWidth*0.8);
      };
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        setDynamicWidth(divRef.current.clientWidth*0.8);
        return () => {
          console.log("dismount");
          window.removeEventListener("resize", updateDimensions);
        };
      }, []);

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
                    setMass(mass=>res.data.launches.map(obj=>obj.rocket.rocket.mass.kg/2000))
                    setYear(year=>res.data.launches.map(obj=>Number(obj.launch_date_local.substring(0,4))))
                    setLoading(loading=>false)
                }

            );
    },[])

    return(
        <div 
        id="divContainer"
        ref= {divRef}
        style={{
            display:'grid', 
            placeItems:'center', 
            marginInline:'auto',
            width:'80%',
            backgroundColor:'white'
            }}>
            
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
                chartWidth={dynamicWidth} 
                chartHeight={420}
                xTitle={'Year'}
                yTitle={'Mass in metric Tons'}
                gTitle={'SpaceX Rocket Mass vs Time'}
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
                chartWidth={dynamicWidth} 
                chartHeight={420}
                xTitle={'Year'}
                yTitle={'Mass in metric Tons'}
                gTitle={'SpaceX Rocket Mass vs Time'}
                />
                </>
            }
            <p style={{width:'80%'}}>
                Fetches information about shuttles from the spaceX graphQL api. 
                The mass is plotted against the year and a linear regression is 
                plotted onto the scatter plot along with its equation.
            </p>

        </div>
    )

}

export default Container;