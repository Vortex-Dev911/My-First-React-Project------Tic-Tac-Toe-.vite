// ============== GLOBAL STATE ==============
let currentUser = null;
let users = JSON.parse(localStorage.getItem('gameHubUsers')) || {};
let onlinePlayers = JSON.parse(localStorage.getItem('onlinePlayers')) || [];
let friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || {};
let friends = JSON.parse(localStorage.getItem('friends')) || {};
let challenges = JSON.parse(localStorage.getItem('challenges')) || {};
let userStats = JSON.parse(localStorage.getItem('userStats')) || {};
let gameState = {};
let currentGameId = null;
let scores = { player1: 0, player2: 0 };
let currentFilter = 'all';

// ============== EXTENSIVE GAMES DATABASE ==============
const gamesDatabase = [
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: '⭕', desc: 'Classic 3x3 strategy', category: '2-player', hot: true },
    { id: 'connect4', name: 'Connect 4', icon: '🔴', desc: 'Connect four in a row', category: '2-player', hot: true },
    { id: 'chess', name: 'Chess', icon: '♟️', desc: 'Ultimate strategy game', category: 'strategy' },
    { id: 'checkers', name: 'Checkers', icon: '⚫', desc: 'Classic board game', category: 'strategy' },
    { id: 'dots', name: 'Dots & Boxes', icon: '📍', desc: 'Complete boxes to win', category: '2-player' },
    { id: 'battleship', name: 'Battleship', icon: '🚢', desc: 'Sink enemy ships', category: 'strategy' },
    { id: 'snake', name: 'Snake Battle', icon: '🐍', desc: 'Last snake standing', category: 'action', hot: true },
    { id: 'pong', name: 'Pong', icon: '🏓', desc: 'Classic paddle game', category: 'action' },
    { id: 'racing', name: 'Speed Racing', icon: '🏎️', desc: 'Race to the finish', category: 'action' },
    { id: 'tanks', name: 'Tank Battle', icon: '🚗', desc: 'Destroy enemy tanks', category: 'action' },
    { id: 'memory', name: 'Memory Match', icon: '🎴', desc: 'Find matching pairs', category: 'puzzle' },
    { id: 'wordguess', name: 'Word Guess', icon: '📝', desc: 'Guess the word', category: 'puzzle' },
    { id: 'trivia', name: 'Trivia Quiz', icon: '🧠', desc: 'Test your knowledge', category: 'puzzle', new: true },
    { id: 'mathrace', name: 'Math Challenge', icon: '🔢', desc: 'Solve problems fast', category: 'puzzle' },
    { id: 'poker', name: 'Poker', icon: '🃏', desc: 'Texas Hold\'em', category: 'cards' },
    { id: 'blackjack', name: 'Blackjack', icon: '🎰', desc: 'Beat the dealer', category: 'cards' },
    { id: 'uno', name: 'UNO', icon: '🎨', desc: 'Match colors & numbers', category: 'cards', hot: true },
    { id: 'rummy', name: 'Rummy', icon: '🎴', desc: 'Form sets and runs', category: 'cards' },
    { id: 'sudoku', name: 'Sudoku', icon: '🔢', desc: 'Number puzzle', category: 'puzzle', new: true },
    { id: 'crossword', name: 'Crossword', icon: '📰', desc: 'Word puzzle game', category: 'puzzle' },
    { id: 'reversi', name: 'Reversi', icon: '⚪', desc: 'Flip to win', category: 'strategy' },
    { id: 'gomoku', name: 'Gomoku', icon: '⚫', desc: 'Five in a row', category: 'strategy' },
    { id: 'minesweeper', name: 'Minesweeper', icon: '💣', desc: 'Avoid the mines', category: 'puzzle' },
    { id: 'mahjong', name: 'Mahjong', icon: '🀄', desc: 'Match tiles', category: 'puzzle' },
    { id: 'solitaire', name: 'Solitaire', icon: '🂡', desc: 'Classic card game', category: 'cards' },
    { id: 'freecell', name: 'FreeCell', icon: '🃑', desc: 'Strategic solitaire', category: 'cards' },
    { id: 'spades', name: 'Spades', icon: '♠️', desc: 'Trump card game', category: 'cards' },
    { id: 'hearts', name: 'Hearts', icon: '♥️', desc: 'Avoid hearts', category: 'cards' },
    { id: 'pool', name: '8-Ball Pool', icon: '🎱', desc: 'Pocket the balls', category: 'action', new: true },
    { id: 'darts', name: 'Darts', icon: '🎯', desc: 'Hit the bullseye', category: 'action' }
];

