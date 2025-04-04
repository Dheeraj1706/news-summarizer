import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsCard from './NewsCard';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock SpeechSynthesis API
const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
});

global.SpeechSynthesisUtterance = jest.fn().mockImplementation(() => ({
  onend: null,
}));

// Mock window.dispatchEvent
window.dispatchEvent = jest.fn();

describe('NewsCard Component', () => {
  const mockArticle = {
    title: 'AI Technology Advances',
    description: 'New developments in artificial intelligence technology',
    url: 'https://example.com/article',
    urlToImage: 'https://example.com/image.jpg',
    publishedAt: '2023-04-20T12:00:00Z',
    source: { name: 'Test Source' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    localStorageMock.getItem.mockImplementation(() => null);
  });

  test('renders article details correctly', () => {
    render(<NewsCard article={mockArticle} />);
    
    expect(screen.getByText('AI Technology Advances')).toBeInTheDocument();
    expect(screen.getByText('New developments in artificial intelligence technology')).toBeInTheDocument();
    
    // Check if the Read Full Article link is correct
    const fullArticleLink = screen.getByText('Read Full Article');
    expect(fullArticleLink).toHaveAttribute('href', 'https://example.com/article');
  });

  test('toggles favorite status when favorite button is clicked', () => {
    render(<NewsCard article={mockArticle} />);
    
    // Initially, article should not be favorited
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    
    // Click the favorite button
    fireEvent.click(screen.getByText(/Save/i));
    
    // Now it should be favorited
    expect(screen.getByText(/Saved/i)).toBeInTheDocument();
    
    // Check if localStorage was called to save the favorite
    expect(localStorageMock.setItem).toHaveBeenCalled();
    
    // Check if custom event was dispatched
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  test('generates summary when generate summary button is clicked', async () => {
    render(<NewsCard article={mockArticle} />);
    
    // Click generate summary button
    fireEvent.click(screen.getByText(/Generate AI Summary/i));
    
    // Check if button text changes to loading state
    expect(screen.getByText(/Summarizing/i)).toBeInTheDocument();
    
    // Wait for the summary to be generated (after 1.2s delay)
    await waitFor(() => {
      expect(screen.getByText(/AI Summary:/i)).toBeInTheDocument();
      expect(screen.getByText(/Artificial intelligence has revolutionized/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Verify the button text changed
    expect(screen.getByText(/Read Full Summary/i)).toBeInTheDocument();
  });

  test('toggles summary expansion when clicking read full summary button', async () => {
    render(<NewsCard article={mockArticle} />);
    
    // Generate summary first
    fireEvent.click(screen.getByText(/Generate AI Summary/i));
    
    // Wait for summary to appear
    await waitFor(() => {
      expect(screen.getByText(/AI Summary:/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Click to expand
    fireEvent.click(screen.getByText(/Read Full Summary/i));
    
    // Verify button text changed
    expect(screen.getByText(/Show Less/i)).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(screen.getByText(/Show Less/i));
    
    // Verify button text changed back
    expect(screen.getByText(/Read Full Summary/i)).toBeInTheDocument();
  });

  test('plays and stops audio when listen button is clicked', () => {
    render(<NewsCard article={mockArticle} />);
    
    // Find the listen button
    const listenButton = screen.getByText(/Listen/i);
    
    // Click to start audio
    fireEvent.click(listenButton);
    
    // Check if SpeechSynthesis.speak was called
    expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
    
    // Find the stop button and click it
    const stopButton = screen.getByText(/Stop Audio/i);
    fireEvent.click(stopButton);
    
    // Check if SpeechSynthesis.cancel was called
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });
}); 