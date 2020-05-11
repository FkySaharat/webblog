import React, { Component} from 'react';
import Blogs from './components/blogs';
import CreateForm from './components/form';

export default class extends Component {
  constructor(){
    super();
    this.state={
      message:[]
    }
    this.show=this.show.bind(this);
  
  }

  show(){

  }
  
  render(){
     return (
    <div className="App"  >
      
      <CreateForm/>
      <Blogs/>
      
     <div>{this.state.message}</div>
     <button onClick={()=>this.show()}>create</button>

      
    
    </div>
  );
  }

 


}

