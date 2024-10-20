import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function Nav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar
  const [showMobileSearch, setShowMobileSearch] = useState(false); // State to manage mobile search bar
  const [userInfo, setUserInfo] = useState(null);
  const [query, setQuery] = useState('');


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Logic to actually show/hide the sidebar can be implemented here
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const logoutBtn = () => {
    const token = Cookies.get('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/logout`, { token })
      .then(res => {
        if (res.status === 200) {
          Cookies.remove('token');
          toast.success('Successfully Logged Out! Redirecting to Home...', {
            position: "bottom-center",
            onClose: () => navigate('/')
          });
        }
      })
      .catch(error => {
        toast.error("Error while logging out", {
          position: "bottom-center",
        });
      });
  };

  const fetchUser = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/isLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data.authUser);
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data || error.message);
    }
  };

  
  const handleSearch = (e) => {
      e.preventDefault();
      if (query.trim()) {
          navigate(`/search?q=${query}`);
      }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="antialiased">
      <nav className="bg-gray-700 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              onClick={toggleSidebar}
              aria-expanded={sidebarOpen}
              aria-controls="sidebar"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-[18px] h-[18px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <a href="/" className="flex mr-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                APNA BLOG
              </span>
            </a>
            <div className={`lg:hidden ${showMobileSearch ? 'block' : 'hidden'} mt-1 w-full`}>
              <form onSubmit={handleSearch} >

              <input
                type="text"
                id="mobile-search"
                className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                </form>
            </div>
            <form  onSubmit={handleSearch} className="hidden lg:block lg:pl-2">
              <label htmlFor="topbar-search" className="sr-only">Search</label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search Blogs . . "
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="flex-1 hidden md:flex justify-center space-x-5 dark:text-white">
            <Link to="/" className="font-semibold hover:text-gray-300">HOME</Link>
            <Link to="/Blog" className="font-semibold hover:text-gray-300">BLOGS</Link>
            <Link to="/about" className="font-semibold hover:text-gray-300">ABOUT US</Link>
            <Link to="/contact" className="font-semibold hover:text-gray-300">CONTACT</Link>
          </div>
          <div className="flex items-center lg:order-2">
            { userInfo &&   <Link to="/Create">
              <button
                type="button"
                className="hidden gap-2 sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-md px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <IoCreate size={24} />
                Create
              </button>
            </Link>}
            <button
              onClick={toggleMobileSearch}
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            {/* Conditionally render user menu or login button */}
            {userInfo ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userInfo.avatar.url || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                    alt="user"
                  />
                </button>

                {isOpen && (
                  <div
                    className="z-50 my-4 w-56 mt-2 absolute right-0 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="py-3 px-4">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {userInfo.name}
                      </span>
                      <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                        {userInfo.email}
                      </span>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/dashboard"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logoutBtn}
                          className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth?mode=login"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
}
