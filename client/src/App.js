import React, { Component} from 'react';
import Axios from "axios";

export default class extends Component {
  constructor(){
    super();
    this.state={
      message:''
    }
  }

  look(){
      //var mess='';
      Axios({
      method: "GET",
      url: "http://localhost:5000/1",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      alert(res.data.message);
    });
  }
  
  render(){
     return (
    <div className="App">
      
      
      <button onClick={this.look}>Take the shot!</button>
      
    
    </div>
  );
  }

 


}

