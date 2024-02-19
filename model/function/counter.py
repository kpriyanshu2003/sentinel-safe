import csv
import time
from ultralytics import YOLO
import cv2
import json

def count_people_in_video(video_path, model_path="yolov5s.pt"):
    cap = cv2.VideoCapture(video_path)
    model = YOLO(model_path)

    classNames = [
        "person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat", "traffic light",
        "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow",
        "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee",
        "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard",
        "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
        "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa",
        "pottedplant", "bed", "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard",
        "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
        "teddy bear", "hair drier", "toothbrush",
    ]

    # Initialize CSV file and writer
    csv_file = open("temp/people_count.csv", mode="w")
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(["Time", "People Count", "Avg Speed"])

    start_time = time.time()
    prev_frame_time = start_time
    total_people = 0
    frame_count = 0
    box_count = 0
    avg_speed = 0
    avg_people = 0

    first_frame = True

    while time.time() - start_time < 5:
        new_frame_time = time.time()
        success, img = cap.read()

        if not success:
            print("Footage over")
            # return json.dumps(avg_speed, avg_people)
            break

        results = model(img, stream=True)

        # counter to keep track of the number of bounding boxes
        box_count = 0

        for r in results:
            boxes = r.boxes
            for box in boxes:
                cls = int(box.cls[0])
                if classNames[cls] == "person":
                    box_count += 1

        total_people += box_count
        frame_count += 1

        avg_people = total_people // frame_count if frame_count != 0 else 0

        if not first_frame:
            avg_speed = 1 / (new_frame_time - prev_frame_time)
        prev_frame_time = new_frame_time
        first_frame = False

        print(f"People Count: {box_count}, Avg People: {avg_people}, avg_speed: {avg_speed}")

        # Write to CSV file
        csv_writer.writerow([time.strftime("%Y-%m-%d %H:%M:%S"), box_count, avg_speed])

        cv2.putText(
            img,
            f"People: {box_count}, Avg: {avg_people}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )

        cv2.imshow("Image", img)
        cv2.waitKey(1)

    # Close CSV file
    csv_file.close()
    return json.dumps({"avgSpeed": avg_speed, "peopleCount": avg_people})

    #post = requests.post(url, json={"Average-people-count": box_count, "Average-people-speed": avg_speed})


# video_path = "../resource/CrowdVideo.mp4"
# model_path = "yolov5s.pt"
# url = 'https://sentinel-safe-backend.vercel.app/'
# count = count_people_in_video(video_path, model_path, url)
