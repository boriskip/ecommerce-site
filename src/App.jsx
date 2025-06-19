import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import HeroSection from './components/sections/hero/HeroSection';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
      <TopBar />
      <Header />
      <main className="p-4">
      <HeroSection />
      </main>
    </>
  );
}

export default App
