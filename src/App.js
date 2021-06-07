import "./App.css";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Home />
      </div>
    </AuthProvider>
  );
}

export default App;
