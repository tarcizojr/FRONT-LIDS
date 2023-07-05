import './App.css';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css"; 
import Menu from './components/Menu/Menu';
import AppRouts from './main/AppRoutes';   

function App() {
  return (
      <div>
        <Menu></Menu>
        <AppRouts></AppRouts>
      </div>
    
  );
}

export default App;
