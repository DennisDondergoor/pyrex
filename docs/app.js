/**
 * PyRex — main application controller
 */
const PyRex = (() => {
    'use strict';

    // ─── State ────────────────────────────────────────────────────────────────

    let currentLevel = null;
    let currentIndex = 0;
    let levelChallenges = [];
    let hintVisible = false;
    let progress = loadProgress();
    let activeView = 'view-home';

    // ─── Level definitions ────────────────────────────────────────────────────

    const LEVELS = [
        { num: 1, title: 'Literal Matches' },
        { num: 2, title: 'The Dot' },
        { num: 3, title: 'Character Classes' },
        { num: 4, title: 'Quantifiers' },
        { num: 5, title: 'Anchors' },
        { num: 6, title: 'Shorthand Classes' },
        { num: 7, title: 'Groups' },
        { num: 8, title: 'Alternation' },
        { num: 9, title: 'Named Groups' },
        { num: 10, title: 'Lookaheads' },
    ];

    // ─── Storage ──────────────────────────────────────────────────────────────

    function loadProgress() {
        try {
            return JSON.parse(localStorage.getItem('pyrex_progress') || '{}');
        } catch (e) {
            return {};
        }
    }

    function saveProgress(id, solved) {
        const entry = progress[id] || { solved: false, attempts: 0 };
        entry.attempts += 1;
        if (solved) entry.solved = true;
        progress[id] = entry;
        localStorage.setItem('pyrex_progress', JSON.stringify(progress));
    }

    function clearProgress() {
        progress = {};
        localStorage.removeItem('pyrex_progress');
    }

    // ─── Regex utilities ──────────────────────────────────────────────────────

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function isValidRegex(pattern) {
        try { new RegExp(pattern); return true; }
        catch (e) { return false; }
    }

    function getMatches(pattern, text) {
        try {
            const regex = new RegExp(pattern, 'g');
            const matches = [];
            let match;
            let safety = 0;
            while ((match = regex.exec(text)) !== null) {
                matches.push({ value: match[0], index: match.index });
                if (match[0].length === 0) regex.lastIndex++;
                if (++safety > 500) break;
            }
            return matches;
        } catch (e) {
            return null;
        }
    }

    function isCorrect(userPattern, solutionPattern, text) {
        const userMatches = getMatches(userPattern, text);
        const solutionMatches = getMatches(solutionPattern, text);
        if (!userMatches || !solutionMatches) return false;
        if (userMatches.length !== solutionMatches.length) return false;
        return userMatches.every((m, i) =>
            m.value === solutionMatches[i].value &&
            m.index === solutionMatches[i].index
        );
    }

    // Render testString HTML with matched portions wrapped in <mark class="cssClass">
    function renderHighlights(text, pattern, cssClass) {
        const matches = pattern ? getMatches(pattern, text) : null;
        if (!matches || matches.length === 0) return escapeHtml(text);

        let html = '';
        let lastIndex = 0;
        for (const m of matches) {
            html += escapeHtml(text.slice(lastIndex, m.index));
            html += `<mark class="${cssClass}">${escapeHtml(m.value)}</mark>`;
            lastIndex = m.index + m.value.length;
        }
        html += escapeHtml(text.slice(lastIndex));
        return html;
    }

    // ─── View management ──────────────────────────────────────────────────────

    function showView(id) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        window.scrollTo(0, 0);
        activeView = id;

        const btnBack = document.getElementById('btn-back');
        btnBack.style.display = (id === 'view-home') ? 'none' : '';
    }

    // ─── Home ─────────────────────────────────────────────────────────────────

    function renderHome() {
        const grid = document.getElementById('level-grid');
        grid.innerHTML = '';

        LEVELS.forEach(level => {
            const challenges = CHALLENGES.filter(c => c.level === level.num);
            const total = challenges.length;
            const done = challenges.filter(c => progress[c.id] && progress[c.id].solved).length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const comingSoon = total === 0;

            const card = document.createElement('div');
            card.className = 'level-card' + (comingSoon ? ' coming-soon' : '');

            if (comingSoon) {
                card.innerHTML = `
                    <div class="level-number">Level ${level.num}</div>
                    <div class="level-title">${level.title}</div>
                    <div class="coming-soon-label">Coming soon</div>
                `;
            } else {
                card.innerHTML = `
                    <div class="level-number">Level ${level.num}</div>
                    <div class="level-title">${level.title}</div>
                    <div class="level-progress-bar">
                        <div class="level-progress-fill" style="width:${pct}%"></div>
                    </div>
                    <div class="level-progress-label">${done} / ${total} completed</div>
                `;
                card.addEventListener('click', () => startLevel(level.num));
            }

            grid.appendChild(card);
        });
    }

    // ─── Challenge ────────────────────────────────────────────────────────────

    function startLevel(levelNum) {
        currentLevel = levelNum;
        currentIndex = 0;
        levelChallenges = CHALLENGES.filter(c => c.level === levelNum);
        showChallenge();
    }

    function showChallenge() {
        const c = levelChallenges[currentIndex];
        hintVisible = false;

        document.getElementById('level-tag').textContent = `Level ${currentLevel}`;
        document.getElementById('challenge-counter').textContent =
            `${currentIndex + 1} / ${levelChallenges.length}`;
        document.getElementById('challenge-title').textContent = c.title;
        document.getElementById('challenge-instruction').textContent = c.instruction;

        document.getElementById('test-string-box').innerHTML = escapeHtml(c.testString);
        document.getElementById('match-count').textContent = '';
        document.getElementById('match-count').className = 'match-count';

        const input = document.getElementById('regex-input');
        input.value = '';

        const inputRow = document.getElementById('regex-input-row');
        inputRow.classList.remove('has-error');

        document.getElementById('input-error').style.display = 'none';

        const hintBox = document.getElementById('hint-box');
        hintBox.style.display = 'none';
        hintBox.textContent = c.hint || '';

        // Prev / next nav arrows
        document.getElementById('btn-prev').style.display =
            currentIndex > 0 ? '' : 'none';
        document.getElementById('btn-nav-next').style.display =
            currentIndex < levelChallenges.length - 1 ? '' : 'none';

        showView('view-challenge');
        input.focus();
    }

    function updateHighlight() {
        const c = levelChallenges[currentIndex];
        const pattern = document.getElementById('regex-input').value;
        const testBox = document.getElementById('test-string-box');
        const matchCountEl = document.getElementById('match-count');
        const inputRow = document.getElementById('regex-input-row');
        const errorEl = document.getElementById('input-error');

        if (!pattern) {
            testBox.innerHTML = escapeHtml(c.testString);
            matchCountEl.textContent = '';
            matchCountEl.className = 'match-count';
            inputRow.classList.remove('has-error');
            errorEl.style.display = 'none';
            return;
        }

        if (!isValidRegex(pattern)) {
            testBox.innerHTML = escapeHtml(c.testString);
            matchCountEl.textContent = '';
            matchCountEl.className = 'match-count';
            inputRow.classList.add('has-error');
            errorEl.style.display = '';
            return;
        }

        inputRow.classList.remove('has-error');
        errorEl.style.display = 'none';

        const matches = getMatches(pattern, c.testString);
        testBox.innerHTML = renderHighlights(c.testString, pattern, 'match');

        if (matches.length === 0) {
            matchCountEl.textContent = 'No matches';
            matchCountEl.className = 'match-count';
        } else {
            const word = matches.length === 1 ? 'match' : 'matches';
            matchCountEl.textContent = `${matches.length} ${word}`;
            matchCountEl.className = 'match-count has-matches';
        }
    }

    function submitAnswer() {
        const c = levelChallenges[currentIndex];
        const pattern = document.getElementById('regex-input').value.trim();

        if (!pattern) {
            document.getElementById('regex-input').focus();
            return;
        }

        if (!isValidRegex(pattern)) return;

        const correct = isCorrect(pattern, c.solution, c.testString);
        saveProgress(c.id, correct);
        showResult(correct, c);
    }

    // ─── Result ───────────────────────────────────────────────────────────────

    function showResult(correct, challenge) {
        const banner = document.getElementById('result-banner');
        document.getElementById('result-icon').textContent = correct ? '✓' : '✗';
        document.getElementById('result-text').textContent = correct ? 'Correct!' : 'Not quite.';
        banner.className = 'result-banner ' + (correct ? 'correct' : 'incorrect');

        // Show test string with the correct solution highlighted
        document.getElementById('result-test-box').innerHTML =
            renderHighlights(challenge.testString, challenge.solution, 'match-correct');

        // Show correct pattern only when wrong
        const correctBox = document.getElementById('correct-pattern-box');
        if (correct) {
            correctBox.style.display = 'none';
        } else {
            correctBox.style.display = '';
            document.getElementById('correct-pattern-code').textContent =
                `/${challenge.solution}/g`;
        }

        document.getElementById('explanation-text').textContent = challenge.explanation;
        document.getElementById('python-code').textContent = challenge.python;

        const isLast = currentIndex === levelChallenges.length - 1;
        document.getElementById('btn-next').textContent =
            isLast ? 'Back to Levels' : 'Next Challenge';

        showView('view-result');
    }

    // ─── Event wiring ─────────────────────────────────────────────────────────

    function init() {
        // Header back button → home
        document.getElementById('btn-back').addEventListener('click', () => {
            renderHome();
            showView('view-home');
        });

        // Global: Escape goes back one level
        document.addEventListener('keydown', e => {
            if (e.key !== 'Escape') return;
            const modal = document.getElementById('modal-reset');
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                return;
            }
            if (activeView === 'view-challenge') {
                renderHome();
                showView('view-home');
            } else if (activeView === 'view-result') {
                showChallenge();
            }
        });

        // Challenge: live regex highlighting
        document.getElementById('regex-input').addEventListener('input', updateHighlight);
        document.getElementById('regex-input').addEventListener('keydown', e => {
            if (e.key === 'Enter') submitAnswer();
        });

        // Challenge: submit
        document.getElementById('btn-submit').addEventListener('click', submitAnswer);

        // Challenge: hint toggle
        document.getElementById('btn-hint').addEventListener('click', () => {
            const hintBox = document.getElementById('hint-box');
            hintVisible = !hintVisible;
            hintBox.style.display = hintVisible ? '' : 'none';
        });

        // Challenge: prev / next nav
        document.getElementById('btn-prev').addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; showChallenge(); }
        });
        document.getElementById('btn-nav-next').addEventListener('click', () => {
            if (currentIndex < levelChallenges.length - 1) { currentIndex++; showChallenge(); }
        });

        // Result: next challenge or back to levels
        document.getElementById('btn-next').addEventListener('click', () => {
            if (currentIndex < levelChallenges.length - 1) {
                currentIndex++;
                showChallenge();
            } else {
                renderHome();
                showView('view-home');
            }
        });

        document.getElementById('btn-back-levels').addEventListener('click', () => {
            renderHome();
            showView('view-home');
        });

        // Reset progress
        document.getElementById('btn-reset-progress').addEventListener('click', () => {
            document.getElementById('modal-reset').classList.remove('hidden');
        });
        document.getElementById('btn-reset-cancel').addEventListener('click', () => {
            document.getElementById('modal-reset').classList.add('hidden');
        });
        document.getElementById('btn-reset-confirm').addEventListener('click', () => {
            clearProgress();
            document.getElementById('modal-reset').classList.add('hidden');
            renderHome();
        });

        // Initial render
        renderHome();
        showView('view-home');
    }

    document.addEventListener('DOMContentLoaded', init);

    return {};
})();
