import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEmployee from "./pages/AddEmployee";
import Navbar from "./components/NavBar";
import { useState } from "react";
import ServicesList from "./pages/ServicesList";




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token"),
  );

  const checkAuth = () => {
    setIsAuthenticated(!!sessionStorage.getItem("token"));
  };
  return (
    <Router>
      <div>
        <main>
          {isAuthenticated && (
            <Navbar onLogout={() => setIsAuthenticated(false)} />
          )}
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={checkAuth} />} />
            <Route
              path="/register"
              element={<Register onRegisterSuccess={checkAuth} />}
            />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/services" element={<ServicesList />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
