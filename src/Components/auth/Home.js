import React, {useEffect, useState} from "react";
import app from "../../utils/firebase.js";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";
import Tablets from "../../Components/auth/Tables"
import AdminTable from "../../Components/auth/AdminTable"
import MainAdminTable from "../../Components/auth/MainAdminTable"
const queryString = require('query-string');


const Home = () => {
	const [forms, setForms] = useState([])
	const [home, setHome] = useState("")

	useEffect(() => {
		let urlString = queryString.parse(window.location.search)
		console.log(urlString)
		setHome(urlString.url)
		if (urlString.url) {
			fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					setForms(data)
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}, [])

	return (
		<>
			<h1>Home</h1>
			<button onClick={() => app.auth().signOut()}>Sign out</button>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to={"/ElectionsMonitoringDashboard/tablets" + window.location.search}>Формы</Link>
							</li>
							<li>
								<Link to={"/ElectionsMonitoringDashboard/admin" + window.location.search}>Таблица Атая</Link>
							</li>
							<li>
								<Link to={"/ElectionsMonitoringDashboard/admin-role" + window.location.search}>Таблица юзеров с ролями</Link>
							</li>
						</ul>
					</nav>

					<Switch>
						<Route exact path="/ElectionsMonitoringDashboard/tablets" component={Tablets}/>
						<Route exact path="/ElectionsMonitoringDashboard/admin" component={AdminTable}/>
						<Route exact path="/ElectionsMonitoringDashboard/admin-role" component={MainAdminTable}/>
					</Switch>
				</div>
			</Router>
		</>
	);
};

export default Home;
