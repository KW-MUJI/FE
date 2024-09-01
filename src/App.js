import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import Signup from './components/Signup';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Banner />
      <Signup />  {/* Login 컴포넌트만 렌더링 */}
      <Footer />
    </div>
  );
}

export default App;
