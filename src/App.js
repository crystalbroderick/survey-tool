import Home from "./components/Home/Home";
import { Route, Routes } from "react-router";
import TemplatesView from "./components/Templates/Templates";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Template from "./components/Templates/Template";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Templates" exact element={<TemplatesView />} />
          <Route path="Templates/:id" element={<Template />} />
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
  );
}

export default App;
