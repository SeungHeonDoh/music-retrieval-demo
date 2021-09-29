import os
from gensim import matutils
from sklearn.metrics.pairwise import cosine_similarity

def get_entity(query_emb, embs, indices):
    matrix = cosine_similarity(query_emb.mean(axis=0).reshape(1, -1), embs)[0]
    result = matutils.argsort(matrix, topn=5, reverse=True)
    entity = [indices[i] for i in result]
    return entity