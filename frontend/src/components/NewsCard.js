import React, { useState } from 'react';
import '../styles/components/NewsCard.css';
import { summarizeArticle } from '../services/api';
import { FaVolumeUp, FaStop } from 'react-icons/fa';

const NewsCard = ({ article }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState(null);
  
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
