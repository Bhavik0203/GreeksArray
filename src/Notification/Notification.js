import React, { useState } from 'react';

const Notification = () => {
    // State to track which tab is selected (All/Responses)
    const [activeTab, setActiveTab] = useState('All');
  
    const notificationsData = [
      {
        id: 1,
        user: 'Betty Bassett',
        action: 'started following you',
        time: '1 day ago',
        image: 'https://via.placeholder.com/50' // Placeholder image
      },
      {
        id: 2,
        user: 'The Study Kits',
        action: '+ 1 other started following you',
        time: '3 days ago',
        image: 'https://via.placeholder.com/50' // Placeholder image
      }
    ];
  
    const responsesData = [
      {
        id: 1,
        content: 'This is a response from a user',
        time: '2 days ago',
        image: 'https://via.placeholder.com/50' // Placeholder image
      },
      {
        id: 2,
        content: 'Another response related to your post',
        time: '4 days ago',
        image: 'https://via.placeholder.com/50' // Placeholder image
      }
    ];
  
    const staffPicks = [
      {
        id: 1,
        title: 'Keeping Up With The Joneses',
        author: 'Andrew Jazprose Hill',
      },
      {
        id: 2,
        title: 'The Rise and Fall of NaNoWriMo',
        author: 'Rochelle Deans',
      },
      {
        id: 3,
        title: 'The 10-minute rule, and more tips to kick off your week',
        author: 'The Medium Newsletter',
      },
    ];
  
    const recommendedTopics = [
      'Science', 'Mental Health', 'Startup', 'Life', 'Design', 'JavaScript', 'Artificial Intelligence'
    ];
  
    const containerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    };
  
    const notificationsSectionStyle = {
      width: '60%',
    };
  
    const sidebarStyle = {
      width: '30%',
      marginLeft: '20px',
    };
  
    const notificationListStyle = {
      border: '1px solid #ddd',
      padding: '10px',
    };
  
    const notificationItemStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
    };
  
    const notificationImageStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginRight: '10px',
    };
  
    const topicsStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    };
  
    const topicStyle = {
      backgroundColor: '#f0f0f0',
      padding: '8px 12px',
      borderRadius: '15px',
      cursor: 'pointer',
    };
  
    // Handling tab switching between All and Responses
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div style={containerStyle}>
        {/* Notifications Section */}
        <div style={notificationsSectionStyle}>
          <h2>Notifications</h2>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <span
              style={{
                marginRight: '15px',
                cursor: 'pointer',
                fontWeight: activeTab === 'All' ? 'bold' : 'normal',
              }}
              onClick={() => handleTabClick('All')}
            >
              All
            </span>
            <span
              style={{
                cursor: 'pointer',
                fontWeight: activeTab === 'Responses' ? 'bold' : 'normal',
              }}
              onClick={() => handleTabClick('Responses')}
            >
              Responses
            </span>
          </div>
  
          {/* Conditional Rendering based on activeTab */}
          <div style={notificationListStyle}>
            {activeTab === 'All' ? (
              notificationsData.length ? (
                notificationsData.map((notification) => (
                  <div key={notification.id} style={notificationItemStyle}>
                    <img
                      src={notification.image}
                      alt={notification.user}
                      style={notificationImageStyle}
                    />
                    <div>
                      <p>
                        <strong>{notification.user}</strong> {notification.action}
                      </p>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>You’re all caught up.</p>
              )
            ) : (
              responsesData.length ? (
                responsesData.map((response) => (
                  <div key={response.id} style={notificationItemStyle}>
                    <img
                      src={response.image}
                      alt="Response"
                      style={notificationImageStyle}
                    />
                    <div>
                      <p>{response.content}</p>
                      <span>{response.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have no new responses.</p>
              )
            )}
          </div>
        </div>
  
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <h3>Staff Picks</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {staffPicks.map((pick) => (
              <li key={pick.id} style={{ marginBottom: '10px' }}>
                <p>{pick.title}</p>
                <small>{pick.author}</small>
              </li>
            ))}
          </ul>
  
          <h3>Recommended Topics</h3>
          <div style={topicsStyle}>
            {recommendedTopics.map((topic, index) => (
              <span key={index} style={topicStyle}>
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default Notification