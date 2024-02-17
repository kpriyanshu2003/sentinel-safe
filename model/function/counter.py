import csv
import time
from ultralytics import YOLO
import cv2
import json


def count_people_in_video(
    video_path, model_path="yolov5s.pt", output_path="temp/people_count.csv"
):

    cap = cv2.VideoCapture(video_path)
    model = YOLO(model_path)

    classNames = [
        "person",
        "bicycle",
        "car",
        "motorbike",
        "aeroplane",
        "bus",
        "train",
        "truck",
        "boat",
        "traffic light",
        "fire hydrant",
        "stop sign",
        "parking meter",
        "bench",
        "bird",
        "cat",
        "dog",
        "horse",
        "sheep",
        "cow",
        "elephant",
        "bear",
        "zebra",
        "giraffe",
        "backpack",
        "umbrella",
        "handbag",
        "tie",
        "suitcase",
        "frisbee",
        "skis",
        "snowboard",
        "sports ball",
        "kite",
        "baseball bat",
        "baseball glove",
        "skateboard",
        "surfboard",
        "tennis racket",
        "bottle",
        "wine glass",
        "cup",
        "fork",
        "knife",
        "spoon",
        "bowl",
        "banana",
        "apple",
        "sandwich",
        "orange",
        "broccoli",
        "carrot",
        "hot dog",
        "pizza",
        "donut",
        "cake",
        "chair",
        "sofa",
        "pottedplant",
        "bed",
        "diningtable",
        "toilet",
        "tvmonitor",
        "laptop",
        "mouse",
        "remote",
        "keyboard",
        "cell phone",
        "microwave",
        "oven",
        "toaster",
        "sink",
        "refrigerator",
        "book",
        "clock",
        "vase",
        "scissors",
        "teddy bear",
        "hair drier",
        "toothbrush",
    ]

    # Initialize CSV file and writer
    csv_file = open(output_path, mode="w")
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(["Time", "People Count", "Avg Speed"])

    prev_frame_time = 0
    new_frame_time = 0
    total_people = 0
    frame_count = 0
    box_count = 0
    avg_speed = 0

    print("Model Scanning Video....")
    while True:
        new_frame_time = time.time()
        success, img = cap.read()

        if not success:
            print("Footage over")
            return json.dumps({"peopleCount": box_count, "avgSpeed": avg_speed})

        results = model(img, stream=True)

        # counter to keep track of the number of bounding boxes

        for r in results:
            boxes = r.boxes
            for box in boxes:
                cls = int(box.cls[0])
                if classNames[cls] == "person":
                    box_count += 1

        total_people += box_count
        frame_count += 1

        avg_people = total_people // frame_count if frame_count != 0 else 0
        cv2.putText(
            img,
            f"People: {box_count}, Avg: {avg_people}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )

        avg_speed = 1 / (new_frame_time - prev_frame_time)
        prev_frame_time = new_frame_time
        # print(f"People Count: {box_
        # print(f"People Count: {box_count}, Avg People: {avg_people}, avg_speed: {avg_speed}")

        # Write to CSV file
        csv_writer.writerow([time.strftime("%Y-%m-%d %H:%M:%S"), box_count, avg_speed])

        cv2.imshow("Image", img)
        cv2.waitKey(1)

    # Close CSV file
    csv_file.close()


# Sample Usage
video_path = "../resource/CrowdVideo.mp4"
model_path = "yolov5s.pt"
# count = { peopleCount: int, avgSpeed: int }
count = count_people_in_video(video_path, model_path)
print(count)
