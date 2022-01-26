import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import Details from './components/Details';
import EditVideogame from './components/EditVideogame';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
       <Route exact path = '/' element = {<LandingPage />} />
       <Route path = '/home' element = {<Home />} />
       <Route path = '/videogame' element = {<CreateVideogame />} />
       <Route path = '/home/:id' element = {<Details />} />
       <Route path = '/home/edit/:id' element = {<EditVideogame />} />
      
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
