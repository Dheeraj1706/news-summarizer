import React, { useState, useEffect } from 'react';
import '../styles/components/NewsCard.css';
import { summarizeArticle } from '../services/api';
import { FaVolumeUp, FaStop, FaHeart, FaRegHeart } from 'react-icons/fa';

const NewsCard = ({ article }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { title, description, url, urlToImage, publishedAt, source } = article;
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleSummarize = async () => {
    if (summary) {
      setExpanded(!expanded);
      return;
    }
    
    setLoading(true);
    try {
      const textToSummarize = `${title}. ${description || ''}`;
      const response = await summarizeArticle(textToSummarize);
      
      if (response.status === 'success') {
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error('Error summarizing article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = () => {
    if (isPlaying) {
      // Stop current speech
      if (speech) {
        window.speechSynthesis.cancel();
        setSpeech(null);
      }
      setIsPlaying(false);
      return;
    }

    // Start speech
    const text = summary ? `${title}. ${summary}` : `${title}. ${description || ''}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsPlaying(false);
      setSpeech(null);
    };
    
    window.speechSynthesis.speak(utterance);
    setSpeech(utterance);
    setIsPlaying(true);
  };
  
  const toggleFavorite = () => {
    const userEmail = localStorage.getItem('userEmail');
    const favoritesKey = userEmail ? `favorites_${userEmail}` : 'favorites';
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.url !== url);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const articleToSave = {
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        source
      };
      localStorage.setItem(favoritesKey, JSON.stringify([...favorites, articleToSave]));
    }
    
    setIsFavorite(!isFavorite);
    
    // Dispatch a custom event to notify about favorites change
    window.dispatchEvent(new Event('storage'));
  };
  
  // Check if this article is in favorites when component mounts
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const favoritesKey = userEmail ? `favorites_${userEmail}` : 'favorites';
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    const isInFavorites = favorites.some(fav => fav.url === url);
    setIsFavorite(isInFavorites);
  }, [url]);
  
  return (
    <div className="news-card">
      <div className="news-card-content">
        <h3 className="news-card-title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        
        <p className="news-card-date">{formatDate(publishedAt)}</p>
        
        <p className="news-card-description">
          {description || 'No description available for this article.'}
        </p>
        
        {summary && (
          <div className="news-card-summary">
            <h4>AI Summary:</h4>
            <p>
              {expanded ? summary : `${summary.substring(0, 150)}${summary.length > 150 ? '...' : ''}`}
            </p>
          </div>
        )}
        
        <div className="news-card-actions">
          <button 
            className={`audio-btn ${isPlaying ? 'playing' : ''}`}
            onClick={handleAudioPlay}
          >
            {isPlaying ? (
              <>
                <FaStop className="audio-icon" /> Stop Audio
              </>
            ) : (
              <>
                <FaVolumeUp className="audio-icon" /> Listen
              </>
            )}
          </button>

          <button 
            className={`summary-btn ${loading ? 'loading' : ''}`}
            onClick={handleSummarize}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 
             summary ? (expanded ? 'Show Less' : 'Read Full Summary') : 'Generate AI Summary'}
          </button>
          
          <button
            className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <>
                <FaHeart className="favorite-icon" /> Saved
              </>
            ) : (
              <>
                <FaRegHeart className="favorite-icon" /> Save
              </>
            )}
          </button>
          
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="read-full-btn"
          >
            Read Full Article
          </a>
        </div>
      </div>
      <div className="news-card-image">
        <img 
          src={urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={title}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image' }}
        />
        {/* <div className="source-badge">{source.name}</div> */}
      </div>
    </div>
  );
};

export default NewsCard;
