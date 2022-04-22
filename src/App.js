
import Home from './components/Home/Home'
import {Route, Routes} from "react-router"
import TemplatesView from './components/Templates/Templates';
import Header from './components/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
    <Container>
    <Header/>
    
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Home" element={<Home/>}/>
        <Route path="Templates" element={<TemplatesView/>}/>
      </Routes>
      </Container>
    </div>
  );
}

export default App;
