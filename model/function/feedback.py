from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
import pandas as pd

# Instantiate model and tokenizer
tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')

# Function to calculate sentiment score for a given review
def sentiment_score(review):
    tokens = tokenizer.encode(review, return_tensors='pt')
    result = model(tokens)
    return int(torch.argmax(result.logits))+1

review = "I've been a student at this college for two years, and I must say that the crossroad behind the campus is impressively safe. The ell-lit pathways and the presence of security personnel make me feel secure even during late-night walks. Kudos to the college for prioritizing student"

sentiment = sentiment_score(review[:512])

# print("Sentiment Score:", sentiment)