// ============== ACHIEVEMENTS DATABASE ==============
const achievementsDatabase = [
    { id: 'first_win', name: 'First Victory', icon: '🏆', desc: 'Win your first game', requirement: 1 },
    { id: 'win_streak_5', name: 'Hot Streak', icon: '🔥', desc: 'Win 5 games in a row', requirement: 5 },
    { id: 'friend_maker', name: 'Friend Maker', icon: '🤝', desc: 'Add 10 friends', requirement: 10 },
    { id: 'challenger', name: 'The Challenger', icon: '⚔️', desc: 'Send 20 challenges', requirement: 20 },
    { id: 'game_master', name: 'Game Master', icon: '🎮', desc: 'Play 10 different games', requirement: 10 },
    { id: 'unstoppable', name: 'Unstoppable', icon: '💪', desc: 'Win 50 games', requirement: 50 },
    { id: 'social_butterfly', name: 'Social Butterfly', icon: '🦋', desc: 'Challenge 15 different players', requirement: 15 },
    { id: 'perfectionist', name: 'Perfectionist', icon: '⭐', desc: 'Win a game without losing a round', requirement: 1 }
];

// ============== SCREEN NAVIGATION ==============
function showWelcomeScreen() {
    document.getElementById('welcomeScreen').style.display = 'flex';
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('signupScreen').style.display = 'none';
}

function showLoginScreen() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('signupScreen').style.display = 'none';
}

function showSignupScreen() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('signupScreen').style.display = 'flex';
}

// ============== ENHANCED AUTHENTICATION ==============
function checkUsername() {
    const username = document.getElementById('signupUsername').value.trim();
    const checkDiv = document.getElementById('usernameCheck');
    
    if (username.length === 0) {
        checkDiv.textContent = '';
        validateSignupForm();
        return;
    }
    
    if (username.length < 3) {
        checkDiv.style.color = '#e74c3c';
        checkDiv.textContent = '❌ Username must be at least 3 characters';
        validateSignupForm();
        return;
    }
    
    if (users[username]) {
        checkDiv.style.color = '#e74c3c';
        checkDiv.textContent = '❌ Username already taken';
    } else {
        checkDiv.style.color = '#2ecc71';
        checkDiv.textContent = '✓ Username available';
    }
    validateSignupForm();
}

function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (password.length === 0) {
        strengthBar.className = 'password-strength-bar';
        strengthText.textContent = '';
        validateSignupForm();
        return;
    }
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) {
        strengthBar.className = 'password-strength-bar weak';
        strengthText.style.color = '#e74c3c';
        strengthText.textContent = 'Weak password';
    } else if (strength <= 3) {
        strengthBar.className = 'password-strength-bar medium';
        strengthText.style.color = '#f39c12';
        strengthText.textContent = 'Medium password';
    } else {
        strengthBar.className = 'password-strength-bar strong';
        strengthText.style.color = '#2ecc71';
        strengthText.textContent = 'Strong password';
    }
    
    validateSignupForm();
}

function checkPasswordMatch() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const matchDiv = document.getElementById('passwordMatch');
    
    if (confirmPassword.length === 0) {
        matchDiv.textContent = '';
        validateSignupForm();
        return;
    }
    
    if (password === confirmPassword) {
        matchDiv.className = 'password-match match';
        matchDiv.textContent = '✓ Passwords match';
    } else {
        matchDiv.className = 'password-match nomatch';
        matchDiv.textContent = '✗ Passwords do not match';
    }
    
    validateSignupForm();
}

