
import React from 'react';

const CatFaceIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="#78350F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#F9A826"/>
    <path d="M8.5 10.5C9.32843 10.5 10 9.82843 10 9C10 8.17157 9.32843 7.5 8.5 7.5C7.67157 7.5 7 8.17157 7 9C7 9.82843 7.67157 10.5 8.5 10.5Z" fill="#573D2B"/>
    <path d="M15.5 10.5C16.3284 10.5 17 9.82843 17 9C17 8.17157 16.3284 7.5 15.5 7.5C14.6716 7.5 14 8.17157 14 9C14 9.82843 14.6716 10.5 15.5 10.5Z" fill="#573D2B"/>
    <path d="M16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14" stroke="#573D2B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18V15" stroke="#573D2B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default CatFaceIcon;
