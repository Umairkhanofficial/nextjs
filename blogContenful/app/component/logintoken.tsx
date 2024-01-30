'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>();
  const [isBearerToken, setIsBearerToken] = useState<string>('');
  const [verify, setVerify] = useState(false);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      const bearerToken = localStorage.getItem('bearer_token');
      if (!bearerToken) return;

      try {
        const apiResp = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            Authorization: bearerToken,
          },
        });
        if (apiResp.ok) {
          setVerify(true);
          router.push('../blogs');
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      } finally {
        setLoader(false);
      }
    };

    auth();
  }, []); // Empty dependency array to run only once when the component mounts

  const onLoginHandler = async (e: any) => {
    e.preventDefault();

    try {
      const apiResp = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, // optional
        }),
      });
      if (apiResp.ok) {
        const data = await apiResp.json();
        console.log(data);
        localStorage.setItem('bearer_token', data.token);
        setIsBearerToken(data.token);
        if (data.token) {
          router.push('../blogs');
        }
      }
      else{setError("invalid username or password")}
    } catch (e) {
      setError(e);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onLoginHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64">
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
