import React, { useEffect, useState } from 'react';
import { IoIosSwap } from "react-icons/io";
import LanguageSelector from './LanguageSelector';
import TextInput from './TextInput';

const SettingModal = ({ show, onClose, inputLanguage, outputLanguage, setInputLanguage, setOutputLanguage }) => {
    const swapLanguages = () => {
        setInputLanguage(outputLanguage);
        setOutputLanguage(inputLanguage);
      };
 
  return (
    <div 
      id="select-modal" 
      tabIndex="-1" 
      aria-hidden="true" 
      className={`${!show && 'hidden'} 
                  overflow-y-auto 
                  overflow-x-hidden 
                  fixed top-0 right-0 left-0 z-50 
                  flex justify-center items-center 
                  w-full h-full bg-gray-900 bg-opacity-50`}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-50 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Settings
            </h3>
            <button 
              type="button" 
              onClick={() => onClose(false)} 
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
              data-modal-toggle="select-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Select your language selection</p>
            <div className="mt-4 flex items-center justify-between space-x-4">
              <LanguageSelector label="Input" inputLanguage={inputLanguage} setInputLanguage={setInputLanguage} />
              <IoIosSwap
                size={50}
                onClick={swapLanguages}
                className="cursor-pointer pt-6 hover:text-[#0F2130]"
              />
              <LanguageSelector label="Output" inputLanguage={outputLanguage} setInputLanguage={setOutputLanguage} />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
