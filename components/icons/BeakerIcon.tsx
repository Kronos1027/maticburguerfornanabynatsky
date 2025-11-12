
import React from 'react';

const BeakerIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3H18" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 3V5C7 6.10457 7.89543 7 9 7H10" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 21H17C17.5523 21 18 20.5523 18 20V8C18 7.44772 17.5523 7 17 7H7C6.44772 7 6 7.44772 6 8V20C6 20.5523 6.44772 21 7 21Z" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 16H12" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default BeakerIcon;
