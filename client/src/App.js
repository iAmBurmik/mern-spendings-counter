import React, { useContext } from "react"
import { useRoutes } from "./routes";
import { AuthPage } from "./pages/AuthPage";
import { BrowserRouter as Router } from "react-router-dom";
import { router } from "./pages/AuthPage";
import AuthContext from "./context/auth-context";

function App() {
  const context = useContext(AuthContext);
  const routes = useRoutes(context.isAuthenticated);

  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
