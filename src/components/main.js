import React from "react"
import Begin from "./mainComp/theGame"


function Main(){
    return(
        <div className="game">
            <div id="board"></div>
            <button onClick={Begin}>Begin</button>
            <p>test</p>
        </div>
    )
}


export default Main