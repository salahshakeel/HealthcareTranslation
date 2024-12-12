import React from 'react'

const LanguageSelector = ({label,inputLanguage, setInputLanguage}) => {
  return (
    <div className="w-full">
    <label className="block text-sm dark:text-gray-300">{label}</label>
    <select
      value={inputLanguage}
      onChange={(e) => setInputLanguage(e.target.value)}
      className="mt-2 p-1 w-full bg-gray-200 dark:bg-gray-800 rounded-md border-2 border-transparent focus:ring-2 focus:ring-[#0F2130] dark:focus:ring-[#0F2130] focus:outline-none transition-all ease-in-out duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      <option value="en-US">English</option>
      <option value="it-IT">Italia</option>
      <option value="fr-FR">French</option>
    </select>
  </div>
  )
}

export default LanguageSelector