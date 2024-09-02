import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import Login from './components/Login';
// import Signup from './components/Signup';
import Banner from './components/Banner';
import Footer from './components/Footer';
// import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Banner />
      <Login/>
      {/* <Signup />  */}
       
      <Footer />
    </div>
  );
}

export default App;
