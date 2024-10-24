// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2V2ypChGe0mdJPItig9Cs_yJntXPTPCw",
    authDomain: "saric-tictactoe.firebaseapp.com",
    projectId: "saric-tictactoe",
    storageBucket: "saric-tictactoe.appspot.com",
    messagingSenderId: "335416732514",
    appId: "1:335416732514:web:6be26cc91d2cf43ed3da3b",
    measurementId: "G-23CJXDGKWW",
    databaseURL: "https://saric-tictactoe-default-rtdb.firebaseio.com"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let playerName = "";
let roomId = "";
let currentPlayer = "X";
let isRoomCreator = false;
let gameActive = false;
let boardState = ["", "", "", "", "", "", "", "", ""];

// DOM elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

// Setup player info
document.getElementById('create-room').addEventListener('click', createRoom);
document.getElementById('join-room').addEventListener('click', joinRoom);

// Create Room
function createRoom() {
    playerName = document.getElementById('player-name').value;
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }
    roomId = Math.random().toString(36).substr(2, 6); // Generate random room ID
    isRoomCreator = true;
    gameActive = true;
    updateDatabase();
    alert(`Room created! Share this Room ID with your friend: ${roomId}`);
    startGame();
}

// Join Room
function joinRoom() {
    playerName = document.getElementById('player-name').value;
    roomId = document.getElementById('room-id').value;
    if (playerName === "" || roomId === "") {
        alert("Please enter your name and room ID.");
        return;
    }
    firebase.database().ref(`rooms/${roomId}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            gameActive = true;
            startGame();
        } else {
            alert("Room not found!");
        }
    });
}

// Start the game
function startGame() {
    document.querySelector('.setup').style.display = 'none';
    board.style.display = 'grid';
    resetButton.style.display = 'block';

    // Listen for changes in the game state
    firebase.database().ref(`rooms/${roomId}`).on('value', (snapshot) => {
        const roomData = snapshot.val();
        if (roomData) {
            boardState = roomData.boardState;
            currentPlayer = roomData.currentPlayer;
            updateBoard();
            if (roomData.winner) {
                gameStatus.textContent = `${roomData.winner} Wins!`;
                gameActive = false;
            } else if (!roomData.boardState.includes("")) {
                gameStatus.textContent = "It's a Tie!";
                gameActive = false;
            } else {
                gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
            }
        }
    });
}

// Update Firebase Database
function updateDatabase() {
    firebase.database().ref(`rooms/${roomId}`).set({
        boardState: boardState,
        currentPlayer: currentPlayer
    });
}

// Handle Cell Click
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameActive && boardState[index] === "") {
            boardState[index] = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateDatabase();
        }
    });
});

// Update Board UI
function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = boardState[index];
    });
}

// Reset Game
resetButton.addEventListener('click', () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    updateDatabase();
    gameStatus.textContent = "";
});
