from dotenv import load_dotenv
import requests
import os
import json

from function.brightness import is_light_or_dark
from function.counter import count_people_in_video

load_dotenv()


def update_locmetrics():
    allGeoCode = requests.get(f"{os.getenv('SERVER_URL')}/geo")
    geoCodeData = allGeoCode.json()["data"]
    for geoCodes in geoCodeData:
        print(geoCodes)
        lightSts = is_light_or_dark("resource/night-photo.png", 0.4, "average")
        count = count_people_in_video("resource/CrowdVideo.mp4", "resource/yolov5su.pt")
        r = requests.post(
            f'{os.getenv("SERVER_URL")}/locmetrics',
            json={
                "lumen": bool(lightSts),
                "peopleCount": int(json.loads(count)["peopleCount"]),
                "avgSpeed": float(json.loads(count)["avgSpeed"]),
                "campusName": geoCodes["campusName"],
                "latitude": geoCodes["latitude"],
                "longitude": geoCodes["longitude"],
            },
        )
        print(r.json())
        print()


# This script will, generate the brightness status and people count for each campus and create a new updated entry in the database.
# Status : Done and Dusted
