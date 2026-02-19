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
        testString: 'J.K. Rowling and R.R. Martin wrote famous books.',
        solution: '.\\.',
        explanation: "This combines both dot concepts: '.' (wildcard) matches the letter, and '\\.' (escaped) matches the literal period. Together they match any one character followed by a real period — capturing initials like J., K., R., R.",
        python: `import re

text = 'J.K. Rowling and R.R. Martin wrote famous books.'
matches = re.findall(r'.\.', text)
# → ['J.', 'K.', 'R.', 'R.']`,
        hint: "Use a plain dot for the letter, and \\. for the period."
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

];
