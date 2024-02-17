import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

from function.brightness import is_light_or_dark
from function.counter import count_people_in_video

# from function.feedback import

# is_light_or_dark( image_path, threshold, mode) ( dark, average, light )
lightSts = is_light_or_dark("resource/night-photo.png", 0.4, "average")
# count_people_in_video(video_path, model_path, output_path )
peopleCount = count_people_in_video(
    "resource/CrowdVideo.mp4", "yolov5s.pt", "temp/people_count.csv"
)

post = requests.post(
    os.getenv("SERVER_URL"),
    json={
        "lumen": bool(lightSts),
        "peopleCount": json.loads(peopleCount)["peopleCount"],
        "avgSpeed": json.loads(peopleCount)["avgSpeed"],
    },
)
print(post.json())
