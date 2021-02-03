import React from "react"
import func from "./mainComp/theGame"


function Main(props){
    return(
        <div className="game">
            <div id="beginDiv">
                <button className="buttonBegin" onClick={func.Begin}>Begin</button>
            </div>
            <div id="board"></div>

            <div id="buttons">
                <button className="button" onClick={() => func.Direction("wa")}>Up-Left</button>
                <button className="button" onClick={() => func.Direction("w")} >Up</button>
                <button className="button" onClick={() => func.Direction("wd")} >Up-Right</button>
                <button className="button" onClick={() => func.Direction("a")} >Left</button>
                <button className="button" onClick={() => func.Direction("b")} >Back</button>
                <button className="button" onClick={() => func.Direction("d")} >Right</button>
                <button className="button" onClick={() => func.Direction("as")} >Down-Left</button>
                <button className="button" onClick={() => func.Direction("s")} >Down</button>
                <button className="button" onClick={() => func.Direction("sd")} >Down-Right</button>
            </div>
            <div id="winning"></div>
        </div>
    )
}


export default Main