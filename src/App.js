import Home from "./components/Home";
import ToDo from "./components/ToDo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Createpost from "./components/Createpost";
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
