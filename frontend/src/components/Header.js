import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Header.css';

import { IoMdSearch } from "react-icons/io";


const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>NewsSummarizer</h1>
          </Link>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/business">Business</Link></li>
            <li><Link to="/category/technology">Technology</Link></li>
            <li><Link to="/category/sports">Sports</Link></li>
            <li><Link to="/category/science">Science</Link></li>
            <li><Link to="/category/health">Health</Link></li>
          </ul>
        </nav>
        
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
      </div>
    </header>
  );
};

export default Header;
