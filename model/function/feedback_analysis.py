import PyPDF2
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest

import en_core_web_sm
nlp = en_core_web_sm.load()

# Function to extract text from a PDF file
def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
        return text

file_path = "../temp/sample-review-document.pdf"
pdf_text = extract_text_from_pdf(file_path)

# Define stopwords using spaCy and punctuation
stopwords = list(STOP_WORDS)

# Load spaCy English model
nlp = spacy.load('en_core_web_sm')

# Process the PDF text using spaCy
doc = nlp(pdf_text)

# Calculate word frequencies
word_frequencies = {}
for word in doc:
    if word.text.lower() not in stopwords and word.text.lower() not in punctuation:
        if word.text not in word_frequencies.keys():
            word_frequencies[word.text] = 1
        else:
            word_frequencies[word.text] += 1

# Normalize word frequencies
max_frequency = max(word_frequencies.values())
for word in word_frequencies.keys():
    word_frequencies[word] = word_frequencies[word] / max_frequency

# Tokenize the document into sentences
sentence_tokens = [sent for sent in doc.sents]

# Calculate sentence scores based on word frequencies
sentence_scores = {}
for sent in sentence_tokens:
    for word in sent:
        if word.text.lower() in word_frequencies.keys():
            if sent not in sentence_scores.keys():
                sentence_scores[sent] = word_frequencies[word.text.lower()]
            else:
                sentence_scores[sent] += word_frequencies[word.text.lower()]

# Select top sentences based on scores
select_length = int(len(sentence_tokens) * 0.3)
summary = nlargest(select_length, sentence_scores, key=sentence_scores.get)

# Control the summary length to be less than 500 words
total_words = 0
final_summary = []
for sentence in summary:
    words_in_sentence = sentence.text
    if total_words + len(words_in_sentence.split()) <= 500:
        final_summary.append(words_in_sentence)
        total_words += len(words_in_sentence.split())
    else:
        break


# Join the final summary to create a string
summary_text = ' '.join(final_summary)

# Save the summary to a text file
output_file_path = '../temp/reference_summary.txt'
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write(summary_text)

print(summary)