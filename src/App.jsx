import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef = useRef(null)
  const [count, setCount] = useState(6)
  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const randowPasswordGenerator = useCallback(() => {
    let str = "";

    if (lowerCase) str += "abcdefghijklmnopqrstuvwxyz";
    if (upperCase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) str += "1234567890";
    if (symbols) str += "@|!";

    let randomCharacterString = "";
    for (let index = 0; index < count; index++) {
      let randomIndex = Math.round(Math.random() * str.length + 1);
      randomCharacterString += str.charAt(randomIndex);
    }
    setPassword(randomCharacterString)

  }, [count, upperCase, lowerCase, numbers, symbols, setPassword])

  useEffect(() => {
    randowPasswordGenerator();
  }, [count, upperCase, lowerCase, numbers, symbols, randowPasswordGenerator])

  const handleCopyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };


  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='bg-red-100 w-2/4 py-12 px-4'>
        <h1 className='text-3xl text-center text-black font-bold'>Random password generator</h1>
        <input value={password} className='w-[80%] p-3 m-4 border-none outline-none' type="text" placeholder='Uinque password' readOnly />
        <button
          className='w-[15%] bg-red-900 rounded-sm p-3 text-white border-none outline-none'
          onClick={handleCopyToClipboard}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
        <div className="mx-4 my-4">
          <input ref={inputRef} onChange={(e) => setCount(e.target.value)} value={count} type="range" name="range" id="range" min={"4"} max={"75"} />
          <span className="ml-4">{count} Password Length</span>

          <div className='ml-4 inline-block'>
            <input checked={upperCase} value={upperCase} onChange={() => setUpperCase(!upperCase)} type="checkbox" name="allowuppercase" id="allowuppercase" />
            <label className='ml-2' htmlFor="allowuppercase">Uppercase</label>
          </div>

          <div className='ml-4 inline-block'>
            <input checked={lowerCase} value={lowerCase} onChange={() => setLowercase(!lowerCase)} type="checkbox" name="allowlowercase" id="allowlowercases" />
            <label className='ml-2' htmlFor="allowlowercase">Lowercase</label>
          </div>

          <div className='ml-4 inline-block'>
            <input checked={symbols} value={symbols} onChange={() => setSymbols(!symbols)} type="checkbox" name="allowsymbols" id="allowsymbols" />
            <label className='ml-2' htmlFor="allowsymbols">Symbols</label>
          </div>

          <div className='ml-4 inline-block'>
            <input checked={numbers} value={numbers} onChange={() => setNumbers(!numbers)} type="checkbox" name="allowNumbers" id="allowNumbers" />
            <label className='ml-2' htmlFor="allowNumbers">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
