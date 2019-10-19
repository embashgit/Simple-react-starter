import React, { Component } from 'react'
import Template from './components/Template';
// import Base from './components/Base';


export class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          house:"Mansion"
        }
        
    }

   changeHouse =()=>{
       
       return this.state.house;
   }

    render() {
    //    this.setState({house:"Suite"});
        return (
            <div>
                <Template/>
                {/* <Base/> */}
                <h1> hello {`musa owns a very big  ${this.changeHouse()}`}</h1>
                <h2>{this.props.title}</h2>
                {/* <p>{Base}</p> */}
            </div>
        )
    }
}

export default App;
