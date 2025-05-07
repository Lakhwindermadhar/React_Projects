import React from 'react';
import {useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(() => {
    let pass = ""
    let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if (numberAllowed) str += "0123456789"
     if (charAllowed) str += "~!@+#$%^&*()_?"

     for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

     }
      
     setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const selectionLimit = 10; // Define this outside the useCallback or pass it as a prop/state

  const copyPasswordToClipboard = useCallback(() => {
    const input = passwordRef.current;
    if (input) {
      input.focus(); // Ensure input is focused
      input.setSelectionRange(0, selectionLimit); // Set the selection range
  
      const selectedText = password.substring(0, selectionLimit); // Get limited characters
      navigator.clipboard.writeText(selectedText)
        .then(() => {
          console.log('Copied:', selectedText);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    }
  }, [password, selectionLimit]); // Include selectionLimit if it's a variable or constant
  

useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
      />

<button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-500 rounded-2xl hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300 text-white px-3 py-0.5 shrink-0 active:scale-95 transition-transform,bg-bule-700 duration-100'
        >Copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length} </label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={numberAllowed}
      id="numberInput"
      onChange={() => {
        setnumberAllowed ((prev) => !prev);
      }} 
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={charAllowed}
      id="characterInput"
      onChange={() => {
        setCharAllowed ((prev) => !prev)
      }} 
      />
      <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
   
  )
}

export default App
