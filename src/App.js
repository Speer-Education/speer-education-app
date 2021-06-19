import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Onboarding from "./pages/Onboarding/Onboarding";
import MainApp from "./container/MainApp/MainApp";
import AdminApp from "./container/AdminApp/AdminApp";
import { AuthProvider } from "./hooks/useAuth";
import { Router, Switch, Route } from "react-router-dom";
import history from './hooks/history';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/app" component={MainApp} /> {/* In the future, we make it so it only renders if user is logged in */}
            <Route path="/admin-app" component={AdminApp} /> {/* Only render if user is logged in as admin*/}
            <Route exact path={"/login"} component={Login}/> 
            <Route exact path={"/onboarding"} component={Onboarding}/>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
