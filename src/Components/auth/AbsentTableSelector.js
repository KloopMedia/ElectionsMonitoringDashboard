import React, {Component, useEffect, useState} from 'react'
import firebase from "../../utils/firebase";
import Template from "../Template"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
	Link,
	useRouteMatch
} from "react-router-dom";
import { Grid } from "@material-ui/core";

const queryString = require('query-string');

const Tables = () => {
	const [forms, setForms] = useState([])
	const [ready, setReady] = useState(false)

	let { path, url } = useRouteMatch();

	useEffect(() => {
		setReady(false)
        let urlString = queryString.parse(window.location.search)
        console.log(urlString)
		if (urlString.url) {
			fetch(urlString.url)
			.then((response) => response.json())
			.then((data) => {
				console.log("DATA", data);
				setForms(data.forms)
				setReady(true)
			});
		} else {
			console.log("ERROR: no url detected")
		}
	}, [])
	 

	return (
        ready ? <div>
            <ul>
            {forms.map((el, i) => {
              return ( 
                <li key={i}>
                  <Link to={url + el.path}>{el.label}</Link>
                </li>
                )
            })}
            </ul>
            <br/>
            
            <Switch>
              <Route path={path + "/:table"}>
                <Template />
              </Route>
            </Switch>
            </div> : null
	);
}

export default Tables;