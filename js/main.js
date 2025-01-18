const TicTac = {
    cPlayer: "X",
    state: Array(9).fill(null),
    gameOver: false,
    timer: null,
    timeLeft: 10,

    init() {
        this.cBoard();
        document.getElementById("reset").addEventListener("click", () => this.reset());
    },

    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = "";
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        board.addEventListener("click", (e) => this.handleClick(e));
        this.uMessage(`Player ${this.cPlayer}'s turn`);
        this.startTimer();
    },

    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;

        if (this.gameOver || !cell.classList.contains("cell") || this.state[i]) return;

        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");

        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.gameOver = true;
            clearInterval(this.timer);
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.gameOver = true;
            clearInterval(this.timer);
        } else {
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`Player ${this.cPlayer}'s turn`);
            this.resetTimer();
        }
    },

    checkWin() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return wins.find((combo) => combo.every((i) => this.state[i] === this.cPlayer));
    },

    highlight(combo) {
        combo.forEach((i) => {
            document.getElementById("board").children[i].style.color = "red";
        });
    },

    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;
        this.cBoard();
    },

    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },

    startTimer() {
        this.timeLeft = 10;
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeLeft -= 1;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.timeLeft = 0;
                clearInterval(this.timer);
                this.cPlayer = this.cPlayer === "X" ? "O" : "X";
                this.uMessage(`Time's up! Player ${this.cPlayer}'s turn`);
                this.resetTimer();
            }
        }, 1000);
    },

    resetTimer() {
        clearInterval(this.timer);
        this.startTimer();
    },

    updateTimerDisplay() {
        document.getElementById("timer").textContent = `Time left: ${this.timeLeft}s`;
    },
};

TicTac.init();
