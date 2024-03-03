"use client";
import React from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void; 
  children: any
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
    return (
        <div className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 transform drawer-custom ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="bg-white rounded-t-lg shadow-lg p-4">
            <button className="absolute top-0 right-0 mr-4 mt-2" onClick={onClose}>
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {children}
          </div>
        </div>
      );
};

export default Drawer;