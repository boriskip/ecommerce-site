import { BrowserRouter  } from 'react-router-dom';
import { useState } from 'react';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import RouterView from './router';
import Footer from './components/layout/Footer';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <TopBar />
      <Header />
      <main className="p-4">
        <RouterView />
      </main>
      <Footer />
    </BrowserRouter>

  );
}

export default App
