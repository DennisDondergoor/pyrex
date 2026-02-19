// PyRex challenge data
// Each challenge: id, level, title, instruction, testString, solution (regex pattern string),
//                 explanation, python (code snippet string), hint

const CHALLENGES = [

    // ─── Level 1: Literal Matches ──────────────────────────────────────────────

    {
        id: 'lit-1',
        level: 1,
        title: 'Match a word',
        instruction: "Match every occurrence of the word 'cat'.",
        testString: 'The cat sat on the mat. That fat cat!',
        solution: 'cat',
        explanation: "The pattern 'cat' matches the exact sequence of characters c, a, t — wherever it appears in the string. Regex is case-sensitive by default, so 'Cat' would not match.",
        python: `import re

text = 'The cat sat on the mat. That fat cat!'
matches = re.findall(r'cat', text)
# → ['cat', 'cat']`,
        hint: "Type the word exactly as it appears in the text."
    },
    {
        id: 'lit-2',
        level: 1,
        title: 'Match a name',
        instruction: "Match every occurrence of 'Python'.",
        testString: 'I love Python. Python is amazing. Learn Python!',
        solution: 'Python',
        explanation: "Regex is case-sensitive: 'Python' (capital P) matches only the capitalised version. The pattern 'python' would match nothing in this string.",
        python: `import re

text = 'I love Python. Python is amazing. Learn Python!'
matches = re.findall(r'Python', text)
# → ['Python', 'Python', 'Python']`,
        hint: "Type the word exactly, including the capital P."
    },
    {
        id: 'lit-3',
        level: 1,
        title: 'Match digits',
        instruction: "Match every occurrence of '42'.",
        testString: 'The answer is 42. Not 41 or 43, but 42.',
        solution: '42',
        explanation: "A literal pattern can be made up of digits too. '42' matches the character '4' immediately followed by '2'. Notice it does not match '41' or '43'.",
        python: `import re

text = 'The answer is 42. Not 41 or 43, but 42.'
matches = re.findall(r'42', text)
# → ['42', '42']`,
        hint: "Type the digits exactly as they appear."
    },

    // ─── Level 2: The Dot ──────────────────────────────────────────────────────

    {
        id: 'dot-1',
        level: 2,
        title: 'Any single character',
        instruction: "Match 'c', then any one character, then 't'.",
        testString: 'The cat cut the cot. A bat sat on a cot.',
        solution: 'c.t',
        explanation: "The dot (.) matches any single character except a newline. 'c.t' matches cat (c-a-t), cut (c-u-t), and cot (c-o-t) — any character is allowed between c and t.",
        python: `import re

text = 'The cat cut the cot. A bat sat on a cot.'
matches = re.findall(r'c.t', text)
# → ['cat', 'cut', 'cot', 'cot']`,
        hint: "The dot is a special character meaning 'any one character'."
    },
    {
        id: 'dot-2',
        level: 2,
        title: 'Dot at the start',
        instruction: "Match any character followed by 'at' — capturing all *at words.",
        testString: 'The cat sat on a mat. A fat bat flew by.',
        solution: '.at',
        explanation: "'.at' means: one arbitrary character, then 'at'. It captures cat, sat, mat, fat, bat — any word ending in 'at' where the first letter can be anything.",
        python: `import re

text = 'The cat sat on a mat. A fat bat flew by.'
matches = re.findall(r'.at', text)
# → ['cat', 'sat', 'mat', 'fat', 'bat']`,
        hint: "Put the dot before 'at' — the dot stands for the varying first letter."
    },
    {
        id: 'dot-3',
        level: 2,
        title: 'Multiple dots',
        instruction: "Match 'h', then any character, then 't' — all h_t words.",
        testString: 'I hit the hot pot. The hat is a real hit!',
        solution: 'h.t',
        explanation: "Each dot is one wildcard character. 'h.t' matches hit, hot, and hat. Notice 'pot' is not matched because it starts with 'p', not 'h'.",
        python: `import re

text = 'I hit the hot pot. The hat is a real hit!'
matches = re.findall(r'h.t', text)
# → ['hit', 'hot', 'hat', 'hit']`,
        hint: "You need one dot between 'h' and 't'."
    },

    // ─── Level 3: Character Classes ────────────────────────────────────────────

    {
        id: 'cc-1',
        level: 3,
        title: 'Match vowels',
        instruction: "Match every vowel (a, e, i, o, u) in the string.",
        testString: 'Hello World',
        solution: '[aeiou]',
        explanation: "Square brackets define a character class — a set of allowed characters. '[aeiou]' matches any one of those five vowels. It matches 'e' (Hello) and 'o' (Hello) and 'o' (World).",
        python: `import re

text = 'Hello World'
matches = re.findall(r'[aeiou]', text)
# → ['e', 'o', 'o']`,
        hint: "Put all the vowels inside square brackets: [...]"
    },
    {
        id: 'cc-2',
        level: 3,
        title: 'Match a range',
        instruction: "Match every individual digit in the string.",
        testString: 'I have 3 cats, 12 dogs, and 0 fish.',
        solution: '[0-9]',
        explanation: "Inside a character class, a hyphen between two characters defines a range. '[0-9]' matches any single digit from 0 through 9. Each digit is a separate match.",
        python: `import re

text = 'I have 3 cats, 12 dogs, and 0 fish.'
matches = re.findall(r'[0-9]', text)
# → ['3', '1', '2', '0']`,
        hint: "Use a range inside square brackets: [0-9]"
    },
    {
        id: 'cc-3',
        level: 3,
        title: 'Match uppercase letters',
        instruction: "Match every uppercase letter.",
        testString: 'Hello World! Meet Alice and Bob.',
        solution: '[A-Z]',
        explanation: "'[A-Z]' matches any single uppercase letter from A through Z. It finds H, W, M, A, and B — the first letters of each capitalised word.",
        python: `import re

text = 'Hello World! Meet Alice and Bob.'
matches = re.findall(r'[A-Z]', text)
# → ['H', 'W', 'M', 'A', 'B']`,
        hint: "Use the range [A-Z] for uppercase letters."
    },
    {
        id: 'cc-4',
        level: 3,
        title: 'Negated class',
        instruction: "Match every character that is NOT a digit.",
        testString: 'abc123',
        solution: '[^0-9]',
        explanation: "A caret (^) at the start of a character class negates it. '[^0-9]' matches any character that is not a digit — in this case, a, b, and c.",
        python: `import re

text = 'abc123'
matches = re.findall(r'[^0-9]', text)
# → ['a', 'b', 'c']`,
        hint: "Put a ^ at the start of the class to negate it: [^...]"
    },

    // ─── Level 4: Quantifiers ──────────────────────────────────────────────────

    {
        id: 'quant-1',
        level: 4,
        title: 'One or more',
        instruction: "Match each complete number (one or more consecutive digits).",
        testString: 'I have 3 cats, 12 dogs, and 100 fish.',
        solution: '[0-9]+',
        explanation: "The + quantifier means 'one or more of the preceding element'. '[0-9]+' matches a sequence of digits as a single unit — so 12 is one match, not two separate digit matches.",
        python: `import re

text = 'I have 3 cats, 12 dogs, and 100 fish.'
matches = re.findall(r'[0-9]+', text)
# → ['3', '12', '100']`,
        hint: "Put a + after the character class to match one or more digits."
    },
    {
        id: 'quant-2',
        level: 4,
        title: 'Zero or one (optional)',
        instruction: "Match both 'colour' and 'color' with a single pattern.",
        testString: "I prefer colour but color is also fine. Use colour!",
        solution: 'colou?r',
        explanation: "The ? quantifier means 'zero or one of the preceding element' — making it optional. 'colou?r' matches 'colour' (with u) and 'color' (without u).",
        python: `import re

text = "I prefer colour but color is also fine. Use colour!"
matches = re.findall(r'colou?r', text)
# → ['colour', 'color', 'colour']`,
        hint: "Put ? after the optional character to make it optional."
    },
    {
        id: 'quant-3',
        level: 4,
        title: 'Zero or more',
        instruction: "Match 'h' followed by zero or more 'a' characters.",
        testString: 'h ha haa haaa haaaa!',
        solution: 'ha*',
        explanation: "The * quantifier means 'zero or more of the preceding element'. 'ha*' matches h (zero a's), ha, haa, haaa, haaaa. The 'h' is required; the 'a' repetition is optional.",
        python: `import re

text = 'h ha haa haaa haaaa!'
matches = re.findall(r'ha*', text)
# → ['h', 'ha', 'haa', 'haaa', 'haaaa']`,
        hint: "Put * after 'a' to match zero or more a characters."
    },
    {
        id: 'quant-4',
        level: 4,
        title: 'Exact count',
        instruction: "Match exactly 4-digit years.",
        testString: 'Events in 2020, 2021, and 2022 were unusual. See you in 2025!',
        solution: '[0-9]{4}',
        explanation: "Curly braces specify an exact repetition count. '[0-9]{4}' matches exactly four consecutive digits — perfect for matching years.",
        python: `import re

text = 'Events in 2020, 2021, and 2022 were unusual. See you in 2025!'
matches = re.findall(r'[0-9]{4}', text)
# → ['2020', '2021', '2022', '2025']`,
        hint: "Use {4} after the character class to match exactly 4 digits."
    },

    // ─── Level 5: Anchors ──────────────────────────────────────────────────────

    {
        id: 'anc-1',
        level: 5,
        title: 'Word boundary',
        instruction: "Match the standalone word 'is' — not 'is' inside other words.",
        testString: 'This is a test. What is this? It is not this.',
        solution: '\\bis\\b',
        explanation: "'\\b' marks a word boundary — the position between a word character and a non-word character. '\\bis\\b' matches 'is' only where it stands alone, not inside 'This' or 'this'.",
        python: `import re

text = 'This is a test. What is this? It is not this.'
matches = re.findall(r'\\bis\\b', text)
# → ['is', 'is', 'is']`,
        hint: "Wrap the word with \\b on both sides: \\bword\\b"
    },
    {
        id: 'anc-2',
        level: 5,
        title: 'Start of string',
        instruction: "Match 'Hello' only at the very start of the string.",
        testString: 'Hello, World! Hello again.',
        solution: '^Hello',
        explanation: "'^' anchors the pattern to the start of the string. '^Hello' matches the first 'Hello' only. The second 'Hello' (at position 14) is not at the start, so it is skipped.",
        python: `import re

text = 'Hello, World! Hello again.'
matches = re.findall(r'^Hello', text)
# → ['Hello']`,
        hint: "Put ^ before the word to anchor it to the start of the string."
    },
    {
        id: 'anc-3',
        level: 5,
        title: 'End of string',
        instruction: "Match 'end' only at the very end of the string.",
        testString: 'The end is near. This is the end',
        solution: 'end$',
        explanation: "'$' anchors the pattern to the end of the string. 'end$' matches 'end' only where it appears at the very end — not the 'end' in 'The end is near'.",
        python: `import re

text = 'The end is near. This is the end'
matches = re.findall(r'end$', text)
# → ['end']`,
        hint: "Put $ after the word to anchor it to the end of the string."
    },

    // ─── Level 6: Shorthand Classes ────────────────────────────────────────────

    {
        id: 'short-1',
        level: 6,
        title: 'Digit shorthand',
        instruction: "Match every digit using the shorthand \\d.",
        testString: 'Phone: (555) 867-5309, ext. 42',
        solution: '\\d',
        explanation: "'\\d' is shorthand for '[0-9]' — it matches any single digit. It is shorter to write and conveys intent clearly. It finds all 12 digit characters in the phone number.",
        python: `import re

text = 'Phone: (555) 867-5309, ext. 42'
matches = re.findall(r'\\d', text)
# → ['5','5','5','8','6','7','5','3','0','9','4','2']`,
        hint: "Use \\d to match a single digit."
    },
    {
        id: 'short-2',
        level: 6,
        title: 'Word character shorthand',
        instruction: "Match every word character (letters, digits, underscore) using \\w.",
        testString: 'hello_world = 42',
        solution: '\\w',
        explanation: "'\\w' matches any letter (a-z, A-Z), digit (0-9), or underscore (_). Spaces and '=' are not word characters and will not be matched.",
        python: `import re

text = 'hello_world = 42'
matches = re.findall(r'\\w', text)
# → ['h','e','l','l','o','_','w','o','r','l','d','4','2']`,
        hint: "Use \\w to match word characters (letters, digits, underscore)."
    },
    {
        id: 'short-3',
        level: 6,
        title: 'Whitespace shorthand',
        instruction: "Match every whitespace character using \\s.",
        testString: 'one two  three',
        solution: '\\s',
        explanation: "'\\s' matches any whitespace character: spaces, tabs, newlines. 'one two  three' has a single space after 'one' and two spaces after 'two', giving three whitespace matches.",
        python: `import re

text = 'one two  three'
matches = re.findall(r'\\s', text)
# → [' ', ' ', ' ']`,
        hint: "Use \\s to match whitespace (spaces, tabs, etc.)."
    },
    {
        id: 'short-4',
        level: 6,
        title: 'Non-digit shorthand',
        instruction: "Match every character that is NOT a digit using \\D.",
        testString: 'abc123',
        solution: '\\D',
        explanation: "'\\D' is the negation of '\\d' — it matches any character that is not a digit. In 'abc123', it matches the three letters a, b, c and ignores 1, 2, 3.",
        python: `import re

text = 'abc123'
matches = re.findall(r'\\D', text)
# → ['a', 'b', 'c']`,
        hint: "Use \\D (capital D) to match non-digit characters."
    },

];
