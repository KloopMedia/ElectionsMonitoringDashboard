import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import AdminTable from './Components/auth/AdminTable'
import MainAdminTable from './Components/auth/MainAdminTable'
import UserAnswer from './Components/auth/UserAnswer'
import Tables from './Components/auth/Tables'


class App extends Component {
  render() {
    return(
      <div className={'App'}>
      <Router>
        <Route exact path={"/kloop-table"} component={AdminTable}/>
        <Route exact path={"/kloop-table/admin"} component={MainAdminTable}/>
        <Route exact path={"/kloop-table/user-answer"} component={UserAnswer}/>
        <Route exact path={"/kloop-table/tablets"} component={Tables}/>
      </Router>
      </div>
    )
  }
}

export default App;
