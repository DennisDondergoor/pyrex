/**
 * PyRex — main application controller
 */
const PyRex = (() => {
    'use strict';

    // ─── State ────────────────────────────────────────────────────────────────

    let currentLevel = null;
    let currentIndex = 0;   // -1 = concept intro screen, 0+ = challenges
    let levelChallenges = [];
    let hintVisible = false;
    let lastPattern = '';
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

    // Render concept text: double-newline-separated paragraphs, `backtick` → <code>
    function renderConceptText(text) {
        return text.trim().split(/\n\n+/).map(para => {
            const html = para.split('`').map((seg, i) => {
                const esc = seg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return i % 2 === 0 ? esc : `<code>${esc}</code>`;
            }).join('');
            return `<p>${html}</p>`;
        }).join('');
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
            const isCompleted = !comingSoon && done === total;
            card.className = 'level-card' + (comingSoon ? ' coming-soon' : '') + (isCompleted ? ' completed' : '');

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
                    <div class="level-progress-label">${isCompleted ? '✓ Completed' : `${done} / ${total} completed`}</div>
                `;
                card.addEventListener('click', () => startLevel(level.num));
            }

            grid.appendChild(card);
        });
    }

    // ─── Challenge ────────────────────────────────────────────────────────────

    function startLevel(levelNum) {
        currentLevel = levelNum;
        lastPattern = '';
        levelChallenges = CHALLENGES.filter(c => c.level === levelNum);
        const firstUnsolved = levelChallenges.findIndex(c => !progress[c.id] || !progress[c.id].solved);
        const hasProgress = levelChallenges.some(c => progress[c.id]);

        if (hasProgress) {
            // Return visit: skip intro, land on first unsolved (or last if all done)
            currentIndex = firstUnsolved === -1 ? levelChallenges.length - 1 : firstUnsolved;
        } else {
            // First visit: show concept intro
            currentIndex = -1;
        }
        showChallenge();
    }

    function showChallenge() {
        if (currentIndex === -1) {
            showConceptScreen();
            return;
        }

        const c = levelChallenges[currentIndex];
        const isSolved = !!(progress[c.id] && progress[c.id].solved);
        hintVisible = false;

        document.getElementById('level-tag').textContent = `Level ${currentLevel}`;
        document.getElementById('challenge-counter').textContent =
            `${currentIndex + 1} / ${levelChallenges.length}`;
        document.getElementById('challenge-title').textContent = c.title;

        // Prev arrow: show on challenge 0 too (goes back to concept screen)
        document.getElementById('btn-prev').style.display = currentIndex >= 0 ? '' : 'none';
        document.getElementById('btn-nav-next').style.display =
            currentIndex < levelChallenges.length - 1 ? '' : 'none';

        // Show challenge-specific elements; hide concept-screen elements
        document.getElementById('challenge-instruction').textContent = c.instruction;
        document.getElementById('challenge-instruction').style.display = '';
        document.getElementById('concept-box').style.display = 'none';
        document.getElementById('concept-actions').style.display = 'none';
        document.getElementById('test-string-box').style.display = '';
        document.getElementById('match-count').style.display = '';
        document.getElementById('regex-input-row').style.display = '';

        const input = document.getElementById('regex-input');
        const inputRow = document.getElementById('regex-input-row');
        const matchCountEl = document.getElementById('match-count');
        const hintBox = document.getElementById('hint-box');

        inputRow.classList.remove('has-error');
        document.getElementById('input-error').style.display = 'none';
        hintBox.style.display = 'none';
        hintBox.textContent = c.hint || '';

        if (isSolved) {
            document.getElementById('test-string-box').innerHTML =
                renderHighlights(c.testString, c.solution, 'match-correct');
            input.value = c.solution;
            input.readOnly = true;

            const matches = getMatches(c.solution, c.testString);
            const word = matches && matches.length === 1 ? 'match' : 'matches';
            matchCountEl.textContent = matches ? `${matches.length} ${word}` : '';
            matchCountEl.className = 'match-count has-matches';

            document.getElementById('challenge-actions').style.display = 'none';
            document.getElementById('char-picker').style.display = 'none';
            document.getElementById('completed-banner').style.display = '';
        } else {
            document.getElementById('test-string-box').innerHTML = escapeHtml(c.testString);
            input.value = '';
            input.readOnly = false;
            matchCountEl.textContent = '';
            matchCountEl.className = 'match-count';

            document.getElementById('challenge-actions').style.display = '';
            document.getElementById('char-picker').style.display = '';
            document.getElementById('completed-banner').style.display = 'none';
        }

        showView('view-challenge');
        if (!isSolved) requestAnimationFrame(() => input.focus());
    }

    function showConceptScreen() {
        const levelObj = LEVELS.find(l => l.num === currentLevel);

        document.getElementById('level-tag').textContent = `Level ${currentLevel}`;
        document.getElementById('challenge-counter').textContent = 'Intro';
        document.getElementById('btn-prev').style.display = 'none';
        document.getElementById('btn-nav-next').style.display = 'none';

        document.getElementById('challenge-title').textContent = levelObj ? levelObj.title : '';
        document.getElementById('challenge-instruction').style.display = 'none';

        document.getElementById('concept-box').innerHTML = renderConceptText(LEVEL_CONCEPTS[currentLevel] || '');
        document.getElementById('concept-box').style.display = '';
        document.getElementById('concept-actions').style.display = '';

        document.getElementById('test-string-box').style.display = 'none';
        document.getElementById('match-count').style.display = 'none';
        document.getElementById('regex-input-row').style.display = 'none';
        document.getElementById('input-error').style.display = 'none';
        document.getElementById('char-picker').style.display = 'none';
        document.getElementById('hint-box').style.display = 'none';
        document.getElementById('challenge-actions').style.display = 'none';
        document.getElementById('completed-banner').style.display = 'none';

        showView('view-challenge');
    }

    function updateHighlight() {
        if (currentIndex === -1) return;
        const c = levelChallenges[currentIndex];
        if (progress[c.id] && progress[c.id].solved) return;
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
        if (currentIndex === -1) return;
        const c = levelChallenges[currentIndex];
        if (progress[c.id] && progress[c.id].solved) return;
        const pattern = document.getElementById('regex-input').value.trim();

        if (!pattern) {
            document.getElementById('regex-input').focus();
            return;
        }

        if (!isValidRegex(pattern)) return;

        lastPattern = pattern;
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

        const yourSection = document.getElementById('your-pattern-section');
        if (!correct) {
            document.getElementById('your-pattern-code').textContent = lastPattern;
            document.getElementById('your-test-box').innerHTML =
                renderHighlights(challenge.testString, lastPattern, 'match');
            yourSection.style.display = '';
        } else {
            yourSection.style.display = 'none';
        }

        document.getElementById('result-test-box').innerHTML =
            renderHighlights(challenge.testString, challenge.solution, 'match-correct');
        document.getElementById('correct-pattern-code').textContent = challenge.solution;

        document.getElementById('explanation-text').textContent = challenge.explanation;

        const isLast = currentIndex === levelChallenges.length - 1;
        document.getElementById('btn-next').textContent =
            isLast ? 'Back to Levels' : 'Next Challenge';

        const tryAgainBtn = document.getElementById('btn-try-again');
        const nextBtn = document.getElementById('btn-next');
        const backBtn = document.getElementById('btn-back-levels');
        if (correct) {
            tryAgainBtn.style.display = 'none';
            nextBtn.className = 'btn btn-primary';
            backBtn.style.display = 'none';
        } else {
            tryAgainBtn.style.display = '';
            nextBtn.className = 'btn btn-secondary';
            backBtn.style.display = 'none';
        }

        showView('view-result');
    }

    // ─── Event wiring ─────────────────────────────────────────────────────────

    function init() {
        // Header back button → home
        document.getElementById('btn-back').addEventListener('click', () => {
            renderHome();
            showView('view-home');
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', e => {
            const modal = document.getElementById('modal-reset');

            if (e.key === 'Tab' && !modal.classList.contains('hidden')) {
                const cancelBtn = document.getElementById('btn-reset-cancel');
                const confirmBtn = document.getElementById('btn-reset-confirm');
                if (e.shiftKey) {
                    if (document.activeElement === cancelBtn) { e.preventDefault(); confirmBtn.focus(); }
                } else {
                    if (document.activeElement === confirmBtn) { e.preventDefault(); cancelBtn.focus(); }
                }
                return;
            }

            if (e.key === 'Escape') {
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
                return;
            }

            if (e.key === 'ArrowLeft' && activeView === 'view-challenge') {
                if (document.activeElement !== document.getElementById('regex-input')) {
                    document.getElementById('btn-prev').click();
                }
                return;
            }

            if (e.key === 'ArrowRight' && activeView === 'view-challenge') {
                if (document.activeElement !== document.getElementById('regex-input')) {
                    document.getElementById('btn-nav-next').click();
                }
                return;
            }

            if (e.key === 'Enter') {
                if (activeView === 'view-result') {
                    const tryAgainBtn = document.getElementById('btn-try-again');
                    if (tryAgainBtn.style.display !== 'none') {
                        tryAgainBtn.click();
                    } else {
                        document.getElementById('btn-next').click();
                    }
                } else if (activeView === 'view-challenge') {
                    if (currentIndex === -1) {
                        // Concept screen — Enter starts the level
                        currentIndex = 0;
                        showChallenge();
                    } else if (document.activeElement !== document.getElementById('regex-input')) {
                        e.preventDefault();
                        submitAnswer();
                    }
                }
            }
        });

        // Challenge: live regex highlighting
        document.getElementById('regex-input').addEventListener('input', updateHighlight);
        document.getElementById('regex-input').addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.stopPropagation();
                submitAnswer();
            }
            if (e.key === 'ArrowLeft' && e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
                document.getElementById('btn-prev').click();
            }
            if (e.key === 'ArrowRight' && e.target.selectionStart === e.target.value.length && e.target.selectionEnd === e.target.value.length) {
                document.getElementById('btn-nav-next').click();
            }
        });

        // Challenge: submit
        document.getElementById('btn-submit').addEventListener('click', submitAnswer);

        // Character picker: prevent buttons from stealing focus from the input
        document.getElementById('char-picker').addEventListener('mousedown', e => {
            if (e.target.closest('.char-btn')) e.preventDefault();
        });

        // Character picker: insert at cursor
        document.getElementById('char-picker').addEventListener('click', e => {
            const btn = e.target.closest('.char-btn');
            if (!btn) return;
            const input = document.getElementById('regex-input');
            if (input.readOnly) return;
            const char = btn.dataset.char;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            input.value = input.value.slice(0, start) + char + input.value.slice(end);
            input.setSelectionRange(start + char.length, start + char.length);
            input.focus();
            updateHighlight();
        });

        // Challenge: hint toggle
        document.getElementById('btn-hint').addEventListener('click', () => {
            const hintBox = document.getElementById('hint-box');
            hintVisible = !hintVisible;
            hintBox.style.display = hintVisible ? '' : 'none';
        });

        // Concept screen: Start button
        document.getElementById('btn-start').addEventListener('click', () => {
            currentIndex = 0;
            showChallenge();
        });

        // Challenge: prev / next nav
        document.getElementById('btn-prev').addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; showChallenge(); }
            else if (currentIndex === 0) { currentIndex = -1; showChallenge(); }
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

        document.getElementById('btn-try-again').addEventListener('click', () => {
            showChallenge();
            const input = document.getElementById('regex-input');
            input.value = lastPattern;
            input.setSelectionRange(lastPattern.length, lastPattern.length);
            updateHighlight();
            requestAnimationFrame(() => input.focus());
        });

        document.getElementById('btn-back-levels').addEventListener('click', () => {
            renderHome();
            showView('view-home');
        });

        // Reset progress
        document.getElementById('btn-reset-progress').addEventListener('click', () => {
            document.getElementById('modal-reset').classList.remove('hidden');
            document.getElementById('btn-reset-cancel').focus();
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
