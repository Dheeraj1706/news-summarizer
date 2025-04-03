import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import CategorySelector from '../components/CategorySelector';
import { getTopHeadlines } from '../services/api';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        setLoading(true);
        const data = await getTopHeadlines();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching top headlines:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopHeadlines();
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Get the News That Matters</h1>
          <p>AI-powered news summarization to save your time and keep you informed</p>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <div className="main-content">
            <h2>Today's Top Headlines</h2>
            {error && <div className="error-message">{error}</div>}
            <NewsList articles={articles} loading={loading} />
          </div>
          
          <aside className="sidebar">
            <CategorySelector />
            
            <div className="about-widget">
              <h3>About NewsSum</h3>
              <p>
                NewsSum uses advanced AI to analyze and summarize news articles from 
                around the world. Get the essential information without the fluff.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
















