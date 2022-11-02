import Home from "./Components/Home";
import ToDo from "./Components/ToDo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import About from "./Components/About";
import Createpost from "./Components/Createpost";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/about/:id" element={<About />} />
            <Route path="/createpost" element={<Createpost />} />
           
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
