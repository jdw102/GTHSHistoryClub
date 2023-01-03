import './App.css';
import Navbar from './Components/Navbar.js';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Information from './Components/Information.js';
import Resources from './Components/Resources.js';
import Mission from './Components/Mission.js';
import Homepage from './Components/Homepage.js';
import Helmet from 'react-helmet';
import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: '#002d59' 
    },
    secondary: {
      main: '#ed4134'
    },
    info: {
      main: '#8a6866'
    }
  }
});

function App() {
  return (
    <div className="App" >
      <ThemeProvider theme = {theme}>
        <Helmet>
            <style>{'body { background-color: #c9c5c5; }'}</style>
        </Helmet>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element = {<Homepage />} />
            <Route path='/mission' element = {<Mission />} />
            <Route path='/information' element = {<Information />} />
            <Route path='/resources' element = {<Resources />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
