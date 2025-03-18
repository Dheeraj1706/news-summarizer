import requests
from config import NEWS_API_KEY, NEWS_API_URL

def get_top_headlines(country='in', page_size=10):
    """Fetch top headlines from News API"""
    url = f"{NEWS_API_URL}/top-headlines"
    params = {
        'country': country,
        'pageSize': page_size,
        'apiKey': NEWS_API_KEY
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    return data.get('articles', [])

def get_news_by_category(category, country='in', page_size=10):
    """Fetch news by category from News API"""
    url = f"{NEWS_API_URL}/top-headlines"
    params = {
        'category': category,
        'country': country,
        'pageSize': page_size,
        'apiKey': NEWS_API_KEY
        }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    return data.get('articles', [])

def search_news(query, page_size=10):
    """Search for news with a keyword or phrase"""
    url = f"{NEWS_API_URL}/everything"
    params = {
        'q': query,
        'pageSize': page_size,
        'apiKey': NEWS_API_KEY,
        'sortBy': 'publishedAt'
        }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    data = response.json()
    return data.get('articles', [])
