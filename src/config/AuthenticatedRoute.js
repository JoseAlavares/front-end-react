import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = (props) => {
	const token = window.sessionStorage.getItem("jwt") || null;	

	if(token) {		
		return (
			<Route path={props.path} exact component={props.component}/>
		);
	}
	else {
		return (
			<Redirect to="/login"/>
		);
	}
};

export default AuthenticatedRoute;