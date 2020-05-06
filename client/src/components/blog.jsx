import React,{ Component } from "react";
import {Grid,Paper} from '@material-ui/core';
import Axios from "axios";
class Blogs extends Component{
    constructor(){
        super();
        this.state={
          message:'',
          blogs:[]
        }
    }

    componentDidMount(){
        
        Axios({
        method: "GET",
        url: "http://localhost:5000/blog",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(this.state.blogs);
        this.setState({blogs:res.data.message});  
        console.log(this.state.blogs);
      });
    }

   


    deleteBlog(bid){
        
        var Id = String(bid)
        Axios({
            method: "DELETE",
            url: "http://localhost:5000/blog/"+Id,
            headers: {
              "Content-Type": "application/json"
            }
        }).then(()=>{
            console.log("after")
        });

        Axios({
            method: "GET",
            url: "http://localhost:5000/blog",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            console.log(this.state.blogs);
            this.setState({blogs:res.data.message});  
            console.log(this.state.blogs);
          });
        
    }

    render(){
        return(
             <Grid container  direction="column" justify="flex-start" alignItems="center" spacing={2} style={{backgroundColor:'#F2F3F4'}} >
               {this.state.blogs.map(m=>{
                    return <Grid key={m.blog_id}  item xs  style={{ width:'500px'}}>
                                <Paper>
                                    <button onClick={()=> this.deleteBlog(m.blog_id)}>x</button>
                                        <h2>{m.title}</h2>
                                        <p>{m.body}</p>
                                </Paper>      
                            </Grid>
               })}
                
            </Grid>
        );
      
    }
}

export default Blogs; 