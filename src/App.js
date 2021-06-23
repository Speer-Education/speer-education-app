import "./App.css";
import Home from "./pages/Home/Home";
import { Router, Switch, Route } from "react-router-dom";
import history from './hooks/history';

function App() {

  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
