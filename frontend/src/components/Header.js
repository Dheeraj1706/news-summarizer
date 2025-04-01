import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Header.css';
import { IoMdSearch } from "react-icons/io";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for user info in localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/home">
            <h1>NewsSummarizer</h1>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/category/business">Business</Link></li>
            <li><Link to="/category/technology">Technology</Link></li>
            <li><Link to="/category/sports">Sports</Link></li>
            <li><Link to="/category/science">Science</Link></li>
            <li><Link to="/category/health">Health</Link></li>
          </ul>
        </nav>
        
        <div className="header-right">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <IoMdSearch width={600} color='white'/>
            </button>
          </form>
          
          {userEmail ? (
            <div className="user-info">
              <div className="user-email">
                <FaUser className="user-icon" />
                <span>{userEmail}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt className="logout-icon" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
