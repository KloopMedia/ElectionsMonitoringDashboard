import React, {Component} from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./Components/auth/Home";
import Login from "./Components/auth/Login";


class App extends Component {
	render() {
		return (
			<AuthProvider>
				<div className={'App'}>
					<Router>
						<PrivateRoute exact path={"/kloop-table/"} component={Home}/>
						<Route exact path={"/kloop-table/login"} component={Login}/>
					</Router>
				</div>
			</AuthProvider>
		)
	}
}

export default App;
