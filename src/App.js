import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import TemplatesView from "./components/Templates/Templates";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Template from "./components/Templates/Template";
import Signup from "./components/Signup/Signup";
import { AuthProvider } from "./components/contexts/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Container>
        <Header />        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Templates" exact element={<TemplatesView />} />
          <Route path="Templates/:id" element={<Template />} />
          <Route path="/dashboard" element={
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "50vh"}}>
              <div
              className="w-100"
              style={{ maxWidth: "400px"}}>
                <PrivateRoute><Dashboard /></PrivateRoute>}
             </div>
            </Container>}
           />
          <Route path="/update-profile" element={
          <Container
          className="d-flex align-items-center justify-content-center"
          style={{minHeight: "50vh"}}>
            <div
            className="w-100"
            style={{ maxWidth: "400px"}}>
              <PrivateRoute><UpdateProfile /></PrivateRoute>
           </div>
          </Container>} />
          <Route path="/signup" element={
          <Container
          className="d-flex align-items-center justify-content-center"
          style={{minHeight: "50vh"}}>
            <div
            className="w-100"
            style={{ maxWidth: "400px"}}>
              <Signup />
           </div>
          </Container>
          } />
          <Route path="/login" element={
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "50vh"}}>
              <div
              className="w-100"
              style={{ maxWidth: "400px"}}>
                <Login />
             </div>
            </Container>
          } />
          <Route path="/forgot-password" element={
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "50vh"}}>
              <div
              className="w-100"
              style={{ maxWidth: "400px"}}>
                <ForgotPassword />
             </div>
            </Container>
            } />
          } />
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
