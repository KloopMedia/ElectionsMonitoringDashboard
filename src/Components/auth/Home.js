import React, {useEffect, useState} from "react";
import app from "../../utils/firebase.js";
import {
	HashRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";
import Tablets from "../../Components/auth/Tables"
import AdminTable from "../../Components/auth/AdminTable"
import MainAdminTable from "../../Components/auth/MainAdminTable"
import Dasboard from "../../Components/auth/Dashboard"
import TableSelector from "../../Components/auth/TableSelector"
import AnswersTable from '../../Components/auth/AnswersTable'
const queryString = require('query-string');


const Home = () => {
	return (
		<>
			<h1>Home</h1>
			<button onClick={() => app.auth().signOut()}>Sign out</button>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to={"/tables"}>Формы</Link>
							</li>
							<li>
								<Link to={"/admin"}>Таблица Атая</Link>
							</li>
							<li>
								<Link to={"/admin-role"}>Таблица юзеров с ролями</Link>
							</li>
						</ul>
					</nav>

					<Switch>
						<Route exact path="/tables" component={TableSelector}/>
						<Route path={"/tables/:table"} component={AnswersTable} />
						<Route exact path="/admin" component={AdminTable}/>
						<Route exact path="/admin-role" component={Dasboard}/>
					</Switch>
				</div>
			</Router>
		</>
	);
};

export default Home;
