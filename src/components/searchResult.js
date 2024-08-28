import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Nav from '../Nav';

const SearchResults = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    const descriptionLength = 120;

    // Function to truncate text to a fixed length
    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.slice(0, length) + '...';
    };

    useEffect(() => {
        if (query) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}api/search?q=${query}`)
                .then(response => {
                    const transformedBlogs = response.data.map((blog) => {
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
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setError('Failed to load search results');
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <div>
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Blogs Grid */}
                {!loading && !error && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {blogs.length === 0 && (
                            <p className="text-center">No blogs available.</p>
                        )}
                        {blogs.map((blog) => (
                            <Link to={`/Blog/${blog.slug}-${blog._id}`} key={blog._id}>
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
                                    <p className="text-sm text-gray-500">
                                        {moment(blog.date).format('MMM DD, YYYY')}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
