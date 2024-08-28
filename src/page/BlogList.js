import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../Nav'; // Adjust the import path according to your project structure
import moment from 'moment';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const blogsPerPage = 6; // Display 6 blogs per page
  const descriptionLength = 120;

  // Function to truncate text to a fixed length
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  // Fetch blogs from the server
  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/blogs`, {
        params: {
          page,
          limit: blogsPerPage,
        },
      });

      const blogData = response.data.blogs;
      // setBlogs(response.data.blogs);

      const transformedBlogs = blogData.map((blog) => {
        let imageUrl = '';
        let description = '';

        // Process the content array to find image and description
        blog.content.forEach((contentItem) => {
          if (contentItem.type === 'image') {
            imageUrl = contentItem.content;
          } else if (contentItem.type === 'paragraph') {
            description += contentItem.content + ' '; // Concatenate paragraphs for description
          }
        });

        // Ensure each blog has a slug
        return {
          ...blog,
          image: imageUrl,
          description: truncateText(description.trim(), descriptionLength),
          slug: blog.slug || blog.title.toLowerCase().replace(/ /g, '-'), // Fallback to generating slug from title
        };
      });

      setBlogs(transformedBlogs);
      console.log(transformedBlogs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError('There was an error fetching the blogs.');
      console.error("There was an error fetching the blogs!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>

        {/* Loading Indicator */}
        {loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: blogsPerPage }).map((_, index) => (
              <div
                key={index}
                className="border shadow rounded-md p-4 max-w-sm w-full  mx-auto animate-pulse"
              >
                <div className="flex space-x-4">
                  <div className="rounded-full bg-slate-500 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-500 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Blogs Grid */}
        {!loading && !error && (
          <div className="grid gap-6 lg:grid-cols-3">
            {blogs.length === 0 && (
              <p className="text-center">No blogs available.</p>
            )}
            {blogs.map((blog) => (
              <Link to={`/Blog/${blog.slug}-${blog._id}`} key={blog.slug}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white flex flex-col h-full">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{blog.description}</p>
                  <p className="text-sm text-gray-500">{moment(blog.date).format('MMM DD, YYYY')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 border rounded-lg ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
