import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';

class Error extends Component{
    render(){
        if(this.props.error){
        return(
            <Redirect to='/login'/>
        )
    }else {
        return this.props.children;
    }
}

const mapStateToProps=(state)=>{
    error
}

export default connect(mapStateToProps)(Error);