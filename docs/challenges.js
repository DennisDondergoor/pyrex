// PyRex challenge data
// Each challenge: id, level, title, instruction, testString, solution (regex pattern string),
//                 explanation, hint
// Note: ids are localStorage keys — do not rename them. Array order sets presentation order.

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

    {
        id: 'lit-cons',
        level: 1,
        title: 'Patterns match anywhere',
        instruction: "Match the sequence 'end' wherever it appears — including inside longer words.",
        testString: 'She blended a trending blend.',
        solution: 'end',
        explanation: "A regex pattern matches anywhere inside a string — it does not care about word boundaries. 'end' matches inside 'blended', 'trending', and 'blend'. This often surprises beginners. Later you will learn how to restrict matches to whole words.",
        python: `import re

text = 'She blended a trending blend.'
matches = re.findall(r'end', text)
# → ['end', 'end', 'end']`,
        hint: "Just type 'end'. The point is to see where it matches."
    },
    {
        id: 'lit-4',
        level: 1,
        title: 'Spaces are literal',
        instruction: "Match the two-word phrase 'hot dog' (including the space).",
        testString: 'Want a hot dog? I love hot dog!',
        solution: 'hot dog',
        explanation: "A space in a regex pattern matches a literal space in the text. 'hot dog' matches the seven-character sequence h-o-t-space-d-o-g. Regex treats spaces just like any other character — they are not ignored.",
        python: `import re

text = 'Want a hot dog? I love hot dog!'
matches = re.findall(r'hot dog', text)
# → ['hot dog', 'hot dog']`,
        hint: "Type the phrase exactly, including the space between the two words."
    },
    {
        id: 'lit-5',
        level: 1,
        title: 'Case sensitivity in practice',
        instruction: "Match only the lowercase 'python' — not 'Python' or 'PYTHON'.",
        testString: 'python Python PYTHON py',
        solution: 'python',
        explanation: "Regex is case-sensitive by default. The pattern 'python' matches only the all-lowercase version. 'Python' starts with a capital P so it does not match. 'PYTHON' is all uppercase — also no match. Only the first token qualifies.",
        python: `import re

text = 'python Python PYTHON py'
matches = re.findall(r'python', text)
# → ['python']`,
        hint: "Type 'python' in all lowercase — capitalisation matters."
    },
    {
        id: 'lit-6',
        level: 1,
        title: 'Matching punctuation',
        instruction: "Match every exclamation mark in the string.",
        testString: 'Wow! Amazing! Great job.',
        solution: '!',
        explanation: "Most punctuation characters match themselves literally — they are not special in regex. '!' matches a literal exclamation mark wherever it appears. Commas, hyphens, and most other symbols work the same way — just type them.",
        python: `import re

text = 'Wow! Amazing! Great job.'
matches = re.findall(r'!', text)
# → ['!', '!']`,
        hint: "Type the character exactly as it appears — no escaping needed."
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
        id: 'dot-5',
        level: 2,
        title: 'Dot matches anything',
        instruction: "Match 'p', any single character, then 'p' — including spaces and digits.",
        testString: 'pop pep p3p p p',
        solution: 'p.p',
        explanation: "The dot matches truly any character — not just letters, but also digits, spaces, punctuation, and more. 'p.p' matches 'pop', 'pep', 'p3p', and even 'p p' where a space sits between the two p's.",
        python: `import re

text = 'pop pep p3p p p'
matches = re.findall(r'p.p', text)
# → ['pop', 'pep', 'p3p', 'p p']`,
        hint: "The dot will match the space too — try it."
    },
    {
        id: 'dot-3',
        level: 2,
        title: 'Escaping the dot',
        instruction: "Match only literal period characters in the string.",
        testString: 'Dr. Smith has a Ph.D. in biology.',
        solution: '\\.',
        explanation: "The dot is a special character in regex. To match an actual period, you must escape it with a backslash: '\\.' means 'a literal dot'. Without the backslash, '.' would match any character.",
        python: `import re

text = 'Dr. Smith has a Ph.D. in biology.'
matches = re.findall(r'\\.', text)
# → ['.', '.', '.', '.']`,
        hint: "Escape the dot with a backslash to match it literally."
    },

    {
        id: 'dot-4',
        level: 2,
        title: 'Escaping other special characters',
        instruction: "Match every opening parenthesis in the string.",
        testString: 'Call (555) 867-5309 or (800) 555-0100',
        solution: '\\(',
        explanation: "Many characters are special in regex and must be escaped with a backslash to be matched literally: ( ) [ ] { } . * + ? ^ $ | \\ — all need a \\. Without the backslash, '(' would start a capturing group. '\\(' matches the literal character.",
        python: `import re

text = 'Call (555) 867-5309 or (800) 555-0100'
matches = re.findall(r'\\(', text)
# → ['(', '(']`,
        hint: "Escape the parenthesis with a backslash: \\("
    },

    {
        id: 'dot-cons',
        level: 2,
        title: 'Wildcard and escape together',
        instruction: "Match each single-letter initial: a letter followed by a period.",
        testString: 'J.K. Rowling and R.R. Martin wrote famous books',
        solution: '.\\.',
        explanation: "This combines both dot concepts: '.' (wildcard) matches the letter, and '\\.' (escaped) matches the literal period. Together they match any one character followed by a real period — capturing initials like J., K., R., R.",
        python: `import re

text = 'J.K. Rowling and R.R. Martin wrote famous books'
matches = re.findall(r'.\.', text)
# → ['J.', 'K.', 'R.', 'R.']`,
        hint: "Use a plain dot for the letter, and \\. for the period."
    },
    {
        id: 'dot-6',
        level: 2,
        title: 'Escaping a question mark',
        instruction: "Match every literal question mark in the string.",
        testString: 'Are you sure? Really? Yes!',
        solution: '\\?',
        explanation: "'?' is a special quantifier in regex meaning 'zero or one'. To match a literal '?', escape it with a backslash. This is the same principle as '\\.' for a literal dot — any special character can be escaped to strip its special meaning.",
        python: `import re

text = 'Are you sure? Really? Yes!'
matches = re.findall(r'\\?', text)
# → ['?', '?']`,
        hint: "Escape the question mark with a backslash: \\?"
    },
    {
        id: 'dot-7',
        level: 2,
        title: 'Two dots in a row',
        instruction: "Match every pair of consecutive characters.",
        testString: 'a1b2c3',
        solution: '..',
        explanation: "Two dots in a row match exactly two consecutive characters. Because the /g flag advances by the full match length after each hit, the matches tile perfectly: 'a1' (positions 0–1), then 'b2' (2–3), then 'c3' (4–5) — no overlap and no gap.",
        python: `import re

text = 'a1b2c3'
matches = re.findall(r'..', text)
# → ['a1', 'b2', 'c3']`,
        hint: "Write two dot characters side by side: .."
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
        id: 'cc-5',
        level: 3,
        title: 'Lowercase range',
        instruction: "Match every lowercase letter.",
        testString: 'Hello World 2024',
        solution: '[a-z]',
        explanation: "'[a-z]' matches any single lowercase letter. It skips the uppercase H and W, and ignores the digits and space entirely.",
        python: `import re

text = 'Hello World 2024'
matches = re.findall(r'[a-z]', text)
# → ['e', 'l', 'l', 'o', 'o', 'r', 'l', 'd']`,
        hint: "Use the range [a-z] for lowercase letters."
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
    {
        id: 'cc-6',
        level: 3,
        title: 'Combining ranges',
        instruction: "Match every letter — both uppercase and lowercase — ignoring digits and punctuation.",
        testString: 'Python3 is cool!',
        solution: '[a-zA-Z]',
        explanation: "You can combine multiple ranges inside one character class. '[a-zA-Z]' matches any lowercase or uppercase letter. The '3', spaces, and '!' are not letters and will not be matched.",
        python: `import re

text = 'Python3 is cool!'
matches = re.findall(r'[a-zA-Z]', text)
# → ['P','y','t','h','o','n','i','s','c','o','o','l']`,
        hint: "Put two ranges inside one set of brackets: [a-zA-Z]"
    },

    {
        id: 'cc-cons',
        level: 3,
        title: 'Chaining character classes',
        instruction: "Match each lowercase letter immediately followed by a digit.",
        testString: 'a1 b2 x9',
        solution: '[a-z][0-9]',
        explanation: "Character classes can be placed side by side to match multi-character sequences. '[a-z][0-9]' matches one lowercase letter then one digit — always exactly two characters. Each class independently matches one character.",
        python: `import re

text = 'a1 b2 x9'
matches = re.findall(r'[a-z][0-9]', text)
# → ['a1', 'b2', 'x9']`,
        hint: "Write two character classes back to back: one for letters, one for digits."
    },
    {
        id: 'cc-7',
        level: 3,
        title: 'Negated class with letters',
        instruction: "Match every character that is NOT a letter (uppercase or lowercase).",
        testString: 'Hello, World! 42',
        solution: '[^a-zA-Z]',
        explanation: "'[^a-zA-Z]' negates the combined letter ranges. Every character that is not a letter matches — commas, spaces, exclamation marks, and digits. It is the exact complement of '[a-zA-Z]' from the previous challenge.",
        python: `import re

text = 'Hello, World! 42'
matches = re.findall(r'[^a-zA-Z]', text)
# → [',', ' ', '!', ' ', '4', '2']`,
        hint: "Negate the combined letter ranges: [^a-zA-Z]"
    },
    {
        id: 'cc-8',
        level: 3,
        title: 'Punctuation class',
        instruction: "Match any sentence-ending punctuation: '.', '!', or '?'.",
        testString: 'Hello! Are you there? Yes.',
        solution: '[.!?]',
        explanation: "Inside a character class, the dot is literal — it loses its wildcard meaning. '[.!?]' matches a period, exclamation mark, or question mark exactly. No backslash is needed for '.' when it sits inside square brackets.",
        python: `import re

text = 'Hello! Are you there? Yes.'
matches = re.findall(r'[.!?]', text)
# → ['!', '?', '.']`,
        hint: "Put all three punctuation marks inside square brackets — the dot is literal inside [...]"
    },
    {
        id: 'cc-9',
        level: 3,
        title: 'Both-case vowels',
        instruction: "Match every vowel — both uppercase and lowercase.",
        testString: 'Open the Gate',
        solution: '[aeiouAEIOU]',
        explanation: "A character class can hold any mix of individual characters. '[aeiouAEIOU]' lists all ten vowel variants. 'O' (uppercase) matches at the start of 'Open', then the lowercase vowels 'e', 'e', 'a', 'e' are found across the rest of the string.",
        python: `import re

text = 'Open the Gate'
matches = re.findall(r'[aeiouAEIOU]', text)
# → ['O', 'e', 'e', 'a', 'e']`,
        hint: "List all five lowercase vowels and all five uppercase vowels inside one bracket."
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
        id: 'quant-extra-plus',
        level: 4,
        title: 'Matching whole words',
        instruction: "Match each complete word using a character range and +.",
        testString: 'the quick brown fox',
        solution: '[a-z]+',
        explanation: "Combining '[a-z]' with '+' matches an entire run of lowercase letters in one go. It keeps consuming characters as long as they are lowercase letters, stopping at spaces. Each word becomes a single match.",
        python: `import re

text = 'the quick brown fox'
matches = re.findall(r'[a-z]+', text)
# → ['the', 'quick', 'brown', 'fox']`,
        hint: "Use [a-z] for the character class and + to match one or more of them."
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
        id: 'quant-extra-opt',
        level: 4,
        title: 'Optional plural',
        instruction: "Match both 'cat' and 'cats' with a single pattern.",
        testString: 'I have 1 cat and 2 cats at home',
        solution: 'cats?',
        explanation: "'s?' makes the 's' optional — zero or one 's'. So 'cats?' matches 'cat' (no s) and 'cats' (with s). This is a very common use of ? for handling singular and plural forms.",
        python: `import re

text = 'I have 1 cat and 2 cats at home'
matches = re.findall(r'cats?', text)
# → ['cat', 'cats']`,
        hint: "Put ? after 's' to make it optional."
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

    {
        id: 'quant-extra-count',
        level: 4,
        title: 'Hex color codes',
        instruction: "Match each 6-character hexadecimal color code (digits and uppercase A–F).",
        testString: '#FF5733 and #1ABC9C are valid colors',
        solution: '[0-9A-F]{6}',
        explanation: "'{6}' means exactly 6 repetitions. '[0-9A-F]' combines two ranges — decimal digits and uppercase hex letters — inside one character class. Together they match exactly 6 hex characters.",
        python: `import re

text = '#FF5733 and #1ABC9C are valid colors'
matches = re.findall(r'[0-9A-F]{6}', text)
# → ['FF5733', '1ABC9C']`,
        hint: "Combine [0-9] and [A-F] inside one class, then use {6}."
    },
    {
        id: 'quant-min',
        level: 4,
        title: 'Minimum count',
        instruction: "Match numbers with 3 or more digits.",
        testString: 'Values: 5, 42, 100, 1000, 99999',
        solution: '[0-9]{3,}',
        explanation: "'{n,}' means 'at least n repetitions, with no upper limit'. '[0-9]{3,}' matches any sequence of 3 or more consecutive digits. The short numbers 5 and 42 are too brief and are skipped.",
        python: `import re

text = 'Values: 5, 42, 100, 1000, 99999'
matches = re.findall(r'[0-9]{3,}', text)
# → ['100', '1000', '99999']`,
        hint: "Use {3,} — the comma with nothing after it means 'no upper limit'."
    },
    {
        id: 'quant-5',
        level: 4,
        title: 'Count range',
        instruction: "Match sequences of 2 to 4 consecutive digits (not single digits).",
        testString: 'Codes: 1, 22, 333, 4444',
        solution: '[0-9]{2,4}',
        explanation: "'{n,m}' matches between n and m repetitions (inclusive). '[0-9]{2,4}' matches 2, 3, or 4 consecutive digits. The single '1' is too short and is skipped.",
        python: `import re

text = 'Codes: 1, 22, 333, 4444'
matches = re.findall(r'[0-9]{2,4}', text)
# → ['22', '333', '4444']`,
        hint: "Use {2,4} to specify a minimum and maximum count."
    },
    {
        id: 'quant-6',
        level: 4,
        title: 'Lazy quantifier',
        instruction: "Match each HTML tag individually using a lazy quantifier.",
        testString: '<b>bold</b> and <i>italic</i>',
        solution: '<.+?>',
        explanation: "By default, + is greedy — it matches as much as possible. '<.+>' would match from the first '<' all the way to the last '>', swallowing everything. Adding '?' makes it lazy: '<.+?>' stops at the first '>' it finds, matching each tag individually.",
        python: `import re

text = '<b>bold</b> and <i>italic</i>'
matches = re.findall(r'<.+?>', text)
# → ['<b>', '</b>', '<i>', '</i>']`,
        hint: "Add ? after + to make it lazy: .+?"
    },

    {
        id: 'quant-cons',
        level: 4,
        title: 'Matching decimal numbers',
        instruction: "Match complete decimal numbers: digits, a literal dot, more digits.",
        testString: 'Pi is 3.14 and e is 2.71828',
        solution: '[0-9]+\\.[0-9]+',
        explanation: "This combines three levels of knowledge: '[0-9]+' (one or more digits) from Level 4, '\\.' (literal period, not a wildcard) from Level 2, then '[0-9]+' again for the decimal part. Together they match complete decimal numbers.",
        python: `import re

text = 'Pi is 3.14 and e is 2.71828'
matches = re.findall(r'[0-9]+\\.[0-9]+', text)
# → ['3.14', '2.71828']`,
        hint: "You need digits+, then an escaped dot, then digits+ again."
    },
    {
        id: 'quant-7',
        level: 4,
        title: 'Optional group',
        instruction: "Match both 'happy' and 'unhappy' using '?' on a group.",
        testString: 'happy unhappy very happy people',
        solution: '(?:un)?happy',
        explanation: "The '?' quantifier can apply to an entire group, not just a single character. '(?:un)?happy' makes the two-character prefix 'un' optional — zero or one occurrence of the whole group. This extends what you learned with 'colou?r' to multi-character sequences.",
        python: `import re

text = 'happy unhappy very happy people'
matches = re.findall(r'(?:un)?happy', text)
# → ['happy', 'unhappy', 'happy']`,
        hint: "Wrap 'un' in a non-capturing group and add ? after the closing parenthesis."
    },
    {
        id: 'quant-8',
        level: 4,
        title: 'Lazy star',
        instruction: "Match each single-quoted string using a lazy '*' to avoid crossing quote boundaries.",
        testString: "say 'hello' and 'world' today",
        solution: "'.*?'",
        explanation: "Greedy '.*' would match from the first quote all the way to the very last, swallowing both strings as one giant match. Lazy '.*?' stops at the earliest possible closing quote, keeping each quoted string as a separate match. '?' after '*' makes the star lazy.",
        python: `import re

text = "say 'hello' and 'world' today"
matches = re.findall(r"'.*?'", text)
# → ["'hello'", "'world'"]`,
        hint: "Surround .*? with quote characters — the ? after * makes the star lazy."
    },

    // ─── Level 5: Anchors ──────────────────────────────────────────────────────

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
    {
        id: 'anc-extra-end',
        level: 5,
        title: 'End anchor: file extension',
        instruction: "Match '.py' only at the very end of the string.",
        testString: 'main.py is imported in utils.py',
        solution: '\\.py$',
        explanation: "'\\.' matches the literal period, 'py' matches literally, and '$' anchors it to the end of the string. 'main.py' is not at the end so it is skipped — only the final '.py' matches. This pattern is useful for checking file extensions.",
        python: `import re

text = 'main.py is imported in utils.py'
matches = re.findall(r'\\.py$', text)
# → ['.py']`,
        hint: "Combine an escaped dot, 'py', and the end anchor $."
    },
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
        id: 'anc-extra-b',
        level: 5,
        title: 'Word boundary contrast',
        instruction: "Match the standalone word 'pin', but not 'pin' inside 'pinboard' or 'spin'.",
        testString: 'pin the picture on the pinboard or spin it',
        solution: '\\bpin\\b',
        explanation: "'\\bpin\\b' requires a word boundary on both sides. 'pinboard' has 'pin' at the start but it is followed by 'b' (a word character) — no boundary there. 'spin' has 'pin' at the end but preceded by 's' — no boundary before 'p'. Only the standalone 'pin' matches.",
        python: `import re

text = 'pin the picture on the pinboard or spin it'
matches = re.findall(r'\\bpin\\b', text)
# → ['pin']`,
        hint: "Use \\b on both sides of the word."
    },
    {
        id: 'anc-extra-start',
        level: 5,
        title: 'Start anchor: log prefix',
        instruction: "Match 'ERROR' only at the very start of the string.",
        testString: 'ERROR: disk full. WARNING: ERROR logged.',
        solution: '^ERROR',
        explanation: "'^ERROR' only matches at the start of the string. The second 'ERROR' appears after 'WARNING: ' so it is not at the start and is skipped. This is useful for detecting the severity level of a log line.",
        python: `import re

text = 'ERROR: disk full. WARNING: ERROR logged.'
matches = re.findall(r'^ERROR', text)
# → ['ERROR']`,
        hint: "Use ^ before the word to anchor it to the start."
    },
    {
        id: 'anc-4',
        level: 5,
        title: 'Combining anchors',
        instruction: "Match a date in YYYY-MM-DD format, but only if the string starts with it.",
        testString: '2024-01-15 was a Monday.',
        solution: '^[0-9]{4}-[0-9]{2}-[0-9]{2}',
        explanation: "Anchors and other patterns combine freely. '^[0-9]{4}-[0-9]{2}-[0-9]{2}' means: at the start of the string, match 4 digits, a literal hyphen, 2 digits, a hyphen, 2 digits. The hyphen inside a pattern (not inside [...]) is literal.",
        python: `import re

text = '2024-01-15 was a Monday.'
matches = re.findall(r'^[0-9]{4}-[0-9]{2}-[0-9]{2}', text)
# → ['2024-01-15']`,
        hint: "Start with ^ then build the date pattern using {4} and {2}."
    },

    {
        id: 'anc-cons',
        level: 5,
        title: 'Anchored version number',
        instruction: "Match a version number in X.Y.Z format, but only at the start of the string.",
        testString: '3.11.4 is the latest Python 3.11 release.',
        solution: '^[0-9]+\\.[0-9]+\\.[0-9]+',
        explanation: "'^' ensures the match only occurs at the very start. The version pattern '[0-9]+\\.[0-9]+\\.[0-9]+' requires two literal dots, so '3.11' later in the string won't match — it only has one dot. This is a practical combination of anchors, quantifiers, and escaping.",
        python: `import re

text = '3.11.4 is the latest Python 3.11 release.'
matches = re.findall(r'^[0-9]+\\.[0-9]+\\.[0-9]+', text)
# → ['3.11.4']`,
        hint: "Start with ^, then repeat: digits, escaped dot, digits, escaped dot, digits."
    },
    {
        id: 'anc-5',
        level: 5,
        title: 'Non-word boundary \\B',
        instruction: "Match 'ing' only when it appears inside a longer word — not as a standalone word.",
        testString: 'running walking ing jumping',
        solution: '\\Bing',
        explanation: "'\\B' is the opposite of '\\b' — it matches a position that is NOT a word boundary. '\\Bing' succeeds only when a word character (like 'n' or 'k') immediately precedes 'i'. The standalone 'ing' is preceded by a space, which IS a word boundary, so '\\B' fails there and it is skipped.",
        python: `import re

text = 'running walking ing jumping'
matches = re.findall(r'\\Bing', text)
# → ['ing', 'ing', 'ing']`,
        hint: "Use \\B (capital B) before 'ing' — it means 'NOT at a word boundary here'."
    },
    {
        id: 'anc-6',
        level: 5,
        title: 'One-sided word boundary',
        instruction: "Match whole words that begin with 'pre'.",
        testString: 'preview cat prefer dog prepare',
        solution: '\\bpre\\w+',
        explanation: "'\\b' at the start ensures 'pre' begins at a word boundary. '\\w+' then matches the rest of the word — no closing '\\b' is needed because '\\w+' naturally stops at a non-word character. This finds any word starting with 'pre' while skipping 'cat' and 'dog'.",
        python: `import re

text = 'preview cat prefer dog prepare'
matches = re.findall(r'\\bpre\\w+', text)
# → ['preview', 'prefer', 'prepare']`,
        hint: "Put \\b before 'pre' to anchor the start, then \\w+ for the rest of the word."
    },
    {
        id: 'anc-7',
        level: 5,
        title: 'Matching adverbs with \\b',
        instruction: "Match words that end in 'ly'.",
        testString: 'quickly slowly run carefully fast',
        solution: '\\w+ly\\b',
        explanation: "'\\w+' greedily matches letters then backtracks until 'ly' can fit at the end. '\\b' after 'ly' confirms the match ends at a word boundary — no extra word characters follow. 'run' and 'fast' contain no 'ly' suffix so they are skipped.",
        python: `import re

text = 'quickly slowly run carefully fast'
matches = re.findall(r'\\w+ly\\b', text)
# → ['quickly', 'slowly', 'carefully']`,
        hint: "Use \\w+ for the word start, then 'ly', then \\b to confirm the word ends there."
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
        id: 'short-extra-s',
        level: 6,
        title: 'Whitespace runs',
        instruction: "Match each run of consecutive whitespace as a single match using \\s+.",
        testString: 'one  two   three',
        solution: '\\s+',
        explanation: "'\\s+' matches one or more consecutive whitespace characters as one unit. The double space after 'one' is one match and the triple space after 'two' is another. This is useful for normalising irregular spacing in text.",
        python: `import re

text = 'one  two   three'
matches = re.findall(r'\\s+', text)
# → ['  ', '   ']`,
        hint: "Add + after \\s to match runs of whitespace as single tokens."
    },
    {
        id: 'short-4',
        level: 6,
        title: 'Negated shorthands',
        instruction: "Match every character that is NOT a digit using \\D.",
        testString: 'abc123',
        solution: '\\D',
        explanation: "Every shorthand has a negated uppercase version: \\D (not a digit), \\W (not a word character), \\S (not whitespace). They are the opposites of \\d, \\w, and \\s respectively. Here \\D matches a, b, c and ignores the digits.",
        python: `import re

text = 'abc123'
matches = re.findall(r'\\D', text)
# → ['a', 'b', 'c']

# The same pattern applies to \\W and \\S:
# \\W matches non-word characters (spaces, punctuation)
# \\S matches non-whitespace characters`,
        hint: "Use \\D (capital D) to match non-digit characters."
    },
    {
        id: 'short-7',
        level: 6,
        title: 'Combining \\d and +',
        instruction: "Match each complete number in the string using \\d+.",
        testString: 'Order #1234, qty: 5, price: $29.99',
        solution: '\\d+',
        explanation: "Combining a shorthand with a quantifier is very common. '\\d+' matches one or more consecutive digits as a single unit — giving you whole numbers rather than individual digit characters.",
        python: `import re

text = 'Order #1234, qty: 5, price: $29.99'
matches = re.findall(r'\\d+', text)
# → ['1234', '5', '29', '99']`,
        hint: "Put + after \\d to match one or more digits together."
    },
    {
        id: 'short-8',
        level: 6,
        title: 'Combining \\w and +',
        instruction: "Match each whole word (including underscore-joined words) using \\w+.",
        testString: 'hello world foo_bar',
        solution: '\\w+',
        explanation: "'\\w+' matches one or more consecutive word characters. Because underscore is a word character, 'foo_bar' is matched as a single token rather than two separate words.",
        python: `import re

text = 'hello world foo_bar'
matches = re.findall(r'\\w+', text)
# → ['hello', 'world', 'foo_bar']`,
        hint: "Put + after \\w to match one or more word characters together."
    },

    {
        id: 'short-cons',
        level: 6,
        title: 'Matching email addresses',
        instruction: "Match each email address in the string.",
        testString: 'Send to alice@example.com or bob@test.org',
        solution: '\\w+@\\w+\\.\\w+',
        explanation: "This uses everything from Level 6: '\\w+' matches the username, '@' is a literal character, '\\w+' matches the domain name, '\\.' matches the literal dot, and '\\w+' matches the extension. Real email patterns are more complex, but this covers the common case.",
        python: `import re

text = 'Send to alice@example.com or bob@test.org'
matches = re.findall(r'\\w+@\\w+\\.\\w+', text)
# → ['alice@example.com', 'bob@test.org']`,
        hint: "Build it piece by piece: \\w+ for username, @ literally, \\w+ for domain, \\. for dot, \\w+ for extension."
    },
    {
        id: 'short-5',
        level: 6,
        title: 'Non-word character \\W',
        instruction: "Match each run of non-word characters using \\W+.",
        testString: 'hello, world!',
        solution: '\\W+',
        explanation: "'\\W' (uppercase W) is the negated shorthand — it matches any character that is NOT a letter, digit, or underscore. Adding '+' groups consecutive non-word characters into a single match. Here ', ' (comma + space) is one run and '!' is another.",
        python: `import re

text = 'hello, world!'
matches = re.findall(r'\\W+', text)
# → [', ', '!']`,
        hint: "Use \\W (capital W) with + to match runs of non-word characters."
    },
    {
        id: 'short-6',
        level: 6,
        title: 'Non-whitespace \\S',
        instruction: "Match each non-whitespace token using \\S+.",
        testString: 'hello   world  foo',
        solution: '\\S+',
        explanation: "'\\S' (uppercase S) matches any character that is NOT whitespace — the opposite of '\\s'. '\\S+' matches one or more consecutive non-whitespace characters, splitting the string into tokens at whitespace boundaries regardless of how many spaces appear.",
        python: `import re

text = 'hello   world  foo'
matches = re.findall(r'\\S+', text)
# → ['hello', 'world', 'foo']`,
        hint: "Use \\S (capital S) with + to match runs of non-whitespace."
    },
    {
        id: 'short-9',
        level: 6,
        title: 'Combining shorthands',
        instruction: "Match each pair of a word character immediately followed by a digit.",
        testString: 'a1 b2 c9 de',
        solution: '\\w\\d',
        explanation: "Shorthand classes can be placed side by side just like character classes. '\\w\\d' matches one word character then immediately one digit — exactly two characters per match. 'de' has no digit after either letter so it is skipped entirely.",
        python: `import re

text = 'a1 b2 c9 de'
matches = re.findall(r'\\w\\d', text)
# → ['a1', 'b2', 'c9']`,
        hint: "Place \\w and \\d back to back with no space between them."
    },

    // ─── Level 7: Groups ──────────────────────────────────────────────────────

    {
        id: 'grp-1',
        level: 7,
        title: 'Group as a unit',
        instruction: "Match each full run of 'ha' repeated one or more times.",
        testString: 'ha haha hahaha wow',
        solution: '(?:ha)+',
        explanation: "Parentheses group characters into a single unit so quantifiers can apply to the whole group. (?:ha)+ treats 'ha' as one element and matches it one or more times in a row. The ?: prefix makes it a non-capturing group, which is the standard choice when you only need grouping for repetition.",
        python: `import re

text = 'ha haha hahaha wow'
matches = re.findall(r'(?:ha)+', text)
# → ['ha', 'haha', 'hahaha']`,
        hint: "Wrap 'ha' in (?:...) to treat it as a single unit, then add +."
    },
    {
        id: 'grp-2',
        level: 7,
        title: 'Exact group repetition',
        instruction: "Match the sequence 'ab' repeated exactly 3 times.",
        testString: 'ab abab ababab xyz',
        solution: '(?:ab){3}',
        explanation: "(?:ab){3} applies {3} to the whole group 'ab' as a unit. 'ab' (1 repetition) and 'abab' (2 repetitions) are too short and are skipped. Only 'ababab' has exactly 3 consecutive repetitions.",
        python: `import re

text = 'ab abab ababab xyz'
matches = re.findall(r'(?:ab){3}', text)
# → ['ababab']`,
        hint: "Wrap 'ab' in a non-capturing group and use {3}."
    },
    {
        id: 'grp-3',
        level: 7,
        title: 'Minimum group repetition',
        instruction: "Match 'na' repeated 2 or more times.",
        testString: 'na nana nanana',
        solution: '(?:na){2,}',
        explanation: "{2,} means 'at least 2 repetitions, no upper limit'. 'na' alone is only 1 repetition and is skipped. 'nana' has 2 and matches. 'nanana' has 3 and matches — the engine is greedy and consumes as many repetitions as possible.",
        python: `import re

text = 'na nana nanana'
matches = re.findall(r'(?:na){2,}', text)
# → ['nana', 'nanana']`,
        hint: "Use {2,} after the group — the comma with nothing after means no upper limit."
    },
    {
        id: 'grp-4',
        level: 7,
        title: 'Repeating structured tokens',
        instruction: "Match each sequence of one or more digit-dash pairs (e.g. '1-', '1-2-', '1-2-3-').",
        testString: '1- 1-2- 1-2-3- abc',
        solution: '(?:\\d-)+',
        explanation: "(?:\\d-) groups a digit and a dash as one unit. Adding + matches one or more of these pairs in a row. The engine consumes as many digit-dash pairs as it can, so '1-2-3-' is one match rather than three.",
        python: `import re

text = '1- 1-2- 1-2-3- abc'
matches = re.findall(r'(?:\\d-)+', text)
# → ['1-', '1-2-', '1-2-3-']`,
        hint: "Put \\d and - inside a non-capturing group, then add +."
    },
    {
        id: 'grp-5',
        level: 7,
        title: 'Back-reference: doubled words',
        instruction: "Match any word that appears twice in a row, separated by a space.",
        testString: 'the the cat cat sat once',
        solution: '(\\w+) \\1',
        explanation: "Parentheses without ?: create a capturing group. \\1 is a back-reference that matches the exact same text as group 1 captured. So (\\w+) \\1 finds 'the the' and 'cat cat'. 'sat' and 'once' appear only once and are skipped.",
        python: `import re

text = 'the the cat cat sat once'
matches = [m.group(0) for m in re.finditer(r'(\\w+) \\1', text)]
# → ['the the', 'cat cat']`,
        hint: "Use (\\w+) to capture a word, then \\1 to match the exact same word again."
    },
    {
        id: 'grp-cons',
        level: 7,
        title: 'Matching timestamps',
        instruction: "Match each time in HH:MM:SS format.",
        testString: 'Meeting at 09:30:00 and 14:45:30',
        solution: '(?:\\d{2}:){2}\\d{2}',
        explanation: "(?:\\d{2}:) matches exactly two digits followed by a colon. Repeating this group {2} times gives the 'HH:MM:' prefix. Then \\d{2} matches the final two-digit seconds without a trailing colon. This consolidates groups, quantifiers, and shorthand classes.",
        python: `import re

text = 'Meeting at 09:30:00 and 14:45:30'
matches = re.findall(r'(?:\\d{2}:){2}\\d{2}', text)
# → ['09:30:00', '14:45:30']`,
        hint: "Group two digits and a colon as a unit, repeat it twice, then match two more digits."
    },
    {
        id: 'grp-6',
        level: 7,
        title: 'Optional group with ?',
        instruction: "Match 'super' with or without the optional 'un' prefix.",
        testString: 'super unsuper is different',
        solution: '(?:un)?super',
        explanation: "Applying '?' to a group makes the entire multi-character sequence optional. '(?:un)?super' matches 'super' alone (zero occurrences of the group) and 'unsuper' (one occurrence). This extends '?' from single characters to whole groups.",
        python: `import re

text = 'super unsuper is different'
matches = re.findall(r'(?:un)?super', text)
# → ['super', 'unsuper']`,
        hint: "Wrap 'un' in (?:...) and add ? after the closing parenthesis."
    },
    {
        id: 'grp-7',
        level: 7,
        title: 'Zero-or-more group with *',
        instruction: "Match 'important' preceded by zero or more 'very ' repetitions.",
        testString: 'important very important very very important',
        solution: '(?:very )*important',
        explanation: "Applying '*' to a group matches zero or more occurrences of the entire sequence. '(?:very )*' consumes any number of 'very ' prefixes — including none at all — before 'important'. All three phrases match because '*' allows zero repetitions just as well as many.",
        python: `import re

text = 'important very important very very important'
matches = re.findall(r'(?:very )*important', text)
# → ['important', 'very important', 'very very important']`,
        hint: "Wrap 'very ' (with the trailing space) in (?:...) and add * after the closing parenthesis."
    },

    // ─── Level 8: Alternation ──────────────────────────────────────────────────

    {
        id: 'alt-1',
        level: 8,
        title: 'Match one of two words',
        instruction: "Match every occurrence of 'cat' or 'dog'.",
        testString: 'I have a cat and a dog. The cat sleeps.',
        solution: 'cat|dog',
        explanation: "The pipe character | means 'or'. 'cat|dog' matches wherever 'cat' appears and wherever 'dog' appears. The engine tries the left alternative first; if that fails at the current position it tries the right one.",
        python: `import re

text = 'I have a cat and a dog. The cat sleeps.'
matches = re.findall(r'cat|dog', text)
# → ['cat', 'dog', 'cat']`,
        hint: "Separate the two options with a pipe character |."
    },
    {
        id: 'alt-2',
        level: 8,
        title: 'Multiple alternatives',
        instruction: "Match each day-of-week abbreviation.",
        testString: 'Mon Tue Wed Thu Fri Sat Sun',
        solution: 'Mon|Tue|Wed|Thu|Fri|Sat|Sun',
        explanation: "You can chain as many alternatives as you need by adding more | characters. The engine tests each option from left to right at every position and takes the first one that matches.",
        python: `import re

text = 'Mon Tue Wed Thu Fri Sat Sun'
matches = re.findall(r'Mon|Tue|Wed|Thu|Fri|Sat|Sun', text)
# → ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']`,
        hint: "List all 7 abbreviations separated by |."
    },
    {
        id: 'alt-3',
        level: 8,
        title: 'Grouped alternation',
        instruction: "Match both 'gray' and 'grey' using alternation inside a group.",
        testString: 'The gray cat and the grey dog.',
        solution: 'gr(?:a|e)y',
        explanation: "Without grouping, 'gra|ey' would mean 'gra' or 'ey' — the | splits the entire pattern. Wrapping the alternatives in (?:a|e) scopes the alternation to just that position. gr(?:a|e)y means 'gr', then either 'a' or 'e', then 'y'.",
        python: `import re

text = 'The gray cat and the grey dog.'
matches = re.findall(r'gr(?:a|e)y', text)
# → ['gray', 'grey']`,
        hint: "Put the varying part (a or e) inside a group with |."
    },
    {
        id: 'alt-4',
        level: 8,
        title: 'Alternation with longer options',
        instruction: "Match 'apple', 'banana', or 'cherry'.",
        testString: 'I like apple, banana, and cherry pie.',
        solution: 'apple|banana|cherry',
        explanation: "Alternatives do not have to be the same length. At each position the engine tests 'apple' first, then 'banana', then 'cherry', stopping when one succeeds. The first successful match wins.",
        python: `import re

text = 'I like apple, banana, and cherry pie.'
matches = re.findall(r'apple|banana|cherry', text)
# → ['apple', 'banana', 'cherry']`,
        hint: "List all three fruits separated by |."
    },
    {
        id: 'alt-5',
        level: 8,
        title: 'Alternation inside a larger pattern',
        instruction: "Match filenames ending in '.py' or '.js', but not '.css'.",
        testString: 'app.py index.js style.css utils.py',
        solution: '\\w+\\.(?:py|js)',
        explanation: "Grouping scopes the alternation. '\\w+' matches the filename, '\\.' matches the literal dot, and (?:py|js) matches either extension. Without the group, '\\w+\\.py|js' would mean 'filename.py' OR just 'js'.",
        python: `import re

text = 'app.py index.js style.css utils.py'
matches = re.findall(r'\\w+\\.(?:py|js)', text)
# → ['app.py', 'index.js', 'utils.py']`,
        hint: "Match the filename with \\w+, escape the dot, then use (?:py|js) for the extension."
    },
    {
        id: 'alt-6',
        level: 8,
        title: 'Matching HTTP methods',
        instruction: "Match each HTTP method in the log line.",
        testString: 'GET /home POST /login PUT /user DELETE /item',
        solution: 'GET|POST|PUT|DELETE',
        explanation: "Alternation is ideal for matching a fixed set of known keywords. Order matters when alternatives share a prefix — put longer alternatives first so they are tried before shorter ones that could match a prefix.",
        python: `import re

text = 'GET /home POST /login PUT /user DELETE /item'
matches = re.findall(r'GET|POST|PUT|DELETE', text)
# → ['GET', 'POST', 'PUT', 'DELETE']`,
        hint: "List all four HTTP methods separated by |."
    },
    {
        id: 'alt-cons',
        level: 8,
        title: 'Log level tags',
        instruction: "Match each bracketed log level tag: [INFO], [ERROR], or [WARNING].",
        testString: '[INFO] started [ERROR] disk full [WARNING] low memory',
        solution: '\\[(?:INFO|ERROR|WARNING)\\]',
        explanation: "This consolidates escaping, groups, and alternation. '\\[' and '\\]' match literal square brackets (special regex characters that must be escaped). (?:INFO|ERROR|WARNING) is a non-capturing group with three alternatives for the tag content.",
        python: `import re

text = '[INFO] started [ERROR] disk full [WARNING] low memory'
matches = re.findall(r'\\[(?:INFO|ERROR|WARNING)\\]', text)
# → ['[INFO]', '[ERROR]', '[WARNING]']`,
        hint: "Escape the square brackets with \\[ and \\], then put the three keywords inside a group with |."
    },
    {
        id: 'alt-7',
        level: 8,
        title: 'Order matters',
        instruction: "Match 'colour' and 'col' as distinct matches — put the longer alternative first.",
        testString: 'colour col',
        solution: 'colour|col',
        explanation: "The engine tests alternatives left to right and takes the first one that matches at the current position. Writing 'col|colour' matches 'col' at position 0 and the 'our' is abandoned — you'd get two 'col' matches. Writing 'colour|col' correctly matches 'colour' in full before trying 'col'. Always put longer overlapping alternatives first.",
        python: `import re

text = 'colour col'
matches = re.findall(r'colour|col', text)
# → ['colour', 'col']`,
        hint: "Put 'colour' before 'col' — longer alternatives must come first."
    },
    {
        id: 'alt-8',
        level: 8,
        title: 'Alternation with word boundaries',
        instruction: "Match the standalone words 'yes' or 'no' — not when embedded inside longer words.",
        testString: 'yes no yes honey nose',
        solution: '\\b(?:yes|no)\\b',
        explanation: "Without word boundaries, 'yes|no' would match 'no' inside 'nose'. Wrapping with '\\b...\\b' constrains each alternative to whole words. In 'nose', 'no' sits at a word start but is followed by 's' (a word character) — no closing boundary — so it is correctly skipped.",
        python: `import re

text = 'yes no yes honey nose'
matches = re.findall(r'\\b(?:yes|no)\\b', text)
# → ['yes', 'no', 'yes']`,
        hint: "Wrap the alternation group with \\b on both sides."
    },
    {
        id: 'alt-9',
        level: 8,
        title: 'Alternation with an anchor',
        instruction: "Match 'cat' or 'dog' only at the very end of the string.",
        testString: 'my cat my dog is a cat',
        solution: '(?:cat|dog)$',
        explanation: "Anchors combine naturally with alternation. '(?:cat|dog)$' requires the match to occur at the very end of the string. 'my cat' and 'my dog' appear earlier and are skipped. Only the final 'cat' satisfies the '$' anchor.",
        python: `import re

text = 'my cat my dog is a cat'
matches = re.findall(r'(?:cat|dog)$', text)
# → ['cat']`,
        hint: "Group the alternatives with (?:...) and add $ at the end."
    },

    // ─── Level 9: Named Groups ─────────────────────────────────────────────────

    {
        id: 'ng-1',
        level: 9,
        title: 'Naming a group',
        instruction: "Match each 4-digit year using a named group called 'year'.",
        testString: 'Born in 1990, graduated in 2015, retiring in 2055',
        solution: '(?<year>\\d{4})',
        explanation: "In JavaScript regex, (?<name>...) creates a named capturing group. In Python the syntax is (?P<name>...). The name documents what the group captures and lets you access it by name rather than by index — useful when patterns grow complex.",
        python: `import re

text = 'Born in 1990, graduated in 2015, retiring in 2055'
pattern = r'(?P<year>\\d{4})'
matches = [m.group('year') for m in re.finditer(pattern, text)]
# → ['1990', '2015', '2055']`,
        hint: "Wrap \\d{4} in (?<year>...) — note the angle brackets around the name."
    },
    {
        id: 'ng-2',
        level: 9,
        title: 'Multiple named groups',
        instruction: "Match each date in DD/MM/YYYY format using named groups for day, month, and year.",
        testString: 'Dates: 25/12/2024 and 01/01/2025',
        solution: '(?<day>\\d{2})/(?<month>\\d{2})/(?<year>\\d{4})',
        explanation: "A single pattern can contain multiple named groups. Each group captures a distinct part of the match. Naming them 'day', 'month', and 'year' makes the pattern self-documenting compared to \\d{2}/\\d{2}/\\d{4}.",
        python: `import re

text = 'Dates: 25/12/2024 and 01/01/2025'
for m in re.finditer(r'(?P<day>\\d{2})/(?P<month>\\d{2})/(?P<year>\\d{4})', text):
    print(m.group('day'), m.group('month'), m.group('year'))
# → 25 12 2024
# → 01 01 2025`,
        hint: "Write three groups in order: (?<day>\\d{2}), (?<month>\\d{2}), (?<year>\\d{4}), separated by /."
    },
    {
        id: 'ng-3',
        level: 9,
        title: 'Named back-reference',
        instruction: "Match each path segment that immediately repeats — for example 'dir/dir' or 'usr/usr'.",
        testString: 'dir/dir/file usr/usr/bin home/home',
        solution: '(?<seg>\\w+)/\\k<seg>',
        explanation: "\\k<name> is a named back-reference — it matches the exact text captured by the named group. (?<seg>\\w+)/\\k<seg> captures a word in 'seg', then requires the same word to appear again after a slash. In Python the syntax is (?P=seg).",
        python: `import re

text = 'dir/dir/file usr/usr/bin home/home'
matches = [m.group(0) for m in re.finditer(r'(?P<seg>\\w+)/(?P=seg)', text)]
# → ['dir/dir', 'usr/usr', 'home/home']`,
        hint: "Capture a word with (?<seg>\\w+), then match a slash and \\k<seg> to repeat it."
    },
    {
        id: 'ng-4',
        level: 9,
        title: 'Named back-reference: equal parts',
        instruction: "Match times where the hour and minute are identical (e.g. '11:11', '22:22').",
        testString: 'Times: 11:11 12:34 22:22 09:09 08:15',
        solution: '(?<hh>\\d{2}):\\k<hh>',
        explanation: "(?<hh>\\d{2}) captures exactly 2 digits as 'hh', then :\\k<hh> requires a colon followed by the exact same two digits. This filters to palindromic times. '12:34' fails because the minute '34' differs from the hour '12'.",
        python: `import re

text = 'Times: 11:11 12:34 22:22 09:09 08:15'
matches = [m.group(0) for m in re.finditer(r'(?P<hh>\\d{2}):(?P=hh)', text)]
# → ['11:11', '22:22', '09:09']`,
        hint: "Capture the hour with (?<hh>\\d{2}), match ':', then use \\k<hh> for the minute."
    },
    {
        id: 'ng-5',
        level: 9,
        title: 'Matching paired HTML tags',
        instruction: "Match each HTML element — opening tag, content, and matching closing tag — as one unit.",
        testString: '<b>bold</b> and <i>italic</i>',
        solution: '<(?<tag>[a-z]+)>.*?</\\k<tag>>',
        explanation: "<(?<tag>[a-z]+)> matches an opening tag and captures the tag name. .*? lazily matches the content inside. </\\k<tag>> matches a closing tag containing the exact same tag name. This ensures <b> is paired with </b>, not </i>.",
        python: `import re

text = '<b>bold</b> and <i>italic</i>'
matches = [m.group(0) for m in re.finditer(r'<(?P<tag>[a-z]+)>.*?</(?P=tag)>', text)]
# → ['<b>bold</b>', '<i>italic</i>']`,
        hint: "Capture the tag name in (?<tag>[a-z]+), use .*? for content, then \\k<tag> in the closing tag."
    },
    {
        id: 'ng-cons',
        level: 9,
        title: 'Named groups: repeated words',
        instruction: "Match any word that appears twice in a row, separated by a space, using a named group called 'word'.",
        testString: 'the the cat cat sat once',
        solution: '(?<word>\\w+) \\k<word>',
        explanation: "This is the named-group version of the back-reference challenge from Level 7. (?<word>\\w+) captures any word, then \\k<word> requires the same word to follow after a space. The name 'word' makes the intent immediately clear.",
        python: `import re

text = 'the the cat cat sat once'
matches = [m.group(0) for m in re.finditer(r'(?P<word>\\w+) (?P=word)', text)]
# → ['the the', 'cat cat']`,
        hint: "Use (?<word>\\w+) to capture the first word, then \\k<word> after the space."
    },
    {
        id: 'ng-6',
        level: 9,
        title: 'Named group with optional part',
        instruction: "Match each version string — a required major number with an optional '.minor' suffix.",
        testString: 'v3 v1.2 v10 v2.5',
        solution: 'v(?<major>\\d+)(?:\\.(?<minor>\\d+))?',
        explanation: "Named groups and optional groups combine freely. '(?<major>\\d+)' captures the required major version. '(?:\\.(?<minor>\\d+))?' wraps the entire '.minor' portion in a non-capturing group made optional with '?'. 'v3' matches without a minor, 'v1.2' matches with one.",
        python: `import re

text = 'v3 v1.2 v10 v2.5'
for m in re.finditer(r'v(?P<major>\\d+)(?:\\.(?P<minor>\\d+))?', text):
    print(m.group(0), '→ major:', m.group('major'), 'minor:', m.group('minor'))
# → v3 → major: 3 minor: None
# → v1.2 → major: 1 minor: 2
# → v10 → major: 10 minor: None
# → v2.5 → major: 2 minor: 5`,
        hint: "Capture major with (?<major>\\d+), then wrap the dot and minor digits in (?:...)?."
    },
    {
        id: 'ng-7',
        level: 9,
        title: 'Named group with alternation',
        instruction: "Match each CSS measurement — a number followed by a unit (px, em, %, or rem).",
        testString: '10px 2em 100% 5rem',
        solution: '(?<value>\\d+)(?<unit>px|em|%|rem)',
        explanation: "Named groups can contain alternation. '(?<unit>px|em|%|rem)' captures whichever unit matches and gives it the name 'unit'. Alternation inside a named group works exactly like alternation elsewhere — the first matching option wins. The captured name makes the intent self-documenting.",
        python: `import re

text = '10px 2em 100% 5rem'
for m in re.finditer(r'(?P<value>\\d+)(?P<unit>px|em|%|rem)', text):
    print(m.group('value'), m.group('unit'))
# → 10 px
# → 2 em
# → 100 %
# → 5 rem`,
        hint: "Capture the number in (?<value>\\d+) and the unit choices in (?<unit>px|em|%|rem)."
    },

    // ─── Level 10: Lookaheads ──────────────────────────────────────────────────

    {
        id: 'la-1',
        level: 10,
        title: 'Positive lookahead',
        instruction: "Match each word that is immediately followed by a colon.",
        testString: 'name: Alice age: 30 city Paris',
        solution: '\\w+(?=:)',
        explanation: "(?=...) is a positive lookahead — it asserts that the pattern inside must follow the current position, but does not consume any characters. \\w+(?=:) matches a word only when ':' comes right after. 'city' and 'Alice' are not followed by ':' and are skipped.",
        python: `import re

text = 'name: Alice age: 30 city Paris'
matches = re.findall(r'\\w+(?=:)', text)
# → ['name', 'age']`,
        hint: "Add (?=:) at the end of \\w+ — a zero-width assertion that colon follows."
    },
    {
        id: 'la-2',
        level: 10,
        title: 'Negative lookahead',
        instruction: "Match 'log' only when it is NOT immediately followed by 'in'.",
        testString: 'login logout log logfile',
        solution: 'log(?!in)',
        explanation: "(?!...) is a negative lookahead — it asserts that the pattern must NOT follow. 'log(?!in)' skips 'login' (because 'in' follows), and matches 'log' inside 'logout', the standalone 'log', and 'log' inside 'logfile'. The lookahead does not consume 'in'.",
        python: `import re

text = 'login logout log logfile'
matches = re.findall(r'log(?!in)', text)
# → ['log', 'log', 'log']`,
        hint: "Add (?!in) after 'log' — a zero-width assertion that 'in' does NOT follow."
    },
    {
        id: 'la-3',
        level: 10,
        title: 'Positive lookbehind',
        instruction: "Match each number that is immediately preceded by a dollar sign.",
        testString: 'Price: $100, discount $20, fee 5, total $125',
        solution: '(?<=\\$)\\d+',
        explanation: "(?<=...) is a positive lookbehind — it asserts that the pattern inside must immediately precede the current position. (?<=\\$)\\d+ matches digits only where a literal '$' comes just before. The standalone '5' (preceded by a space) is skipped.",
        python: `import re

text = 'Price: $100, discount $20, fee 5, total $125'
matches = re.findall(r'(?<=\\$)\\d+', text)
# → ['100', '20', '125']`,
        hint: "Add (?<=\\$) before \\d+ — a zero-width assertion that '$' precedes the match."
    },
    {
        id: 'la-4',
        level: 10,
        title: 'Negative lookbehind',
        instruction: "Match each number NOT immediately preceded by a dollar sign.",
        testString: 'Items: 3, price $5, qty 7, tax $2',
        solution: '(?<!\\$)\\d+',
        explanation: "(?<!...) is a negative lookbehind — it asserts that the pattern must NOT immediately precede. (?<!\\$)\\d+ matches digits only where '$' does not come just before. The amounts '$5' and '$2' are skipped; '3' and '7' match.",
        python: `import re

text = 'Items: 3, price $5, qty 7, tax $2'
matches = re.findall(r'(?<!\\$)\\d+', text)
# → ['3', '7']`,
        hint: "Add (?<!\\$) before \\d+ — a zero-width assertion that '$' does NOT precede."
    },
    {
        id: 'la-5',
        level: 10,
        title: 'Lookahead and lookbehind together',
        instruction: "Match the content inside parentheses — the text itself, not the parentheses.",
        testString: 'func(arg1) and call(value) and foo(x)',
        solution: '(?<=\\()\\w+(?=\\))',
        explanation: "Combining both: (?<=\\() is a positive lookbehind for '(' and (?=\\)) is a positive lookahead for ')'. Together they assert the match is surrounded by parentheses, but neither the '(' nor ')' is included in the match — only the inner content.",
        python: `import re

text = 'func(arg1) and call(value) and foo(x)'
matches = re.findall(r'(?<=\\()\\w+(?=\\))', text)
# → ['arg1', 'value', 'x']`,
        hint: "Use (?<=\\() as a lookbehind and (?=\\)) as a lookahead around \\w+."
    },
    {
        id: 'la-6',
        level: 10,
        title: 'Extracting attribute values',
        instruction: "Match the value inside each HTML attribute's double quotes (the text, not the quotes).",
        testString: 'class="hero" id="main" type="header"',
        solution: '(?<==")[^"]+(?=")',
        explanation: '(?<==") is a lookbehind for the two-character sequence =" — the equals sign followed by the opening double-quote. (?=") is a lookahead for the closing double-quote. [^"]+ matches any characters that are not a double-quote. Together they extract just the attribute value.',
        python: `import re

text = 'class="hero" id="main" type="header"'
matches = re.findall(r'(?<==")[^"]+(?=")', text)
# → ['hero', 'main', 'header']`,
        hint: 'Use (?<==") as a lookbehind (equals-then-double-quote), [^"]+ for content, and (?=") as a lookahead.'
    },
    {
        id: 'la-cons',
        level: 10,
        title: 'Combining lookahead and lookbehind',
        instruction: "Match each number that is both preceded by '#' and followed by '-'.",
        testString: '#101-A #202 #303-B 404-C',
        solution: '(?<=#)\\d+(?=-)',
        explanation: "(?<=#) asserts '#' immediately precedes, and (?=-) asserts '-' immediately follows. Both must be true simultaneously. '#101-A' matches because 101 is between # and -. '#202' fails (no '-' after). '404-C' fails (no '#' before). Only the content between the markers is returned.",
        python: `import re

text = '#101-A #202 #303-B 404-C'
matches = re.findall(r'(?<=#)\\d+(?=-)', text)
# → ['101', '303']`,
        hint: "Use (?<=#) as lookbehind and (?=-) as lookahead around \\d+."
    },
    {
        id: 'la-8',
        level: 10,
        title: 'Lookahead with alternation',
        instruction: "Match the numeric part of a CSS value, but only when followed by 'px' or 'em'.",
        testString: 'width: 10px height: 5em opacity: 0.5',
        solution: '\\d+(?=px|em)',
        explanation: "A lookahead can contain alternation just like any other pattern. '(?=px|em)' asserts that either 'px' or 'em' immediately follows. The opacity value is not followed by a recognised unit so it is skipped. This combines two concepts — lookahead and alternation — into one practical pattern.",
        python: `import re

text = 'width: 10px height: 5em opacity: 0.5'
matches = re.findall(r'\\d+(?=px|em)', text)
# → ['10', '5']`,
        hint: "Use (?=px|em) as the lookahead — put both unit alternatives inside the lookahead group."
    },
    {
        id: 'la-9',
        level: 10,
        title: 'Lookbehind with a character class',
        instruction: "Match standalone numbers — those NOT immediately preceded by a lowercase letter.",
        testString: 'width 5 px3 height 8 em2',
        solution: '(?<![a-z])\\d+',
        explanation: "A lookbehind can use a character class inside its assertion. '(?<![a-z])\\d+' fails at '3' in 'px3' because 'x' (a lowercase letter) immediately precedes it, and at '2' in 'em2' for the same reason. '5' and '8' are preceded by spaces — not letters — so they match.",
        python: `import re

text = 'width 5 px3 height 8 em2'
matches = re.findall(r'(?<![a-z])\\d+', text)
# → ['5', '8']`,
        hint: "Use (?<![a-z]) as a lookbehind — a character class works inside the assertion brackets."
    },
    {
        id: 'la-10',
        level: 10,
        title: 'Lookahead and lookbehind as directional filters',
        instruction: "Match only the hyphen that sits between two digits — not hyphens between letters.",
        testString: '1-2 a-b 3-4 x-y',
        solution: '(?<=\\d)-(?=\\d)',
        explanation: "Lookahead looks forward, lookbehind looks backward — together they filter both sides of a match simultaneously. '(?<=\\d)' requires a digit before the hyphen; '(?=\\d)' requires a digit after. Neither assertion consumes characters, so the match itself is just the hyphen. 'a-b' and 'x-y' have no digits on either side and are skipped.",
        python: `import re

text = '1-2 a-b 3-4 x-y'
matches = re.findall(r'(?<=\\d)-(?=\\d)', text)
# → ['-', '-']`,
        hint: "Use (?<=\\d) as lookbehind and (?=\\d) as lookahead, with the literal '-' between them."
    },

];
