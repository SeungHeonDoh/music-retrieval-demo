import os
from gensim import matutils
from sklearn.metrics.pairwise import cosine_similarity

def get_entity(query_emb, embs, indices, topk):
    matrix = cosine_similarity(query_emb.mean(axis=0).reshape(1, -1), embs)[0]
    result = matutils.argsort(matrix, topn=topk, reverse=True)
    entity = [indices[i] for i in result]
    return entity


def get_display_tag(tag_list, origin_tag):
    display_tag = []
    for i in tag_list:
        if i in origin_tag.keys():
            tag = origin_tag[i]
        else:
            tag = i
        display_tag.append(tag)
    return display_tag

    