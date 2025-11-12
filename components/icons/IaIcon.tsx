import React from 'react';

const IaIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cat Face */}
    <path d="M12 14C17.5228 14 22 11.5228 22 8C22 4.47715 17.5228 2 12 2C6.47715 2 2 4.47715 2 8C2 11.5228 6.47715 14 12 14Z" fill="#F9A826" stroke="#78350F" strokeWidth="1.5"/>
    <path d="M5 7C5 5.89543 5.89543 5 7 5" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 7C19 5.89543 18.1046 5 17 5" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="8" r="1" fill="#78350F"/>
    <circle cx="15" cy="8" r="1" fill="#78350F"/>
    <path d="M12 11C11.5 12 12.5 12 13 11" stroke="#78350F" strokeWidth="1" strokeLinecap="round"/>
    {/* Lightbulb */}
    <path d="M12 22C13.6569 22 15 20.6569 15 19V17C15 15.3431 13.6569 14 12 14C10.3431 14 9 15.3431 9 17V19C9 20.6569 10.3431 22 12 22Z" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5"/>
    <rect x="10" y="21" width="4" height="2" rx="1" fill="#78350F"/>
    <path d="M12 17.5L12 18.5" stroke="#F9A826" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default IaIcon;
