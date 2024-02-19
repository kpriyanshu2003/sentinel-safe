from dotenv import load_dotenv
import requests
import os
import csv
from model.function.brightness import is_light_or_dark
from model.function.counter import count_people_in_video
import json

load_dotenv()

lightSts = is_light_or_dark("resource/night-photo.png", 0.4, 'average')
count = count_people_in_video("resource/CrowdVideo.mp4", "resource/yolov5su.pt")


# allGeoCode = requests.get(f"{os.getenv('SERVER_URL')}/geo")
# allGeoCode = requests.get(f"{os.getenv('SERVER_URL')}/geo")
#for d in allGeoCode.json():
#    print(d)

print(lightSts)
print(count)

r = requests.post(os.getenv('SERVER_URL'), json = {"lumen": bool(lightSts), "peopleCount": json.loads(count)})
print(r.json())

