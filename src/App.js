import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Onboarding from "./pages/Onboarding/Onboarding";
import MainApp from "./container/MainApp/MainApp";
import AdminApp from "./container/AdminApp/AdminApp";
import { useAuth } from "./hooks/useAuth";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from './hooks/history';

function App() {

  const { user } = useAuth();
  console.log(user)
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={"/login"} component={Login} />
          {user !== false ? <>
            <Route path="/app" component={MainApp} /> {/* In the future, we make it so it only renders if user is logged in */}
            <Route path="/admin-app" component={AdminApp} /> {/* Only render if user is logged in as admin*/}
            <Route exact path={"/onboarding"} component={Onboarding} /> {/* Onboarding form to get the neccesary details before starting */}
          </> : null}
          {user === false && <Route path="/">
            <Redirect to="/" />
          </Route>}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
