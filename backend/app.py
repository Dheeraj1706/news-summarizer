from flask import Flask
from flask_cors import CORS
from routes.news_routes import news_bp
from routes.summary_routes import summary_bp
import config

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
app.register_blueprint(news_bp, url_prefix='/api/news')
app.register_blueprint(summary_bp, url_prefix='/api/summary')

if __name__ == '__main__':
    app.run(debug=config.DEBUG, port=config.PORT)
