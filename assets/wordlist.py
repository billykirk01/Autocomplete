import re
import string
import operator


with open('wordlist.txt', 'r') as rf:
    text_string = rf.readlines()

with open('wordlist.json', 'w') as wf:
    wf.write("[")
    wf.write('\n')
    for word in text_string:
        wf.write("\t" + '"' + word.strip() + '"' + "," + '\n')
    wf.write('\n')
    wf.write("]")
