import json
import pytest
from unittest.mock import patch, MagicMock
from app import app

@pytest.fixture
def client():
    """Creates a test client for the app"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@patch('routes.summary_routes.summarize_text')
def test_generate_summary(mock_summarize, client):
    """Test generating a summary"""
    # Mock summarize_text function
    mock_summarize.return_value = "This is a generated summary of the text."
    
    # Test data
    test_data = {
        'text': 'This is a long article that needs to be summarized. It contains multiple sentences and paragraphs with detailed information about various topics.'
    }
    
    # Send request
    response = client.post(
        '/api/summary/generate',
        data=json.dumps(test_data),
        content_type='application/json'
    )
    
    # Check response
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'success'
    assert data['data']['summary'] == "This is a generated summary of the text."
    mock_summarize.assert_called_once_with(test_data['text'])

def test_missing_text_parameter(client):
    """Test error handling when text parameter is missing"""
    # Test data with missing text parameter
    test_data = {}
    
    # Send request
    response = client.post(
        '/api/summary/generate',
        data=json.dumps(test_data),
        content_type='application/json'
    )
    
    # Check response
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['status'] == 'error'
    assert 'text parameter is required' in data['message']

@patch('routes.summary_routes.summarize_text')
def test_empty_text_parameter(mock_summarize, client):
    """Test error handling when text parameter is empty"""
    # Test data with empty text parameter
    test_data = {'text': ''}
    
    # Send request
    response = client.post(
        '/api/summary/generate',
        data=json.dumps(test_data),
        content_type='application/json'
    )
    
    # Check response
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['status'] == 'error'
    assert 'text parameter cannot be empty' in data['message']
    mock_summarize.assert_not_called()

@patch('routes.summary_routes.summarize_text')
def test_handle_summarization_error(mock_summarize, client):
    """Test error handling when summarization fails"""
    # Mock summarize_text function to raise an exception
    mock_summarize.side_effect = Exception("Summarization error")
    
    # Test data
    test_data = {
        'text': 'This is a long article that needs to be summarized.'
    }
    
    # Send request
    response = client.post(
        '/api/summary/generate',
        data=json.dumps(test_data),
        content_type='application/json'
    )
    
    # Check response
    assert response.status_code == 500
    data = json.loads(response.data)
    assert data['status'] == 'error'
    assert 'Failed to generate summary' in data['message'] 