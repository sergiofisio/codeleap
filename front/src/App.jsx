import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from "./pages/Main";
import Singup from './pages/Singup';


export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Singup />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}