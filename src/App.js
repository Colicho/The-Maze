import './App.css';
import React from "react"
import Header from "./components/header"
import Main from "./components/main"
import Footer from "./components/footer"

class App extends React.Component{
  constructor(){
    super()

  }
  render(){
    return(
      <div className="page">
        <noscript>Your browser doesn't support or has disabled javascripts</noscript>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}




export default App;
