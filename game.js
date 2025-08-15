// Rion's Dinosaur Puzzle - Real Jigsaw Game
class RionsPuzzle {
    constructor() {
        this.currentPuzzle = 1;
        this.piecesPlaced = 0;
        this.totalPieces = 0;
        this.isPaused = false;
        this.puzzleData = null;
        this.pieces = [];
        this.slots = [];
        this.draggedPiece = null;
        this.snapDistance = 40; // Distance for pieces to snap together
        this.audioContext = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAudio();
        this.loadPuzzle(this.currentPuzzle);
    }

    initAudio() {
        // Create audio context for sound effects
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    setupEventListeners() {
        // Welcome screen
        document.getElementById('start-game').addEventListener('click', () => {
            this.showScreen('game-screen');
            this.playSound('click-sound');
            this.createBalloons();
        });

        // Game controls
        document.getElementById('pause-game').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('hint-button').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('reset-puzzle').addEventListener('click', () => {
            this.resetPuzzle();
        });

        document.getElementById('next-puzzle').addEventListener('click', () => {
            this.nextPuzzle();
        });

        // Puzzle complete
        document.getElementById('continue-puzzling').addEventListener('click', () => {
            this.nextPuzzle();
        });

        // Game over
        document.getElementById('restart-puzzle').addEventListener('click', () => {
            this.resetPuzzle();
        });

        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });

        // Drag and drop events
        this.setupDragAndDrop();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    loadPuzzle(puzzleNumber) {
        this.currentPuzzle = puzzleNumber;
        this.piecesPlaced = 0;
        document.getElementById('current-level').textContent = puzzleNumber;
        
        // Clear previous puzzle
        this.clearPuzzle();
        
        // Create puzzle based on level
        this.createPuzzle(puzzleNumber);
        
        // Update display
        this.updatePieceCount();
    }

    clearPuzzle() {
        const board = document.getElementById('puzzle-board');
        const piecesArea = document.getElementById('pieces-area');
        
        board.innerHTML = '';
        piecesArea.innerHTML = '';
        
        this.pieces = [];
        this.slots = [];
    }

    createPuzzle(puzzleNumber) {
        const board = document.getElementById('puzzle-board');
        const piecesArea = document.getElementById('pieces-area');
        
        let puzzleConfig;
        
        switch(puzzleNumber) {
            case 1:
                puzzleConfig = this.createSimpleDinoPuzzle();
                break;
            case 2:
                puzzleConfig = this.createMediumDinoPuzzle();
                break;
            case 3:
                puzzleConfig = this.createComplexDinoPuzzle();
                break;
            case 4:
                puzzleConfig = this.createHabitatPuzzle();
                break;
            case 5:
                puzzleConfig = this.createAdvancedPuzzle();
                break;
            default:
                puzzleConfig = this.createAdvancedPuzzle(puzzleNumber);
        }
        
        this.puzzleData = puzzleConfig;
        this.totalPieces = puzzleConfig.pieces.length;
        
        // Create puzzle board with background image
        this.createPuzzleBoard(board, puzzleConfig);
        
        // Create puzzle pieces
        this.createPuzzlePieces(piecesArea, puzzleConfig);
        
        // Update display
        this.updatePieceCount();
    }

    createSimpleDinoPuzzle() {
        return {
            title: "🦕 Simple Dino",
            image: "🦕",
            grid: { rows: 2, cols: 2 },
            pieces: [
                { id: 1, row: 0, col: 0, x: 0, y: 0 },
                { id: 2, row: 0, col: 1, x: 80, y: 0 },
                { id: 3, row: 1, col: 0, x: 0, y: 80 },
                { id: 4, row: 1, col: 1, x: 80, y: 80 }
            ]
        };
    }

    createMediumDinoPuzzle() {
        return {
            title: "🦖 Medium Dino",
            image: "🦖",
            grid: { rows: 3, cols: 3 },
            pieces: [
                { id: 1, row: 0, col: 0, x: 0, y: 0 },
                { id: 2, row: 0, col: 1, x: 80, y: 0 },
                { id: 3, row: 0, col: 2, x: 160, y: 0 },
                { id: 4, row: 1, col: 0, x: 0, y: 80 },
                { id: 5, row: 1, col: 1, x: 80, y: 80 },
                { id: 6, row: 1, col: 2, x: 160, y: 80 },
                { id: 7, row: 2, col: 0, x: 0, y: 160 },
                { id: 8, row: 2, col: 1, x: 80, y: 160 },
                { id: 9, row: 2, col: 2, x: 160, y: 160 }
            ]
        };
    }