function validateSignupForm() {
    const realName = document.getElementById('signupRealName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const signupBtn = document.getElementById('signupBtn');
    
    const isValid = 
        realName.length >= 2 &&
        username.length >= 3 &&
        !users[username] &&
        email.includes('@') &&
        password.length >= 6 &&
        password === confirmPassword;
    
    signupBtn.disabled = !isValid;
}

function signup() {
    const realName = document.getElementById('signupRealName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    users[username] = {
        realName: realName,
        username: username,
        email: email,
        password: password,
        createdAt: Date.now(),
        level: 1,
        xp: 0
    };
    
    friendRequests[username] = { received: [], sent: [] };
    friends[username] = [];
    challenges[username] = { received: [], sent: [] };
    userStats[username] = {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winStreak: 0,
        achievements: [],
        gamesPlayedList: [],
        challengesSent: 0
    };
    
    saveData();
    showNotification('Account created successfully! Please login.', 'success');
    showLoginScreen();
    
    document.getElementById('signupRealName').value = '';
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';
}

function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showNotification('Please enter username and password', 'error');
        return;
    }
    
    const user = Object.values(users).find(u => 
        (u.username === username || u.email === username) && u.password === password
    );
    
    if (!user) {
        showNotification('Invalid username/email or password', 'error');
        return;
    }
    
    currentUser = user.username;
    localStorage.setItem('currentUser', currentUser);
    
    if (!onlinePlayers.includes(currentUser)) {
        onlinePlayers.push(currentUser);
        localStorage.setItem('onlinePlayers', JSON.stringify(onlinePlayers));
    }
    
    showNotification('Welcome back, ' + currentUser + '! 🎮', 'success');
    showApp();
}

function logout() {
    onlinePlayers = onlinePlayers.filter(p => p !== currentUser);
    localStorage.setItem('onlinePlayers', JSON.stringify(onlinePlayers));
    localStorage.removeItem('currentUser');
    
    currentUser = null;
    document.getElementById('appScreen').style.display = 'none';
    showWelcomeScreen();
    showNotification('Logged out successfully', 'info');
}

function showApp() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('signupScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    
    const user = users[currentUser];
    document.getElementById('userName').textContent = user.realName || currentUser;
    document.getElementById('userAvatar').textContent = (user.realName || currentUser).charAt(0).toUpperCase();
    document.getElementById('userLevel').textContent = `Level ${user.level || 1}`;
    
    loadGames();
    loadOnlinePlayers();
    loadFriends();
    loadChallenges();
    loadLeaderboard();
    loadAchievements();
}

function saveData() {
    localStorage.setItem('gameHubUsers', JSON.stringify(users));
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
    localStorage.setItem('friends', JSON.stringify(friends));
    localStorage.setItem('challenges', JSON.stringify(challenges));
    localStorage.setItem('userStats', JSON.stringify(userStats));
}

// ============== PAGE NAVIGATION ==============
function showPage(pageName) {
    document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
    document.getElementById(pageName + '-page').style.display = 'block';
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    
    if (pageName === 'online') loadOnlinePlayers();
    if (pageName === 'friends') loadFriends();
    if (pageName === 'challenges') loadChallenges();
    if (pageName === 'leaderboard') loadLeaderboard();
    if (pageName === 'achievements') loadAchievements();
    if (pageName === 'admin') loadAdminPanel();
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash === 'admin-view' && currentUser) {
        showPage('admin');
    }
});

