from flask import Flask, request, jsonify
import face_recognition
import os
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
from scipy.spatial.distance import cosine
import cv2
import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

known_faces = {}

load_dotenv()

app = Flask(__name__)

UPLOAD_FOLDER = "uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Connect to MongoDB
mongo_uri = "mongodb://localhost:27017"  #
client = MongoClient(mongo_uri)
db = client["Tracify"]
collection = db["lostpeople"] #changing the name of the collection i am getting the error 

def get_embedding(image_path):
    image = face_recognition.load_image_file(image_path)
    embedding = face_recognition.face_encodings(image)
    if not embedding:
        print(f"No face detected in {image_path}")
        return None
    return embedding[0]

def find_closest_match(new_embedding, threshold=0.95):  
    all_images = collection.find({})
    best_match = None
    best_similarity = -1
    
    # while True:
    #     video=cv2.VideoCapture(0)
        
    for img in all_images:
        existing_embedding = np.array(img["imageEmbedding"])
        similarity = 1 - cosine(new_embedding, existing_embedding)

        # print(f"Similarity with {img['_id']}: {similarity}")  

        if similarity > best_similarity and similarity > threshold:
            best_similarity = similarity
            best_match = img["_id"]

    print(f"Final best match: {best_match} with similarity {best_similarity}")
    return best_match


@app.route("/process", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files["image"]
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image_file.filename)
    image_file.save(image_path)

    embedding = get_embedding(image_path)
    if embedding is None:
        return jsonify({"error": "No face detected"}), 400

    match_id = find_closest_match(embedding)  # Compare with existing images
    match = match_id is not None
    
    # if not match:
    #     collection.insert_one({
    #         "embedding": list(map(float, embedding)),
    #         # Optionally include additional metadata like image name or path
    #     })
    # else:
    #     collection.delete_one({"_id": match_id})
    os.remove(image_path)
        
    return jsonify({"embedding": list(map(float, embedding)), "match": match, "match_id": str(match_id) if match else None})

@app.route("/process_video", methods=["POST"])
def process_video():
    logging.debug("Starting process_video")
    try:
        if "video" not in request.files:
            logging.error("No video file provided")
            return jsonify({"error": "No video file provided"}), 400

        video_file = request.files["video"]
        video_path = os.path.join(app.config["UPLOAD_FOLDER"], video_file.filename)
        logging.debug(f"Saving video to: {video_path}")
        video_file.save(video_path)

        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            logging.error(f"Error: Cannot open video at {video_path}")
            os.remove(video_path)
            return jsonify({"error": "Cannot open video file"}), 400

        frame_count = 0
        matches=[]
        MAX_COUNT=300
        while cap.isOpened() and frame_count < MAX_COUNT:
            ret, frame = cap.read()
            if not ret:
                logging.info("Finished reading video frames")
                break
            frame_count += 1
            rgb_frame = frame[:, :, ::-1]
            try:
                face_locations = face_recognition.face_locations(rgb_frame)
                embeddings = face_recognition.face_encodings(rgb_frame, face_locations)
                for emb in embeddings:
                    try:
                        match_id = find_closest_match(emb)
                        if match_id:
                            logging.info(f"Found match: {match_id}")
                            matches.append(str(match_id))
                    except Exception as e:
                        logging.error(f"Error during matching: {e}")
            except Exception as e:
                logging.error(f"Error during face detection/encoding: {e}")

        cap.release()
        os.remove(video_path)
        unique_matches = list(set(matches))
        logging.info(f"Found unique matches: {unique_matches}")
        return jsonify({"matches": unique_matches})

    except Exception as e:
        logging.critical(f"General error in process_video: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500
    finally:
        logging.debug("Exiting process_video")


@app.route("/sendData", methods=["POST"])
def send_embedding():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files["image"]
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image_file.filename)
    image_file.save(image_path)

    embedding = get_embedding(image_path)
    if embedding is None:
        return jsonify({"error": "No face detected"}), 400

    # match_id = find_closest_match(embedding)  # Compare with existing images
    # match = match_id is not None
    
    # if not match:
    #     collection.insert_one({
    #         "embedding": list(map(float, embedding)),
    #         # Optionally include additional metadata like image name or path
    #     })
    # else:
    #     collection.delete_one({"_id": match_id})
        
    return jsonify({"embedding": list(map(float, embedding))})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

