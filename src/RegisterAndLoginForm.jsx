import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div 
      className={`h-screen flex flex-col items-center justify-center transition-colors duration-500 ease-in-out ${isLoginOrRegister === 'register' ? 'bg-gradient-to-r from-blue-500 to-green-400' : 'bg-gradient-to-r from-purple-500 to-indigo-400'}`}
      style={{
        backgroundImage: `url("/background.jpg")`, // Background image
        backgroundSize: 'cover', // Cover the full screen size
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Avoid image repetition
      }}
    >
      {/* Unique Title for ChatFlow */}
      <h1 className="text-5xl font-extrabold text-white mb-6 tracking-wider" style={{ 
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 4px 6px rgba(0, 0, 0, 0.3)',
        letterSpacing: '0.1rem',
      }}>
        ChatFlow
      </h1>

      <form 
        className={`w-auto mx-auto p-6 bg-white shadow-md rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${isLoginOrRegister === 'register' ? 'shadow-xl' : 'shadow-md'}`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </h2>
        <input 
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          className="bg-blue-500 text-white block w-full rounded-sm p-2 mt-4 transition-all duration-300 hover:bg-blue-600"
        >
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-4 transition-opacity duration-300 ease-in-out">
          {isLoginOrRegister === 'register' ? (
            <div>
              Already a member?
              <button 
                className="ml-1 text-blue-500 hover:underline focus:outline-none" 
                onClick={() => setIsLoginOrRegister('login')}
              >
                Login here
              </button>
            </div>
          ) : (
            <div>
              Don't have an account?
              <button 
                className="ml-1 text-blue-500 hover:underline focus:outline-none" 
                onClick={() => setIsLoginOrRegister('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
