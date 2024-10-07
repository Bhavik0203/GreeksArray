import React, { useState } from 'react';

const LikeComponent = ({ blogId }) => {
    const [likes, setLikes] = useState(0);

    const handleLike = async () => {
        try {
            const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog/likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blogId }), // Adjust based on your API's expected payload
            });

            if (response.ok) {
                setLikes(likes + 1);
            } else {
                console.error('Failed to like the post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>Like</button>
            <p>{likes} Likes</p>
        </div>
    );
};

export default LikeComponent;
