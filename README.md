# News Summarizer Application

A modern news application that fetches the latest Indian news and provides AI-powered summaries.

## Features

- Browse the latest news from various Indian sources
- View news by categories (Business, Technology, Sports, etc.)
- Search for specific news topics
- Generate AI summaries of articles
- Listen to article text using text-to-speech
- Save favorite articles for later reading

## Technology Stack

- **Frontend**: React.js with React Router
- **Backend**: Flask (Python)
- **APIs**: News API for data, Custom AI summarization API
- **Testing**: Jest and React Testing Library for frontend, Pytest for backend

## Testing Framework

### Frontend Testing

The project uses Jest and React Testing Library for frontend testing:

- **Unit Tests**: Test individual components and services
- **Mock Data**: Mock API responses and browser APIs
- **Coverage Reports**: Generated for all tests

To run the frontend tests:

```bash
cd frontend
npm test             # Run tests with coverage report
npm run test:watch   # Run tests in watch mode
```

### Backend Testing

The backend uses Pytest for testing:

- **Unit Tests**: Test individual API endpoints and services
- **Coverage Reports**: Generated using pytest-cov

To run the backend tests:

```bash
cd backend
pytest                  # Run all tests
pytest --cov=.          # Run tests with coverage report
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration:

### CI Workflow

The CI pipeline runs the following checks:

- **Install Dependencies**: For both frontend and backend
- **Linting**: Check code quality with ESLint (frontend) and Flake8 (backend)
- **Unit Tests**: Run tests and generate coverage reports
- **Build**: Build the frontend application

The pipeline runs automatically on:
- Push to main/master branch
- Pull requests to main/master branch

### Running Locally

To start the application locally:

```bash
# Start backend
cd backend
python app.py

# Start frontend (in a new terminal)
cd frontend
npm start
```

## Project Structure

```
├── .github/workflows/  # CI/CD configuration
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── styles/     # CSS styles
│   │   └── __tests__/  # Test files
│   └── package.json    # Frontend dependencies
└── backend/            # Flask backend
    ├── routes/         # API routes
    ├── models/         # Database models
    ├── services/       # Business logic
    ├── tests/          # Test files
    └── app.py          # Main application file
``` 