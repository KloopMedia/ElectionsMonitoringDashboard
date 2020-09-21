import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import AdminTable from  './pages/AdminTable'
import MainAdminTable from  './pages/MainAdminTable'


class App extends Component {
  render() {
    return(
      <div className={'App'}>
      <Router>
        <Route exact path={"/kloop-table"} component={AdminTable}/>
        <Route exact path={"/kloop-table/admin"} component={MainAdminTable}/>
      </Router>
      </div>
    )
  }
}

export default App;
