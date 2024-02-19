from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
import pandas as pd
from docx import Document

# Instantiate model and tokenizer
tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')

# Function to calculate sentiment score
def sentiment_score(review):
    tokens = tokenizer.encode(review, return_tensors='pt')
    result = model(tokens)
    return int(torch.argmax(result.logits))+1

# Load reviews from DOCX file into a list
def load_reviews_from_docx(docx_file):
    document = Document(docx_file)
    reviews = []
    for paragraph in document.paragraphs:
        reviews.append(paragraph.text)
    return reviews

# Path to the DOCX file containing reviews
docx_file_path = "../resource/sample-review-document.docx"
# ../resource/sample-review-document.docx

# Load reviews from DOCX file
reviews = load_reviews_from_docx(docx_file_path)

# Load reviews into DataFrame and calculate sentiment scores
df = pd.DataFrame(np.array(reviews), columns=['review'])
df['sentiment'] = df['review'].apply(lambda x: sentiment_score(x[:512]))

# Print the DataFrame
print(df)
