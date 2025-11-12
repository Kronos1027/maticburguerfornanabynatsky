
import React from 'react';

const BookCatIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20V10C18 7.23858 15.7614 5 13 5H11C8.23858 5 6 7.23858 6 10V20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 17H8V21H3V17Z" fill="#F9A826" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H21V21H16V17Z" fill="#F9A826" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="#FFFBF0"/>
    <path d="M12.5 15.5C12.5 16.3284 11.8284 17 11 17C10.1716 17 9.5 16.3284 9.5 15.5" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 13.5L15 13" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 13.5L9 13" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 6V5C11 4.44772 11.4477 4 12 4H12C12.5523 4 13 4.44772 13 5V6" stroke="#78350F" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default BookCatIcon;
