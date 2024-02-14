from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    return jsonify({"status": 200, "message": "API Working Fine"})


if __name__ == "__main__":
    app.run(debug=True, port=os.getenv("PORT", os.getenv('PORT')))