    createComplexDinoPuzzle() {
        return {
            title: "🦕🦖 Complex Dinos",
            image: "🦕🦖",
            grid: { rows: 4, cols: 4 },
            pieces: [
                { id: 1, row: 0, col: 0, x: 0, y: 0 },
                { id: 2, row: 0, col: 1, x: 80, y: 0 },
                { id: 3, row: 0, col: 2, x: 160, y: 0 },
                { id: 4, row: 0, col: 3, x: 240, y: 0 },
                { id: 5, row: 1, col: 0, x: 0, y: 80 },
                { id: 6, row: 1, col: 1, x: 80, y: 80 },
                { id: 7, row: 1, col: 2, x: 160, y: 80 },
                { id: 8, row: 1, col: 3, x: 240, y: 80 },
                { id: 9, row: 2, col: 0, x: 0, y: 160 },
                { id: 10, row: 2, col: 1, x: 80, y: 160 },
                { id: 11, row: 2, col: 2, x: 160, y: 160 },
                { id: 12, row: 2, col: 3, x: 240, y: 160 },
                { id: 13, row: 3, col: 0, x: 0, y: 240 },
                { id: 14, row: 3, col: 1, x: 80, y: 240 },
                { id: 15, row: 3, col: 2, x: 160, y: 240 },
                { id: 16, row: 3, col: 3, x: 240, y: 240 }
            ]
        };
    }

    createHabitatPuzzle() {
        return {
            title: "🏠 Dino Habitats",
            image: "🏠🦕🦖",
            grid: { rows: 3, cols: 3 },
            pieces: [
                { id: 1, row: 0, col: 0, x: 0, y: 0 },
                { id: 2, row: 0, col: 1, x: 80, y: 0 },
                { id: 3, row: 0, col: 2, x: 160, y: 0 },
                { id: 4, row: 1, col: 0, x: 0, y: 80 },
                { id: 5, row: 1, col: 1, x: 80, y: 80 },
                { id: 6, row: 1, col: 2, x: 160, y: 80 },
                { id: 7, row: 2, col: 0, x: 0, y: 160 },
                { id: 8, row: 2, col: 1, x: 80, y: 160 },
                { id: 9, row: 2, col: 2, x: 160, y: 160 }
            ]
        };
    }

