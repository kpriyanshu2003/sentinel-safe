from dotenv import load_dotenv

load_dotenv()

from model.function.brightness_test import is_light_or_dark
# from counter import 
# from feedback_analysis import 

lightSts = is_light_or_dark("resource/night-photo.png", 0.4, 'average')
# peopleCount = 
# feedBack =