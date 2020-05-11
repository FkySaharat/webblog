import React, { Component} from 'react';
import Blogs from './components/blogs';


export default class extends Component {
  constructor(){
    super();
    this.state={
      message:[]
    }
    this.pus=this.pus.bind(this);
    this.minus=this.minus.bind(this);
  }

  pus(){
    console.log("bef");
    const test=()=>{
      var temp=this.state.message;
      temp.push(1)
      this.setState({message:temp});
    }
    test();
    console.log("aft");
  }

  minus(){
    var temp=this.state.message;
    
    temp.pop()
    this.setState({message:temp});

  }
  
  render(){
     return (
    <div className="App">
      
      <Blogs/>
     <div>{this.state.message}</div>
     <button onClick={()=>this.pus()}>+</button>
     <button onClick={this.minus}>-</button>
      
    
    </div>
  );
  }

 


}

