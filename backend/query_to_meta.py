import argparse
import os
import json
from flask import Flask, request, jsonify, make_response
from gensim.models.keyedvectors import KeyedVectors
import numpy as np
import pandas as pd
import functions as F
import pickle

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

## Model & Meta Data Load
model = KeyedVectors.load('./static/dataset/word_model/model', mmap='r')
track_db = json.load(open("./static/collections/track_db.json",'r'))
artist_db = json.load(open("./static/collections/artist_db.json",'r'))

track_embs = np.load("./static/embedding/track_embs.npy")
artist_embs = np.load("./static/embedding/artist_embs.npy")
tag_embs = np.load("./static/embedding/tag_embs.npy")

track_indices = np.load("./static/embedding/track_indices.npy")
artist_indices = np.load("./static/embedding/artist_indices.npy")
tag_indices = np.load("./static/embedding/tag_indices.npy")

ANNOTATION_PATH = "./static/dataset/MSD_split"
MP3PATH = "./static/dataset/songs"
id_to_path = pickle.load(open(os.path.join(ANNOTATION_PATH,'7D_id_to_path.pkl'), 'rb'))
MSD_id_to_7D_id = pickle.load(open(os.path.join(ANNOTATION_PATH,'MSD_id_to_7D_id.pkl'), 'rb'))


@app.errorhandler(404)
def pageNotFound(error):
    return "page not found"

@app.errorhandler(500)
def raiseError(error):
    return error

@app.route('/')
def query_to_result():
    query = request.args['query']
    model_input = query.split()
    query_emb = [model.wv[i] for i in model_input if i in model.wv.vocab]
    query_emb = np.stack(query_emb)
    sim_tag = F.get_entity(query_emb, tag_embs, tag_indices)
    sim_artist = F.get_entity(query_emb, artist_embs, artist_indices)
    sim_track = F.get_entity(query_emb, track_embs, track_indices)
    sim_track_audio = [id_to_path[MSD_id_to_7D_id[i]] for i in sim_track]
    output = {
        'query': query,
        'sim_tag' : sim_tag,
        'sim_artist': [artist_db[i] for i in sim_artist],
        'sim_track': [track_db[i] for i in sim_track],
        'sim_track_audio': sim_track_audio
    }
    return jsonify(**output)

# @app.route('/msd')
# def msd_id_to_meta():
#     doc = request.args['msd_id']
#     output = {
#         'query': doc,
#     }
#     return jsonify(**output)

if __name__ == "__main__":
    # global model
    # global track_db
    # global artist_db
    # global track_embs
    # global artist_embs
    # global tag_embs
    # global track_indices
    # global artist_indices
    # global tag_indices
    parser = argparse.ArgumentParser(description='Flask option arguments')
    parser.add_argument('--host', type=str, default=None, help='Default is localhost')
    parser.add_argument('--port', type=int, default=None, help='Default is :5000')
    args = parser.parse_args() 
    host = args.host
    port = args.port

    print("Finish Loading Audio & Meta Data")

    app.run(host="0.0.0.0", port=7777)