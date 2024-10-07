import React, { useEffect, useState } from 'react';

const CommentComponent = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog?blogId=${blogId}&myBlogs=false`);
            const data = await response.json();
            setComments(data); // Assuming the API returns an array of comments
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog/comment?isActive=true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blogId, comment: newComment }), // Adjust based on your API's expected payload
            });

            if (response.ok) {
                setNewComment('');
                fetchComments(); // Fetch comments again to update the list
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.text}</li> // Adjust based on the comment structure
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <input 
                    type="text" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="Add a comment" 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentComponent;
