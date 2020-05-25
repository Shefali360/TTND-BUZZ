import React from 'react';
import { connect } from "react-redux";
import {Route,Redirect} from 'react-router-dom';

const PrivateRouteComponent = (props) => (
    <Route {...props.routeProps} render={() => (   
    props.data&&props.data.access_token? (
        <div>{props.children}</div>
        ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} /> )
    )} />
);


const mapStateToProps = (state, ownProps) => {
    console.log("meeeeeeeeeee",state.token.token);
    return {
        
        data: state.token.token,
        location: ownProps.path,
        routeProps: {
            exact: ownProps.exact,
            path: ownProps.path
        }
    };
};


export default connect(mapStateToProps,{pure:false})(PrivateRouteComponent);