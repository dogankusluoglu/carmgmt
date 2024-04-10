import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { CarsView } from "./components/CarsView";
import { CarEditPage } from "./components/CarEditPage";
import { Expenses } from "./components/Expenses";

import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  return (
    // JSX expressions must have a single element
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/viewcars" element={<CarsView />} />
        <Route path="/editcar/:carId" element={<CarEditPage />} />
        <Route path="/expenses" element={<Expenses />} />
        {/* <Route path="/about" component={AboutPage} /> */}
        {/* Define other routes here */}
      </Routes>
      {/* <div className="container">
        <Header />
      </div> */}
    </Router>
  );
}

export default App;
