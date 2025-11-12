import React from 'react';
import BurgerIcon from './icons/BurgerIcon';
import DoubleBurgerIcon from './icons/DoubleBurgerIcon';
import BookCatIcon from './icons/BookCatIcon';
import BeakerIcon from './icons/BeakerIcon';
import SearchIcon from './icons/SearchIcon';
import IaIcon from './icons/IaIcon';

const navItems = [
  { name: 'Kids', icon: <BurgerIcon /> },
  { name: 'Fundamental', icon: <DoubleBurgerIcon /> },
  { name: 'Avançado', icon: <BookCatIcon /> },
  { name: 'Sobre', icon: <BeakerIcon /> },
  { name: 'IA', icon: <IaIcon /> },
];

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {

  const handleNavClick = (name: string) => {
    onNavigate(name);
  }

  return (
    <header className="p-4 sticky top-0 bg-[#FFFBF0]/80 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <button onClick={() => onNavigate('home')} className="text-2xl font-black text-amber-900 hover:text-amber-600 transition-colors duration-200">
            BurguerMatic
          </button>
        </div>
        <nav className="flex-1">
          <ul className="flex justify-center items-end space-x-2 md:space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.name)}
                  className="flex flex-col items-center group text-amber-900 hover:text-amber-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-current={currentPage === item.name ? 'page' : undefined}
                >
                  <div className="mb-1">{item.icon}</div>
                  <span className="text-sm md:text-base font-semibold">{item.name}</span>
                  <div
                    className={`h-1 w-full mt-1 rounded-full transition-all duration-300 ${
                      currentPage === item.name ? 'bg-amber-900' : 'bg-transparent w-0 group-hover:w-full group-hover:bg-amber-500'
                    }`}
                  ></div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pl-4">
          <button className="text-amber-900 hover:text-amber-600 transition-colors duration-200">
            <SearchIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
