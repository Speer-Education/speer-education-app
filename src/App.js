import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MainApp from "./container/MainApp/MainApp";
import AdminApp from "./container/AdminApp/AdminApp";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/main-app" component={MainApp} />
            <Route path="/admin-app" component={AdminApp} />
            <Route exact path={"/login"} component={Login}/>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
