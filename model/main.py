from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from waitress import serve
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    return jsonify({"status": "success", "message": "API Working Fine"})


if __name__ == "__main__":
    port = os.getenv("PORT", 3300)
    print("Waitress Server Running on port:", port)
    serve(app=app, host="0.0.0.0", port=port)
