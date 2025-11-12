
import React from 'react';

const BurgerIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18V16C4 15.4477 4.44772 15 5 15H19C19.5523 15 20 15.4477 20 16V18H4Z" fill="#D97706"/>
    <rect x="5" y="11" width="14" height="2" rx="1" fill="#16A34A"/>
    <path d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V10C20 10.5523 19.5523 11 19 11H5C4.44772 11 4 10.5523 4 10V10Z" fill="#FBBF24"/>
    <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V7H6V6Z" fill="#F9A826"/>
  </svg>
);

export default BurgerIcon;
