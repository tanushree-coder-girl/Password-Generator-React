import { useCallback, useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import "./App.css";

function App() {
  const [count, setCount] = useState(12);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [history, setHistory] = useState([]);

  const generatePassword = useCallback(() => {
    let characters = "";

    if (lowerCase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (upperCase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) characters += "1234567890";
    if (symbols) characters += "@|!#$%&*?";

    if (!characters) {
      setPassword("Please select options");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }

    setPassword(newPassword);
    setHistory((prev) => [newPassword, ...prev.slice(0, 4)]);
  }, [count, upperCase, lowerCase, numbers, symbols]);

  useEffect(() => {
    generatePassword();
  }, [count, upperCase, lowerCase, numbers, symbols, generatePassword]);

  const handleCopyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getStrength = () => {
    let strength = 0;
    if (count >= 8) strength++;
    if (count >= 12) strength++;
    if (upperCase) strength++;
    if (lowerCase) strength++;
    if (numbers) strength++;
    if (symbols) strength++;

    if (strength <= 2) return { color: "bg-red-500 w-[30%]", label: "Weak" };
    if (strength <= 4)
      return { color: "bg-yellow-400 w-[60%]", label: "Medium" };
    return { color: "bg-green-500 w-[100%]", label: "Strong" };
  };

  const { color, label } = getStrength();

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            readOnly
            className="flex-1 p-3 border rounded-lg text-lg outline-none bg-gray-50"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600"
          >
            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
          <button
            onClick={handleCopyToClipboard}
            className={`px-4 py-2 rounded-lg text-white font-medium transition duration-300 ${
              isCopied ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Strength Bar */}
        <div className="mt-2">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Password Strength: {label}</span>
          </div>
          <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${color}`}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Password Length</label>
            <span className="text-indigo-600 font-bold">{count}</span>
          </div>
          <input
            type="range"
            min="4"
            max="32"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full accent-indigo-600"
          />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={upperCase}
                onChange={() => setUpperCase(!upperCase)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">Uppercase</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={lowerCase}
                onChange={() => setLowercase(!lowerCase)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">Lowercase</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">Numbers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={symbols}
                onChange={() => setSymbols(!symbols)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">Symbols</span>
            </label>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Generate New Password
        </button>

        {/* Password History */}
        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Password History
              </h2>
              <button
                onClick={() => setHistory([])}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
            <ul className="space-y-2">
              {history.slice(1, 4).map((item, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-100 rounded text-sm text-gray-800 break-all"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
