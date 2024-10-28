import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./Nav";
import Cookies from "js-cookie";

export default function Login() {
    const [searchParams] = useSearchParams();
    const [mode, setMode] = useState(searchParams.get('mode') || 'login');
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const loginSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, { email, password });
            if (res.status === 200) {
                Cookies.set('token', res.data.token, { expires: 3 });
                toast.success('Login successful! Redirecting to dashboard...', {
                    position: "bottom-center",
                    onClose: () => navigate('/dashboard')
                });
            } else {
                toast.error('Invalid Credentials', { position: "bottom-center" });
            }
        } catch (error) {
            toast.error(`Login failed: ${error.message}`, { position: "bottom-center" });
        }
    };

    const signupSubmit = async (e) => {
        e.preventDefault();
        if (cpassword !== password) {
            toast.error("Passwords don't match", { position: "bottom-center" });
            return;
        }
        
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/register`, { name, email, password });
            if (res.status === 201) {
                toast.success("Successfully registered", { position: "bottom-center" });
            }
        } catch (error) {
            toast.error(`Signup failed: ${error.message}`, { position: "bottom-center" });
        }
    };

    useEffect(() => {
        setMode(searchParams.get('mode') || 'login');
    }, [searchParams]);
    return (
        <div>
          <Nav/>
          <div className="flex flex-col md:flex-row w-full">
            {/* Welcome Section */}
            <div className="w-full md:w-1/2 flex justify-end">
              <div className="mt-12 px-4 md:ml-36 w-full md:w-auto">
                <h2 className="font-semibold text-xl text-center md:text-left">Welcome to APNA BLOG!</h2>
                <p className="text-xl font-medium mt-4 text-center md:text-left">Start your Blogging Journey Now.</p>
    
                <div className="ml-0 md:ml-4 mt-6 md:mt-4">
                  <h4 className="mt-1 text-center md:text-left">Follow these easy <span className="underline self-baseline cursor-s-resize">steps</span>:</h4>
                  <div className="mt-4 text-lg">
                    <ul className="list-none text-center md:text-left">
                      <li className="mt-2">Login/Signup with your account</li>
                      <li className="mt-2">Go to Profile section</li>
                      <li className="mt-2">Then Compose Section</li>
                      <li className="mt-2">Write and click on Publish!</li>
                      <li className="mt-2">All Done 🎉</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Auth Forms Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-between px-4 md:mr-48 mt-12 mx-auto py-8 md:h-screen lg:py-0">
              {mode === 'login' && (
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Login to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" method="post" onSubmit={loginSubmit}>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input
                          required
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                          placeholder="name@gmail.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                          required
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500">Remember me</label>
                          </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                      </div>
                      <div className="flex justify-center items-center">
                        <button type="submit" className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Login
                        </button>
                      </div>
                    </form>
    
                    {/* Google login */}
                    <div className="flex flex-col justify-center items-center">
                      <button className="gsi-material-button" styles="width:100">
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                          <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" styles="display: block;">
                              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                              <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                          </div>
                          <span className="gsi-material-button-contents">Sign in with Google</span>
                        </div>
                      </button>
                    </div>
                    <p className="text-sm font-light text-gray-500">
                      Don't have an account yet? <Link to={`?mode=signup`}><a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a></Link>
                    </p>
                  </div>
                </div>
              )}
    
              {mode === 'signup' && (
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0">
                  <div className="p-6 space-y-4 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                      Create an account
                    </h1>
                    <form className="space-y-4" method="post" onSubmit={signupSubmit}>
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 outline-none"
                          placeholder="your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 outline-none"
                          placeholder="name@gmail.com"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 outline-none"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                        <input
                          type="password"
                          id="confirm-password"
                          value={cpassword}
                          onChange={(e) => setCpassword(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 outline-none"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <button type="submit" className="md:w-1/2 text-white bg-gray-700 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Create an account
                        </button>
                      </div>
                      <p className="text-sm font-light text-gray-500">
                        Already have an account? <Link to={'?mode=login'}><a href="#" className="font-medium text-primary-600 hover:underline">Login here</a></Link>
                      </p>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      );
}
