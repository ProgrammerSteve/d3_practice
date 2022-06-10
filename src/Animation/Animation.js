import { Motion, spring, presets } from "react-motion";
import React, {useState} from "react";

const Animation=()=>{
    //Animation
    const [startAnimation, setAnimation] = useState(false);
    const initialStyle = { 
        opacity: 0, 
        translateY: 30,
    };
    const handleSubmitForm=(e)=>{
    e.preventDefault();
    }
    return(
        <div>
            <Motion
                style=
                {
                    startAnimation?
                    {
                        opacity: spring(1),
                        translateY: spring(0, presets.wobbly),
                    }
                    : initialStyle
                }>
                    {interpolatedStyles => (
                        <div
                            style=
                            {{
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
                    handleSubmitForm(e);
                    setAnimation(true);
                    setTimeout(
                        function(){
                            setAnimation(false);
                        }, 1000);
                }}
            >
                ANIMATE
            </button>  
        </div>
    )
}
export default Animation;