// Rion's Puzzle - Educational Dinosaur Game
class RionsPuzzle {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.totalStars = 0;
        this.isPaused = false;
        this.currentPuzzle = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.dinosaurs = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.init3DScene();
        this.loadLevel(this.currentLevel);
    }

    setupEventListeners() {
        // Welcome screen
        document.getElementById('start-game').addEventListener('click', () => {
            this.showScreen('game-screen');
            this.playSound('click-sound');
        });

        // Game controls
        document.getElementById('pause-game').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('hint-button').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('reset-level').addEventListener('click', () => {
            this.resetLevel();
        });

        document.getElementById('next-level').addEventListener('click', () => {
            this.nextLevel();
        });

        // Level complete
        document.getElementById('continue-game').addEventListener('click', () => {
            this.nextLevel();
        });

        // Game over
        document.getElementById('restart-game').addEventListener('click', () => {
            this.restartLevel();
        });

        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });

        // Drag and drop events
        this.setupDragAndDrop();
    }

    init3DScene() {
        const container = document.getElementById('3d-scene');
        
        // Create Three.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setClearColor(0x87CEEB, 0.8);
        container.appendChild(this.renderer.domElement);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);

        // Position camera
        this.camera.position.z = 5;

        // Start animation loop
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate dinosaurs
        this.dinosaurs.forEach(dino => {
            if (dino.mesh) {
                dino.mesh.rotation.y += 0.01;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    loadLevel(level) {
        this.currentLevel = level;
        document.getElementById('current-level').textContent = level;
        
        // Clear previous puzzle
        const container = document.getElementById('puzzle-container');
        container.innerHTML = '';
        
        // Create level-specific puzzle
        this.createPuzzle(level);
        
        // Add 3D dinosaurs based on level
        this.add3DDinosaurs(level);
    }

    createPuzzle(level) {
        const container = document.getElementById('puzzle-container');
        
        switch(level) {
            case 1:
                this.createColorMatchingPuzzle(container);
                break;
            case 2:
                this.createShapeMatchingPuzzle(container);
                break;
            case 3:
                this.createNumberSequencePuzzle(container);
                break;
            case 4:
                this.createDinoHabitatPuzzle(container);
                break;
            case 5:
                this.create3DShapePuzzle(container);
                break;
            default:
                this.createAdvancedPuzzle(container, level);
        }
    }

    createColorMatchingPuzzle(container) {
        const title = document.createElement('h2');
        title.textContent = '🦕 Help Rion Match the Colors! 🦖';
        title.style.color = '#2C3E50';
        title.style.marginBottom = '20px';
        container.appendChild(title);

        const colors = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        
        // Create puzzle pieces
        const piecesContainer = document.createElement('div');
        piecesContainer.style.display = 'flex';
        piecesContainer.style.flexWrap = 'wrap';
        piecesContainer.style.justifyContent = 'center';
        piecesContainer.style.marginBottom = '30px';
        
        shuffledColors.forEach((color, index) => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = color;
            piece.draggable = true;
            piece.dataset.color = color;
            piece.dataset.index = index;
            piecesContainer.appendChild(piece);
        });
        
        container.appendChild(piecesContainer);

        // Create puzzle slots
        const slotsContainer = document.createElement('div');
        slotsContainer.style.display = 'flex';
        slotsContainer.style.flexWrap = 'wrap';
        slotsContainer.style.justifyContent = 'center';
        
        colors.forEach((color, index) => {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.expectedColor = color;
            slot.dataset.slotIndex = index;
            slotsContainer.appendChild(slot);
        });
        
        container.appendChild(slotsContainer);
        
        this.currentPuzzle = {
            type: 'color-matching',
            pieces: shuffledColors,
            slots: colors,
            completed: false
        };
    }

    createShapeMatchingPuzzle(container) {
        const title = document.createElement('h2');
        title.textContent = '🔷 Find the Matching Shapes! 🔶';
        title.style.color = '#2C3E50';
        title.style.marginBottom = '20px';
        container.appendChild(title);

        const shapes = ['🔷', '🔶', '🔺', '🔻', '⭕', '⬜'];
        const shuffledShapes = [...shapes].sort(() => Math.random() - 0.5);
        
        // Create puzzle pieces
        const piecesContainer = document.createElement('div');
        piecesContainer.style.display = 'flex';
        piecesContainer.style.flexWrap = 'wrap';
        piecesContainer.style.justifyContent = 'center';
        piecesContainer.style.marginBottom = '30px';
        
        shuffledShapes.forEach((shape, index) => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = shape;
            piece.draggable = true;
            piece.dataset.shape = shape;
            piece.dataset.index = index;
            piecesContainer.appendChild(piece);
        });
        
        container.appendChild(piecesContainer);

        // Create puzzle slots
        const slotsContainer = document.createElement('div');
        slotsContainer.style.display = 'flex';
        slotsContainer.style.flexWrap = 'wrap';
        slotsContainer.style.justifyContent = 'center';
        
        shapes.forEach((shape, index) => {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.expectedShape = shape;
            slot.dataset.slotIndex = index;
            slotsContainer.appendChild(slot);
        });
        
        container.appendChild(slotsContainer);
        
        this.currentPuzzle = {
            type: 'shape-matching',
            pieces: shuffledShapes,
            slots: shapes,
            completed: false
        };
    }

    createNumberSequencePuzzle(container) {
        const title = document.createElement('h2');
        title.textContent = '🔢 Count the Dinosaurs! 🦕';
        title.style.color = '#2C3E50';
        title.style.marginBottom = '20px';
        container.appendChild(title);

        const numbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
        const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
        
        // Create puzzle pieces
        const piecesContainer = document.createElement('div');
        piecesContainer.style.display = 'flex';
        piecesContainer.style.flexWrap = 'wrap';
        piecesContainer.style.justifyContent = 'center';
        piecesContainer.style.marginBottom = '30px';
        
        shuffledNumbers.forEach((number, index) => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = number;
            piece.draggable = true;
            piece.dataset.number = number;
            piece.dataset.index = index;
            piecesContainer.appendChild(piece);
        });
        
        container.appendChild(piecesContainer);

        // Create puzzle slots
        const slotsContainer = document.createElement('div');
        slotsContainer.style.display = 'flex';
        slotsContainer.style.flexWrap = 'wrap';
        slotsContainer.style.justifyContent = 'center';
        
        numbers.forEach((number, index) => {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.expectedNumber = number;
            slot.dataset.slotIndex = index;
            slotsContainer.appendChild(slot);
        });
        
        container.appendChild(slotsContainer);
        
        this.currentPuzzle = {
            type: 'number-sequence',
            pieces: shuffledNumbers,
            slots: numbers,
            completed: false
        };
    }

    createDinoHabitatPuzzle(container) {
        const title = document.createElement('h2');
        title.textContent = '🏠 Match Dinosaurs to Their Homes! 🏡';
        title.style.color = '#2C3E50';
        title.style.marginBottom = '20px';
        container.appendChild(title);

        const habitats = ['🌲', '🏔️', '🏖️', '🌵', '🌊'];
        const dinos = ['🦕', '🦖', '🦕', '🦖', '🦕'];
        const shuffledHabitats = [...habitats].sort(() => Math.random() - 0.5);
        
        // Create puzzle pieces
        const piecesContainer = document.createElement('div');
        piecesContainer.style.display = 'flex';
        piecesContainer.style.flexWrap = 'wrap';
        piecesContainer.style.justifyContent = 'center';
        piecesContainer.style.marginBottom = '30px';
        
        shuffledHabitats.forEach((habitat, index) => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = habitat;
            piece.draggable = true;
            piece.dataset.habitat = habitat;
            piece.dataset.index = index;
            piecesContainer.appendChild(piece);
        });
        
        container.appendChild(piecesContainer);

        // Create puzzle slots
        const slotsContainer = document.createElement('div');
        slotsContainer.style.display = 'flex';
        slotsContainer.style.flexWrap = 'wrap';
        slotsContainer.style.justifyContent = 'center';
        
        habitats.forEach((habitat, index) => {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.textContent = dinos[index];
            slot.dataset.expectedHabitat = habitat;
            slot.dataset.slotIndex = index;
            slotsContainer.appendChild(slot);
        });
        
        container.appendChild(slotsContainer);
        
        this.currentPuzzle = {
            type: 'habitat-matching',
            pieces: shuffledHabitats,
            slots: habitats,
            completed: false
        };
    }

    create3DShapePuzzle(container) {
        const title = document.createElement('h2');
        title.textContent = '🎯 3D Shape Adventure! 🌟';
        title.style.color = '#2C3E50';
        title.style.marginBottom = '20px';
        container.appendChild(title);

        const shapes = ['🔷', '🔶', '🔺', '🔻', '⭕'];
        const shuffledShapes = [...shapes].sort(() => Math.random() - 0.5);
        
        // Create puzzle pieces
        const piecesContainer = document.createElement('div');
        piecesContainer.style.display = 'flex';
        piecesContainer.style.flexWrap = 'wrap';
        piecesContainer.style.justifyContent = 'center';
        piecesContainer.style.marginBottom = '30px';
        
        shuffledShapes.forEach((shape, index) => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = shape;
            piece.draggable = true;
            piece.dataset.shape = shape;
            piece.dataset.index = index;
            piecesContainer.appendChild(piece);
        });
        
        container.appendChild(piecesContainer);

        // Create puzzle slots
        const slotsContainer = document.createElement('div');
        slotsContainer.style.display = 'flex';
        slotsContainer.style.flexWrap = 'wrap';
        slotsContainer.style.justifyContent = 'center';
        
        shapes.forEach((shape, index) => {
            const slot = document.createElement('div');
            slot.className = 'puzzle-slot';
            slot.dataset.expectedShape = shape;
            slot.dataset.slotIndex = index;
            slotsContainer.appendChild(slot);
        });
        
        container.appendChild(slotsContainer);
        
        this.currentPuzzle = {
            type: '3d-shape',
            pieces: shuffledShapes,
            slots: shapes,
            completed: false
        };
    }

    add3DDinosaurs(level) {
        // Clear existing dinosaurs
        this.dinosaurs.forEach(dino => {
            if (dino.mesh) {
                this.scene.remove(dino.mesh);
            }
        });
        this.dinosaurs = [];

        const dinoCount = Math.min(level + 2, 8);
        
        for (let i = 0; i < dinoCount; i++) {
            const geometry = new THREE.SphereGeometry(0.3, 8, 6);
            const material = new THREE.MeshLambertMaterial({ 
                color: this.getRandomColor(),
                transparent: true,
                opacity: 0.8
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2
            );
            
            this.scene.add(mesh);
            this.dinosaurs.push({ mesh, geometry, material });
        }
    }

    getRandomColor() {
        const colors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0x96CEB4, 0xFFE66D, 0xFF8E53];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupDragAndDrop() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('puzzle-piece')) {
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.dataset.index);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('puzzle-piece')) {
                e.target.classList.remove('dragging');
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('puzzle-slot')) {
                e.target.classList.add('drag-over');
            }
        });

        document.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('puzzle-slot')) {
                e.target.classList.remove('drag-over');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('puzzle-slot')) {
                e.target.classList.remove('drag-over');
                
                const pieceIndex = e.dataTransfer.getData('text/plain');
                const piece = document.querySelector(`[data-index="${pieceIndex}"]`);
                const slot = e.target;
                
                this.handlePieceDrop(piece, slot);
            }
        });
    }

    handlePieceDrop(piece, slot) {
        if (!piece || !slot) return;

        // Check if the piece matches the slot
        let isCorrect = false;
        
        if (this.currentPuzzle.type === 'color-matching') {
            isCorrect = piece.dataset.color === slot.dataset.expectedColor;
        } else if (this.currentPuzzle.type === 'shape-matching') {
            isCorrect = piece.dataset.shape === slot.dataset.expectedShape;
        } else if (this.currentPuzzle.type === 'number-sequence') {
            isCorrect = piece.dataset.number === slot.dataset.expectedNumber;
        } else if (this.currentPuzzle.type === 'habitat-matching') {
            isCorrect = piece.dataset.habitat === slot.dataset.expectedHabitat;
        } else if (this.currentPuzzle.type === '3d-shape') {
            isCorrect = piece.dataset.shape === slot.dataset.expectedShape;
        }

        if (isCorrect) {
            // Correct placement
            slot.classList.add('filled', 'correct');
            slot.appendChild(piece);
            piece.style.cursor = 'default';
            piece.draggable = false;
            
            this.playSound('success-sound');
            this.addScore(10);
            
            // Check if puzzle is complete
            this.checkPuzzleCompletion();
        } else {
            // Incorrect placement
            slot.classList.add('filled');
            slot.appendChild(piece);
            
            // Return piece after a short delay
            setTimeout(() => {
                slot.classList.remove('filled');
                slot.removeChild(piece);
                piece.style.cursor = 'grab';
                piece.draggable = true;
            }, 1000);
        }
    }

    checkPuzzleCompletion() {
        const filledSlots = document.querySelectorAll('.puzzle-slot.filled');
        
        if (filledSlots.length === this.currentPuzzle.slots.length) {
            // All slots are filled correctly
            this.currentPuzzle.completed = true;
            this.completeLevel();
        }
    }

    completeLevel() {
        this.addScore(50);
        this.totalStars += 3;
        document.getElementById('total-stars').textContent = this.totalStars;
        
        setTimeout(() => {
            this.showScreen('level-complete');
            this.playSound('success-sound');
        }, 1000);
    }

    addScore(points) {
        this.score += points;
        document.getElementById('current-score').textContent = this.score;
    }

    showHint() {
        if (!this.currentPuzzle || this.currentPuzzle.completed) return;
        
        // Find an unsolved slot and highlight it
        const unsolvedSlots = document.querySelectorAll('.puzzle-slot:not(.filled)');
        if (unsolvedSlots.length > 0) {
            const randomSlot = unsolvedSlots[Math.floor(Math.random() * unsolvedSlots.length)];
            randomSlot.style.animation = 'pulse 1s infinite';
            
            setTimeout(() => {
                randomSlot.style.animation = '';
            }, 2000);
        }
    }

    resetLevel() {
        this.loadLevel(this.currentLevel);
    }

    nextLevel() {
        this.currentLevel++;
        this.loadLevel(this.currentLevel);
        this.showScreen('game-screen');
    }

    restartLevel() {
        this.loadLevel(this.currentLevel);
        this.showScreen('game-screen');
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const pauseButton = document.getElementById('pause-game');
        
        if (this.isPaused) {
            pauseButton.textContent = '▶️';
            // Pause game logic here
        } else {
            pauseButton.textContent = '⏸️';
            // Resume game logic here
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

// Handle window resize for 3D scene
window.addEventListener('resize', () => {
    const container = document.getElementById('3d-scene');
    if (container && window.game && window.game.camera && window.game.renderer) {
        window.game.camera.aspect = container.clientWidth / container.clientHeight;
        window.game.camera.updateProjectionMatrix();
        window.game.renderer.setSize(container.clientWidth, container.clientHeight);
    }
});
