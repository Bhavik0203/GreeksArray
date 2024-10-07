import React, { useEffect, useState } from 'react';

// Blog Card Component
const BlogCard = ({ blog }) => {
    return (
        <div style={styles.card}>
            <img src={blog.blogImage} alt={blog.blogTitle} style={styles.image} />
            <h2 style={styles.title}>{blog.blogTitle}</h2>
            <p style={styles.description}>{blog.blogDescription}</p>
            <p style={styles.content}>{blog.blogContent}</p>
            <p style={styles.writer}>Written by: {blog.writer}</p>
            <p style={styles.category}>Category: {blog.category}</p>
        </div>
    );
};

// Main Blog Component
const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            // Read the token from local storage
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('User is not logged in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://geeksarray-001-site5.atempurl.com/api/Blog?myBlogs=true', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs: ' + response.statusText);
                }
                
                const data = await response.json();
                setBlogs(data); // Assuming the response is an array of blog objects
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={styles.container}>
            {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '20px',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
    },
    title: {
        fontSize: '1.5em',
        margin: '10px 0',
    },
    description: {
        fontSize: '1em',
        color: '#555',
    },
    content: {
        fontSize: '0.9em',
        color: '#333',
        margin: '10px 0',
    },
    writer: {
        fontStyle: 'italic',
        color: '#777',
    },
    category: {
        fontWeight: 'bold',
        color: '#007BFF',
    },
};

export default Blog;
