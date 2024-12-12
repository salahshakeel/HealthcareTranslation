import React from 'react'

const TextInput = ({apiKey, setApiKey}) => {
  return (
    <input 
                type="text" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                className="w-full bg-gray-200 p-2 border border-gray-300 rounded-md" 
                placeholder="Enter your Google API key"
              />
  )
}

export default TextInput