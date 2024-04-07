import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  return (
    // JSX expressions must have a single element
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header />} />
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
