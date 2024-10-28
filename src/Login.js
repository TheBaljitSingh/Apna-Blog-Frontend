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

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, { email, password })
            .then(res => {
                if (res.status === 200) {
                    Cookies.set('token', res.data.token, { expires: 3 });
                    toast.success('Login successful! Redirecting to dashboard...', {
                        position: "bottom-center",
                        onClose: () => navigate('/dashboard')
                    });
                } else {
                    toast.error('Invalid Credentials', { position: "bottom-center" });
                }
            })
            .catch(error => {
                toast.error(`${error.message}`, { position: "bottom-center" });
            });
    };

    const signupSubmit = async (e) => {
        e.preventDefault();

        if (cpassword !== password) {
            toast.error("Passwords don't match", { position: "bottom-center" });
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/register`, { name, email, password, cpassword })
                .then(res => {
                    if (res.status === 201) {
                        toast.success("Successfully registered", { position: "bottom-center" });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        setMode(searchParams.get('mode') || 'login');
    }, [searchParams]);

    return (
        <div className="flex flex-col h-screen">
            <Nav />
            {/* <div className="flex flex-grow justify-between items-start px-4 md:px-12 mt-6"> */}
            <div className="flex flex-col lg:flex-row w-full items-center lg:justify-center p-4 lg:p-8">
                
                {/* Text Section */}
                <div className="flex flex-col items-center bg-transparent rounded-lg mb-8 lg:w-1/3 ml-36 hidden md:block">
                    <h2 class="font-semibold text-xl ">Welcome to APNA BLOG! </h2>
                    <p class="text-xl font-medium mt-4">Start your Blogging Journy Now.</p>
                    <h4 class="mt-1">Follow thest easy <span class="underline self-baseline cursor-s-resize	">steps</span>:</h4>
                    <ul className="mt-4 list-disc mt-12 ml-5 hidden md:block">
                        <li>Login/Signup with your account</li>
                        <li className="mt-2">Go to Profile section</li>
                        <li className="mt-2">Then Compose Section</li>
                        <li className="mt-2">Write and click on Publish!</li>
                        <li className="mt-2">All Done 🎉</li>
                    </ul>
                </div>

                <div class="flex flex-col w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-6 md:space-y-6 sm:p-8 pr-4 md:pr-6 lg:pr-8 xl:pr-10">
                    {mode === 'login' &&
                        <div className="space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Login to your account</h1>
                            <form className="space-y-4 md:space-y-6" method="post" onSubmit={loginSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input required id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5" placeholder="name@gmail.com" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input required id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="••••••••" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3" required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                                </div>
                                <div className="flex justify-center items-center">
                                <button type="submit" class="w-1/2 text-white bg-primary-600 hover:bg-primary-700 bg-slate-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Login</button>
                                </div>
                            </form>
                            <div className="flex flex-col justify-center items-center">
                                
                                <button className="gsi-material-button w-1/2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 flex items-center justify-center">
                                    <div className="gsi-material-button-state"></div>
                                    <div className="gsi-material-button-content-wrapper">
                                        <div className="gsi-material-button-icon">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" styles="display: block;">
                                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.54 0-12.05-4.44-13.98-10.52l-7.97 6.19C9.05 43.77 16.59 48 24 48z"></path>
                                            </svg>
                                        </div>
                                        <span className="gsi-material-button-label">Sign in with Google</span>
                                    </div>
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">
                                    Don’t have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                                </p>
                        </div>
                    }
                    {mode === 'signup' &&
                        <div className="space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create an account</h1>
                            <form className="space-y-4 md:space-y-6" method="post" onSubmit={signupSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                    <input required id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input required id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5" placeholder="name@gmail.com" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input required id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="••••••••" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5" />
                                </div>
                                <div>
                                    <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                    <input required id="cpassword" type="password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} name="cpassword" placeholder="••••••••" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5" />
                                </div>
                                <div className="flex justify-center items-center">
                                    <button type="submit" className="w-full text-white bg-slate-700 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5">Create an account</button>
                                </div>
                            </form>
                            <p className="text-sm text-gray-500">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline">Login</Link>
                            </p>
                        </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