    createAdvancedPuzzle(level = 5) {
        const size = Math.min(level + 2, 6);
        const pieces = [];
        let id = 1;
        
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                pieces.push({
                    id: id++,
                    row: row,
                    col: col,
                    x: col * 80,
                    y: row * 80
                });
            }
        }
        
        return {
            title: `🌟 Level ${level} Challenge`,
            image: "🌟🦕🦖",
            grid: { rows: size, cols: size },
            pieces: pieces
        };
    }

    createPuzzleBoard(board, config) {
        board.innerHTML = '';
        
        // Create background image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'puzzle-background';
        imageContainer.style.width = `${config.grid.cols * 80}px`;
        imageContainer.style.height = `${config.grid.rows * 80}px`;
        imageContainer.style.background = 'linear-gradient(45deg, #FF6B6B, #4ECDC4)';
        imageContainer.style.borderRadius = '15px';
        imageContainer.style.display = 'flex';
        imageContainer.style.alignItems = 'center';
        imageContainer.style.justifyContent = 'center';
        imageContainer.style.fontSize = '3rem';
        imageContainer.style.color = 'white';
        imageContainer.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        imageContainer.textContent = config.image;
        
        // Create grid overlay for visual guidance
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'puzzle-grid';
        gridOverlay.style.position = 'absolute';
        gridOverlay.style.top = '0';
        gridOverlay.style.left = '0';
        gridOverlay.style.width = '100%';
        gridOverlay.style.height = '100%';
        gridOverlay.style.display = 'grid';
        gridOverlay.style.gridTemplateColumns = `repeat(${config.grid.cols}, 1fr)`;
        gridOverlay.style.gridTemplateRows = `repeat(${config.grid.rows}, 1fr)`;
        gridOverlay.style.pointerEvents = 'none';
        
        // Add grid lines
        for (let i = 0; i < config.grid.rows; i++) {
            for (let j = 0; j < config.grid.cols; j++) {
                const cell = document.createElement('div');
                cell.style.border = '1px dashed rgba(255,255,255,0.3)';
                gridOverlay.appendChild(cell);
            }
        }
        
        imageContainer.appendChild(gridOverlay);
        board.appendChild(imageContainer);
        
        // Position the board
        board.style.display = 'flex';
        board.style.justifyContent = 'center';
        board.style.alignItems = 'center';
    }

    createPuzzlePieces(piecesArea, config) {
        piecesArea.innerHTML = '';
        
        // Shuffle pieces
        const shuffledPieces = [...config.pieces].sort(() => Math.random() - 0.5);
        
        shuffledPieces.forEach(pieceData => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.dataset.pieceId = pieceData.id;
            piece.dataset.row = pieceData.row;
            piece.dataset.col = pieceData.col;
            piece.dataset.targetX = pieceData.x;
            piece.dataset.targetY = pieceData.y;
            piece.draggable = true;
            
            // Create piece content (this would be actual image pieces in a real game)
            const pieceContent = document.createElement('div');
            pieceContent.className = 'piece-content';
            pieceContent.style.width = '100%';
            pieceContent.style.height = '100%';
            pieceContent.style.background = this.getPieceBackground(pieceData);
            pieceContent.style.borderRadius = '8px';
            pieceContent.style.display = 'flex';
            pieceContent.style.alignItems = 'center';
            pieceContent.style.justifyContent = 'center';
            pieceContent.style.fontSize = '1.5rem';
            pieceContent.style.color = 'white';
            pieceContent.style.textShadow = '1px 1px 2px rgba(0,0,0,0.7)';
            
            // Add piece number for identification
            pieceContent.textContent = pieceData.id;
            
            piece.appendChild(pieceContent);
            piecesArea.appendChild(piece);
            this.pieces.push(piece);
        });
    }

    getPieceBackground(pieceData) {
        const colors = [
            'linear-gradient(45deg, #FF6B6B, #FF8E53)',
            'linear-gradient(45deg, #4ECDC4, #44A08D)',
            'linear-gradient(45deg, #45B7D1, #96CEB4)',
            'linear-gradient(45deg, #FFE66D, #FF8E53)',
            'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            'linear-gradient(45deg, #A8E6CF, #DCEDC1)'
        ];
        return colors[pieceData.id % colors.length];
    }

    setupDragAndDrop() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('puzzle-piece')) {
                this.draggedPiece = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.dataset.pieceId);
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('puzzle-piece')) {
                e.target.classList.remove('dragging');
                this.draggedPiece = null;
            }
        });

        // Handle piece movement and snapping
        document.addEventListener('mousemove', (e) => {
            if (this.draggedPiece) {
                this.handlePieceDrag(e);
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (this.draggedPiece) {
                this.handlePieceDrop(e);
            }
        });
    }

    handlePieceDrag(e) {
        if (!this.draggedPiece) return;
        
        const board = document.getElementById('puzzle-board');
        const boardRect = board.getBoundingClientRect();
        const pieceRect = this.draggedPiece.getBoundingClientRect();
        
        // Calculate piece position relative to board
        const x = e.clientX - boardRect.left - pieceRect.width / 2;
        const y = e.clientY - boardRect.top - pieceRect.height / 2;
        
        // Check for snapping to correct position
        const targetX = parseInt(this.draggedPiece.dataset.targetX);
        const targetY = parseInt(this.draggedPiece.dataset.targetY);
        
        if (Math.abs(x - targetX) < this.snapDistance && Math.abs(y - targetY) < this.snapDistance) {
            // Snap to correct position
            this.snapPieceToPosition(this.draggedPiece, targetX, targetY);
        }
    }

    snapPieceToPosition(piece, x, y) {
        // Remove piece from pieces area
        piece.remove();
        
        // Create placed piece on the board
        const board = document.getElementById('puzzle-board');
        const placedPiece = document.createElement('div');
        placedPiece.className = 'puzzle-piece placed snapped';
        placedPiece.style.position = 'absolute';
        placedPiece.style.left = `${x}px`;
        placedPiece.style.top = `${y}px`;
        placedPiece.style.zIndex = '10';
        placedPiece.dataset.pieceId = piece.dataset.pieceId;
        
        // Copy piece content
        const pieceContent = piece.querySelector('.piece-content').cloneNode(true);
        placedPiece.appendChild(pieceContent);
        
        board.appendChild(placedPiece);
        
        // Play sound and update count
        this.playSound('piece-snap');
        this.piecesPlaced++;
        this.updatePieceCount();
        
        // Add celebration effect
        this.createPieceCelebration(x, y);
        
        // Check if puzzle is complete
        this.checkPuzzleCompletion();
    }

    createPieceCelebration(x, y) {
        // Create sparkle effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createSparkle(x + Math.random() * 80, y + Math.random() * 80);
            }, i * 100);
        }
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = '#FFD700';
        sparkle.style.borderRadius = '50%';
        sparkle.style.animation = 'sparkle 0.8s ease-out forwards';
        sparkle.style.zIndex = '100';
        
        document.getElementById('puzzle-board').appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 800);
    }

    handlePieceDrop(e) {
        if (!this.draggedPiece) return;
        
        // If piece wasn't snapped, return it to pieces area
        if (this.draggedPiece.parentNode) {
            this.draggedPiece.classList.remove('dragging');
        }
        
        this.draggedPiece = null;
    }

    checkPuzzleCompletion() {
        if (this.piecesPlaced === this.totalPieces) {
            // Puzzle complete!
            setTimeout(() => {
                this.completePuzzle();
            }, 1000);
        }
    }

    completePuzzle() {
        const board = document.getElementById('puzzle-board');
        board.classList.add('completed');
        
        // Create celebration effects
        this.createCompletionCelebration();
        
        // Show completion screen
        setTimeout(() => {
            this.showScreen('puzzle-complete');
            this.playSound('puzzle-complete-sound');
            
            // Update completed image
            const completedImage = document.getElementById('completed-image');
            completedImage.textContent = this.puzzleData.title;
        }, 2000);
    }

    createCompletionCelebration() {
        // Create lots of balloons
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createBalloon();
            }, i * 100);
        }
        
        // Create confetti
        this.createConfetti();
        
        // Play celebration sound
        this.playSound('puzzle-complete-sound');
    }

    createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.position = 'fixed';
        balloon.style.left = `${Math.random() * window.innerWidth}px`;
        balloon.style.bottom = '-50px';
        balloon.style.width = '40px';
        balloon.style.height = '50px';
        balloon.style.background = this.getRandomBalloonColor();
        balloon.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        balloon.style.animation = 'floatUp 4s ease-out forwards';
        balloon.style.zIndex = '1000';
        
        document.body.appendChild(balloon);
        
        setTimeout(() => balloon.remove(), 4000);
    }

    createBalloons() {
        // Create initial balloons for start
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createBalloon();
            }, i * 200);
        }
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfettiPiece();
            }, i * 50);
        }
    }

    createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'fixed';
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = this.getRandomBalloonColor();
        confetti.style.animation = 'fallDown 3s ease-in forwards';
        confetti.style.zIndex = '999';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }

    getRandomBalloonColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFE66D', '#FF8E53', '#A8E6CF', '#DCEDC1'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updatePieceCount() {
        document.getElementById('pieces-placed').textContent = this.piecesPlaced;
        document.getElementById('total-pieces').textContent = this.totalPieces;
    }

    showHint() {
        // Find an unsolved piece and highlight it
        const unsolvedPieces = document.querySelectorAll('.puzzle-piece:not(.placed)');
        if (unsolvedPieces.length > 0) {
            const randomPiece = unsolvedPieces[Math.floor(Math.random() * unsolvedPieces.length)];
            randomPiece.style.animation = 'pulse 1s infinite';
            
            setTimeout(() => {
                randomPiece.style.animation = '';
            }, 2000);
        }
    }

    resetPuzzle() {
        this.loadPuzzle(this.currentPuzzle);
        this.showScreen('game-screen');
    }

    nextPuzzle() {
        this.currentPuzzle++;
        this.loadPuzzle(this.currentPuzzle);
        this.showScreen('game-screen');
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const pauseButton = document.getElementById('pause-game');
        
        if (this.isPaused) {
            pauseButton.textContent = '▶️';
        } else {
            pauseButton.textContent = '⏸️';
        }
    }

    playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RionsPuzzle();
});
