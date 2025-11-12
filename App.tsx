import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CtaSection from './components/CtaSection';
import KidsPage from './components/pages/KidsPage';
import FundamentalPage from './components/pages/FundamentalPage';
import AvancadoPage from './components/pages/AvancadoPage';
import SobrePage from './components/pages/SobrePage';
import IAPage from './components/pages/IAPage';

const App: React.FC = () => {
  const [page, setPage] = useState('home');

  const navigateTo = (pageName: string) => {
    setPage(pageName);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <>
            <Hero />
            <CtaSection onNavigate={navigateTo} />
          </>
        );
      case 'Kids':
        return <KidsPage onBack={() => navigateTo('home')} />;
      case 'Fundamental':
        return <FundamentalPage onBack={() => navigateTo('home')} />;
      case 'Avançado':
        return <AvancadoPage onBack={() => navigateTo('home')} />;
      case 'Sobre':
        return <SobrePage onBack={() => navigateTo('home')} />;
      case 'IA':
        return <IAPage onBack={() => navigateTo('home')} />;
      default:
        return (
          <>
            <Hero />
            <CtaSection onNavigate={navigateTo} />
          </>
        );
    }
  }

  return (
    <div className="bg-[#FFFBF0] min-h-screen text-[#573D2B]">
      <Header currentPage={page} onNavigate={navigateTo} />
      <main>
        {renderPage()}
      </main>
      <footer className="text-center p-8">
        <p className="text-lg font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          feito por Darlan para Anna ♡
        </p>
      </footer>
    </div>
  );
};

export default App;
