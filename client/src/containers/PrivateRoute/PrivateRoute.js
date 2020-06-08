import React from 'react';
import { connect } from "react-redux";
import {Route,Redirect} from 'react-router-dom';


// const token=JSON.parse(localStorage.getItem("token"));
// console.log(token);


const PrivateRouteComponent = (props) => (
 
    <Route {...props.routeProps} render={() => (
        
    ((props.token&&props.token.access_token))? (
        <div>{props.children}</div>
        ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} /> )
    )} />
);


const mapStateToProps = (state, ownProps) => {
    // console.log(state.auth.token);
    return {
        token:state.auth.token,
        location: ownProps.path,
        routeProps: {
            exact: ownProps.exact,
            path: ownProps.path
        }
    };
};


export default connect(mapStateToProps,{pure:false})(PrivateRouteComponent);