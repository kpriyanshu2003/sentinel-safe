
import requests

url = 'https://right-keen-antelope.ngrok-free.app/'
r = requests.get(url)    # gets data from url
# print(r.json())

post = requests.post(url, json= {"swati" : "xdjnjd"})   # sends data to url, prints data in json
# print(post.json())

patch = requests.patch(url, params={"id" : "iot"})
delete = requests.delete(url, params={"id" : "iot"})

# print(patch.json())

print(delete.json())
