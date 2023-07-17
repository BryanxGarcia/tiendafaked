import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Productos from '../src/components/Productos';
import Menu from '../src/components/Menu';
import InformacionProducto from '../src/components/InformacionProducto';

import './App.css';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Router>
      <div>
        <Menu/>
      </div>
          <Routes>
            <Route path="/productos" element={<Productos/> }/>
            <Route path="/informacion" element={<InformacionProducto/>}/> 
          </Routes>
      </Router>
    </div>
  );
}

export default App;
