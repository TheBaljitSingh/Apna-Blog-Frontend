import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Nav from '../Nav';
import axios from 'axios';

export const BlogDetail = () => {
  const location = useLocation();
  const urlPath = location.pathname; // Get the current URL path

  // Extract the last part of the URL which contains the ID
  const blogId = urlPath.split('-').pop();
  console.log(blogId);

  const [blog, setBlog] = useState(null);


  useEffect(() => {
    // Fetch the blog details using the extracted blogId
    axios.get(`${process.env.REACT_APP_BACKEND_URL}api/blogs/${blogId}`)
      .then((res) => {
        // console.log(res);
        setBlog(res.data.posts);
      })
      .catch((error) => {
        console.error('Error fetching the blog details:', error);
      });
  }, [blogId]); // Dependency array ensures the effect runs when blogId changes

  if (!blog) {
    return <div>Loading...</div>; // Show a loading state while the blog is being fetched
  }

  // Ensure blog.content is an array
  const contentBlocks = Array.isArray(blog.content) ? blog.content : [];

  return (
    <>
      <Nav />
      <div className='grid grid-cols-12 bg-transparent'>
        <div className='grid col-span-3'></div>
        <div className='grid col-span-6'>
          <div className="container mx-auto p-6 mt-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-6">{new Date(blog.date).toLocaleDateString()}</p>
            {contentBlocks.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return React.createElement(
                    `h${block.level}`, 
                    { key: index, className: `text-${block.level === 1 ? '3xl' : '2xl'} font-semibold text-gray-800 mt-6 mb-4` }, 
                    block.content
                  );
                case 'paragraph':
                  return <p key={index} className="text-base text-gray-700 mb-4">{block.content}</p>;
                case 'image':
                  return <img key={index} src={block.content} alt="Blog content" className="w-full h-auto rounded-lg shadow-md my-6" />;
                case 'list':
                  return (
                    <ul key={index} className="list-disc list-inside pl-5 mb-4">
                      {block.items.map((item, i) => (
                        <li key={i} className="text-base text-gray-700 mb-2">{item}</li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
        <div className='grid col-span-3'></div>
      </div>
    </>
  );
};
