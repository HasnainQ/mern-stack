import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import WorkoutSingle from './pages/WorkoutSingle'

// Pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={<Home/>}
            />
            <Route
              path='/workout/:singleId'
              element={<WorkoutSingle/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
