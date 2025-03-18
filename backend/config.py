import os

# Flask configuration
DEBUG = True
PORT = 5000

# News API
NEWS_API_KEY = os.environ.get('NEWS_API_KEY', '9dd60cdb2dda43d78a020e9450fbc3da')
NEWS_API_URL = 'https://newsapi.org/v2'


# Categories
CATEGORIES = ['business', 'technology', 'sports', 'entertainment', 'science', 'health', 'general']
