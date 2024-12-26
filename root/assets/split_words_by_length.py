import json

# Load the main dictionary
with open('words_dictionary.json', 'r') as f:
    words = json.load(f)

# Separate words by length
words_by_length = {4: [], 5: [], 6: [], 7: []}

for word in words.keys():
    if len(word) in words_by_length:
        words_by_length[len(word)].append(word)

# Save each length to a separate file
for length, word_list in words_by_length.items():
    with open(f'words_length_{length}.json', 'w') as f:
        json.dump(word_list, f)

print("Words split by length and saved to files.")
