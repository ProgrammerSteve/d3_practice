const Button=({handler,data=[],text})=>{

    return(
        <>
        <button onClick={(e)=>handler(e)}>
            {`${text}`}
        </button>
        </>
    )
}
export default Button;