// ============== GAMES ==============
function loadGames() {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = '';
    
    let filteredGames = gamesDatabase;
    if (currentFilter !== 'all') {
        filteredGames = gamesDatabase.filter(g => g.category === currentFilter);
    }
    
    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.category = game.category;
        card.onclick = () => startGame(game.id, game.name);
        
        let badge = '';
        if (game.hot) badge = '<span class="game-badge hot">HOT</span>';
        else if (game.new) badge = '<span class="game-badge new">NEW</span>';
        else badge = `<span class="game-badge">${game.category}</span>`;
        
        card.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3>${game.name}</h3>
            <p>${game.desc}</p>
            ${badge}
            <div class="game-players">🎮 ${Math.floor(Math.random() * 1000) + 100} playing</div>
        `;
        grid.appendChild(card);
    });
}

function filterGames(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadGames();
}

function searchGames() {
    const search = document.getElementById('searchGames').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(search) ? 'block' : 'none';
    });
}

function startGame(gameId, gameName) {
    currentGameId = gameId;
    document.getElementById('currentGameTitle').textContent = gameName;
    document.getElementById('p1Name').textContent = currentUser;
    document.getElementById('p2Name').textContent = 'Bot';
    scores = { player1: 0, player2: 0 };
    updateGameScores();
    
    if (!userStats[currentUser].gamesPlayedList.includes(gameId)) {
        userStats[currentUser].gamesPlayedList.push(gameId);
    }
    userStats[currentUser].gamesPlayed++;
    saveData();
    
    checkAchievements();
    
    showPage('gameplay');
    document.getElementById('gameplay-page').style.display = 'block';
    initializeGame(gameId);
}

function initializeGame(gameId) {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    
    switch(gameId) {
        case 'tictactoe': initTicTacToe(); break;
        case 'connect4': initConnect4(); break;
        default: initPlaceholder(gameId);
    }
}

function initPlaceholder(gameId) {
    const game = gamesDatabase.find(g => g.id === gameId);
    setGameStatus(`${game.name} - Ready to play!`);
    document.getElementById('gameArea').innerHTML = `
        <div style="text-align:center;padding:60px;font-size:2.5em;">
            ${game.icon}<br><br>
            <div style="font-size:0.6em;color:#666;">${game.name} board will appear here</div>
            <div style="font-size:0.4em;color:#999;margin-top:20px;">Full game coming soon!</div>
        </div>
    `;
}

function exitGame() {
    showPage('games');
    document.getElementById('games-page').style.display = 'block';
}

function newRound() {
    initializeGame(currentGameId);
}

function resetGameScores() {
    scores = { player1: 0, player2: 0 };
    updateGameScores();
}

function updateGameScores() {
    document.getElementById('p1Score').textContent = scores.player1;
    document.getElementById('p2Score').textContent = scores.player2;
}

function setGameStatus(message) {
    document.getElementById('gameStatus').textContent = message;
}

function recordWin(winner) {
    if (winner === 'player1') {
        userStats[currentUser].wins++;
        userStats[currentUser].winStreak++;
    } else {
        userStats[currentUser].losses++;
        userStats[currentUser].winStreak = 0;
    }
    
    users[currentUser].xp = (users[currentUser].xp || 0) + (winner === 'player1' ? 10 : 5);
    const newLevel = Math.floor(users[currentUser].xp / 100) + 1;
    if (newLevel > (users[currentUser].level || 1)) {
        users[currentUser].level = newLevel;
        showNotification(`Level Up! You're now level ${newLevel}! 🎉`, 'success');
    }
    
    saveData();
    checkAchievements();
}

// ============== TIC TAC TOE ==============
function initTicTacToe() {
    gameState = {
        board: Array(9).fill(''),
        currentPlayer: 'X',
        gameOver: false
    };
    
    const board = document.createElement('div');
    board.className = 'ttt-board';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'ttt-cell';
        cell.onclick = () => tttMove(i);
        board.appendChild(cell);
    }
    
    document.getElementById('gameArea').appendChild(board);
    setGameStatus('Your turn (X)');
}

function tttMove(index) {
    if (gameState.gameOver || gameState.board[index]) return;
    
    gameState.board[index] = gameState.currentPlayer;
    updateTTTBoard();
    
    if (checkTTTWin()) {
        gameState.gameOver = true;
        const winner = gameState.currentPlayer === 'X' ? 'player1' : 'player2';
        scores[winner]++;
        updateGameScores();
        recordWin(winner);
        setGameStatus(`${gameState.currentPlayer} wins! 🎉`);
        return;
    }
    
    if (gameState.board.every(cell => cell !== '')) {
        gameState.gameOver = true;
        userStats[currentUser].draws++;
        saveData();
        setGameStatus('Draw!');
        return;
    }
    
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    setGameStatus(`${gameState.currentPlayer}'s turn`);
    
    if (gameState.currentPlayer === 'O') {
        setTimeout(() => {
            const move = getBotMove();
            if (move !== -1) tttMove(move);
        }, 500);
    }
}

function updateTTTBoard() {
    const cells = document.querySelectorAll('.ttt-cell');
    cells.forEach((cell, i) => {
        cell.textContent = gameState.board[i];
    });
}