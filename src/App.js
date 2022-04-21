
import Home from './components/Home'
import NavBar from './components/NavBar/NavBar';
import {Route, Routes} from "react-router"
import TemplatesView from './components/Templates/TemplatesView';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Home" element={<Home/>}/>
        <Route path="Templates" element={<TemplatesView/>}/>
      </Routes>
    </div>
  );
}

export default App;
