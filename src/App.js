import { BrowserRouter as Router, Route, Routes } from "react-router";
import Container from "react-bootstrap/Container";
import TemplateEditor from "./components/Templates/Editor";
import { AuthProvider } from "./components/context/AuthContext";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import "./custom.scss";
import Surveys from "./components/Surveys/Surveys";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import TemplatesView from "./components/Templates/TemplatesView";
import Header from "./components/Header";

function App() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // check if user is logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        if (window.location.pathname === "/login") {
          window.location = "dashboard";
        }
        setIsLoggedIn(true);
      } else {
        if (window.location.pathname === "/login") return; // User on log in page, no change
        if (window.location.pathname !== "/login") {
          // redirect to log in
          window.location = "login";
        }
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <AuthProvider>
      <div className="App">
        <Header isLoggedIn={isLoggedIn}></Header>
        <Container className="mt-5">
          <Routes>
            <Route path="/" element={<Surveys />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/templates" element={<TemplatesView />} />
            <Route path="/template/:id" element={<TemplateEditor />} />
            <Route path="/surveys/:uid" element={<Surveys />} />
            <Route path="/surveys/" element={<Surveys />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>ERROR: Page not found!</p>
                </main>
              }
            />
          </Routes>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
