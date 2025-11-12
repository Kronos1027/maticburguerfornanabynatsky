
import React from 'react';

const DoubleBurgerIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20V18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18V20H4Z" fill="#D97706"/>
    <path d="M5 14H19V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V14Z" fill="#FBBF24"/>
    <path d="M5 12H19V13H5V12Z" fill="#16A34A"/>
    <path d="M4 11V9C4 8.44772 4.44772 8 5 8H19C19.5523 8 20 8.44772 20 9V11H4Z" fill="#D97706"/>
    <path d="M5 5H19V6C19 6.55228 18.5523 7 18 7H6C5.44772 7 5 6.55228 5 6V5Z" fill="#FBBF24"/>
    <path d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V4H8V3Z" fill="#F9A826"/>
  </svg>
);
export default DoubleBurgerIcon;
