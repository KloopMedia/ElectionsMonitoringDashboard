import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app, {signInWithGoogle} from "../../utils/firebase.js";
import { AuthContext } from "../../utils/Auth.js";

const Login = ({ history }) => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={"/ElectionsMonitoringDashboard/" + window.location.search} />;
  }

  return (
    <div>
      <h1>Log in</h1>

      <button onClick={signInWithGoogle}>Sign-in with Google</button>
    </div>
  );
};



export default withRouter(Login);
