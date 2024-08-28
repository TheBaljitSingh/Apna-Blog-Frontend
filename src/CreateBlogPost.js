import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Cookies from 'js-cookie';

import { toast, ToastContainer } from 'react-toastify';

const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [currentType, setCurrentType] = useState('paragraph');
  const [currentContent, setCurrentContent] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [listItems, setListItems] = useState('');
  const navigate = useNavigate();

  const handleAddContent = () => {
    const newBlock = {
      type: currentType,
      content: currentType === 'list' ? listItems.split('\n') : currentContent,
      level: currentType === 'heading' ? currentLevel : undefined,
    };
    
    setContentBlocks([...contentBlocks, newBlock]);
    setCurrentContent('');
    setListItems('');
    setCurrentLevel(1); // Reset heading level
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve token from cookies
    const token = Cookies.get('token'); // Replace 'token' with your actual cookie name
  
    try {
      // Configure Axios with Bearer token
      await axios.post(
        'auth/compose',
        { title, content: contentBlocks },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add Bearer token to headers
          }
        }
      );
  
      toast.success('Successfully created', {
        position: "bottom-center",
        onClose: () => navigate('/create')
      });
      // navigate('/');
    } catch (error) {
      console.error("There was an error creating the blog post!", error);
      toast.error('Failed to create the blog post', {
        position: "bottom-center"
      });
    }
  };

  return (

    <div>
      <Nav/>

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-2">
      <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Content Type
          </label>
          <select
            id="type"
            value={currentType}
            onChange={(e) => {
              setCurrentType(e.target.value);
              setCurrentContent('');
              setListItems('');
            }}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="paragraph">Paragraph</option>
            <option value="heading">Heading</option>
            <option value="image">Image</option>
            <option value="list">List</option>
          </select>
        </div>

        {currentType === 'heading' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
              Heading Level
            </label>
            <input
              type="number"
              id="level"
              min="1"
              max="6"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {currentType === 'list' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="list">
              List Items (one per line)
            </label>
            <textarea
              id="list"
              value={listItems}
              onChange={(e) => setListItems(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows="4"
            />
          </div>
        )}

        {(currentType === 'paragraph' || currentType === 'heading' || currentType === 'image') && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required={currentType !== 'list'}
            />
          </div>
        )}

        <div className='flex gap-2'>

        <button
          type="button"
          onClick={handleAddContent}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
          Add Content Block
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
          Publish
        </button>
          </div>
      </form>

      <h2 className="text-2xl font-bold mt-6">Preview</h2>
      <div className="mt-4">
        {contentBlocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return (
                <h2
                  key={index}
                  className={`text-${block.level === 1 ? '4xl' : block.level === 2 ? '3xl' : '2xl'} font-bold mt-4 mb-2`}
                >
                  {block.content}
                </h2>
              );
            case 'paragraph':
              return (
                <p key={index} className="text-lg leading-relaxed mb-4">
                  {block.content}
                </p>
              );
            case 'image':
              return (
                <img
                  key={index}
                  src={block.content}
                  alt=""
                  className="w-full h-auto my-4 rounded"
                />
              );
            case 'list':
              return (
                <ul key={index} className="list-disc pl-5 mb-4">
                  {block.content.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>

    <ToastContainer/>

    </div>
  );
};

export default CreateBlogPost;
