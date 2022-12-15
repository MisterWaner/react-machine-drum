import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from 'components/UI/Layout';

import Home from 'components/Home';
import About from 'components/About';


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<About/>} path="/react-machine-drum/about" />
          <Route element={<Home/>} path="/react-machine-drum/" />
        </Routes>
      </Layout>
    </Router>
  );
}

