import React, { useState, useRef } from 'react';

const Commentsection = () => {
  const [comment, setComment] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const currentUser = 'Bhavik Developer'; // Assuming this is the current user
  const [comments, setComments] = useState([
    { id: 1, name: 'Michael Murphy', text: 'Absolutely on target! I got a laugh out of a friend here...', userId: 1 },
    // { id: 3, name: 'Ankush Jain', text: ' Changes ho gaye...', userId: 3 },
    // { id: 2, name: 'Bhavik Developer', text: 'This is my own comment!', userId: 2 }
  ]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true); // For hiding the comment section
  const [dropdownVisible, setDropdownVisible] = useState(null); // Track dropdown visibility for each comment
  const commentRef = useRef(null);


  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: currentUser, // Set the current user as the commenter
        text: commentRef.current.innerHTML, // Get rich text from contenteditable div
        userId: 2 // Example: assuming userId 2 is 'Bhavik Developer'
      };
      setComments([newComment, ...comments]);
      commentRef.current.innerHTML = ''; // Clear the contenteditable div
      setComment('');
      setIsBold(false);
      setIsItalic(false);
    }
  };

  // Apply bold formatting
  const handleBold = () => {
    document.execCommand('bold');
    setIsBold(!isBold); // Toggle the bold state
  };

  // Apply italic formatting
  const handleItalic = () => {
    document.execCommand('italic');
    setIsItalic(!isItalic); // Toggle the italic state
  };

  // Handle comment text change (updates state, but also allows rich text in contenteditable)
  const handleCommentChange = () => {
    setComment(commentRef.current.innerHTML);
  };

  // Delete a comment by id
  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  // Close the comment section
  const handleCloseComments = () => {
    setIsCommentsVisible(false);
  };

  // Handle report comment
  const handleReportComment = (id) => {
    alert(`Reported comment with id ${id}`);
  };

  // Toggle dropdown for specific comment
  const toggleDropdown = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id); // Toggle dropdown visibility
  };

  if (!isCommentsVisible) return null; // Hide the comments section if closed

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ margin: '20px', maxWidth: '600px', position: 'relative', width: '100%' }}>
        <div style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
          <button
            onClick={handleCloseComments}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#aaa',
              cursor: 'pointer'
            }}
          >
            &times;
          </button>
        </div>
        <h2>Responses({comments.length})</h2>
        {/* Input box for adding a comment */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <div
            ref={commentRef}
            contentEditable
            placeholder="What are your thoughts?"
            onInput={handleCommentChange}
            style={{
              width: '95%',
              minHeight: '80px',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'none',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={handleBold}
                title="Bold"
                style={{
                  fontWeight: 'bold',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isBold ? '#2c8b66' : 'inherit'
                }}
              >
                B
              </button>
              <button 
                onClick={handleItalic}
                title="Italic"
                style={{
                  fontStyle: 'italic',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isItalic ? '#2c8b66' : 'inherit'
                }}
              >
                I
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => (commentRef.current.innerHTML = '')}
                style={{
                  padding: '6px 12px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#d8f1e7',
                  border: '1px solid #c3e6d0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#2c8b66',
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal'
                }}
              >
                Respond
              </button>
            </div>
          </div>
        </div>

        {/* List of comments */}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', position: 'relative' }}>
              <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <img
                  src="https://avatar.iran.liara.run/public"
                  alt="avatar"
                  style={{ borderRadius: '50%', width: '30px', height: '30px' }}
                />
                <strong>{comment.name}</strong>
                <span style={{ fontSize: '12px', color: '#777' }}>5 min ago</span>
              </p>
              <p style={{ margin: '5px 0' }} dangerouslySetInnerHTML={{ __html: comment.text }}></p>
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                {/* Dropdown with Delete or Report options */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => toggleDropdown(comment.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#999',
                      fontSize: '20px'
                    }}
                  >
                    &#8230;
                  </button>
                  {dropdownVisible === comment.id && (
                    <div style={{
                      position: 'absolute',
                      right: '0',
                      background: '#fff',
                      border: '1px solid #ddd',
                      boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      zIndex: 1,
                      padding: '5px'
                    }}>
                      {/* Show Delete button only for the user's own comments */}
                      {comment.name === currentUser ? (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#d9534f',
                            cursor: 'pointer',
                            display: 'block',
                            width: '100%'
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReportComment(comment.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#f0ad4e',
                            cursor: 'pointer',
                            display: 'block',
                            width: '100%'
                          }}
                        >
                          Report
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commentsection;
