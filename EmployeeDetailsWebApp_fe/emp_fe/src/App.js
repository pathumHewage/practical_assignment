
import {Employee} from './components/Employee';
import { Department } from './components/Department';
import { BrowserRouter,Route,Routes,NavLink} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>

    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Employee Details Mangement System
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
        <ul className="navbar-nav">
         
          <li className="nav-item- m-1">
            <NavLink className="btn btn-info btn btn-outline-secondary" to="/department">
              Department
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-info btn btn-outline-secondary" to="/employee">
              Employee
            </NavLink>
          </li>
        </ul>
      </nav>

 

    <Routes>

    
    <Route path="/employee" element={<Employee/>} />
    <Route path="/department" element={<Department/>} />
   

  </Routes>
</div>
</BrowserRouter>
  );
 }

 export default App;


