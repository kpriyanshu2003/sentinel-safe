import time
from ultralytics import YOLO
import cv2
import json


def count_people_in_video(video_path, model_path="yolov5s.pt"):
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

    start_time = time.time()
    prev_frame_time = start_time
    total_people = 0
    frame_count = 0
    box_count = 0
    avg_speed = 0
    avg_people = 0

    first_frame = True

    while time.time() - start_time < 10:
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

        print(
            f"People Count: {box_count}, Avg People: {avg_people}, avg_speed: {avg_speed}"
        )

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
    return json.dumps({"avgSpeed": avg_speed, "peopleCount": avg_people})
