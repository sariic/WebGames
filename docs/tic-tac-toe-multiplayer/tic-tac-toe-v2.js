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

// Update Firebase Database
function updateDatabase() {
    const roomRef = ref(database, `rooms/${roomId}`);
    set(roomRef, {
        boardState: boardState,
        currentPlayer: currentPlayer
    });
}
