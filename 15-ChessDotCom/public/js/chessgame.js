const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add(
                'square', 
                (rowindex + squareindex) % 2 === 0 ? 'light' : 'dark'
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add(
                    'piece',
                    square.color === 'w' ? 'white' : 'black'
                );

                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData('text/plain', "");
                    }
                });

                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };

                    handleMove(sourceSquare, targetSquare);
                }
            });
            boardElement.appendChild(squareElement);
        });
    });

    if(playerRole === 'b'){
        boardElement.classList.add('flipped');
    }
    else{
        boardElement.classList.remove('flipped');
    }
};

const handleMove = (sourceSquare, targetSquare) => {
    const move = {
        from: `${String.fromCharCode(97 + sourceSquare.col)}${8 - sourceSquare.row}`,
        to: `${String.fromCharCode(97 + targetSquare.col)}${8 - targetSquare.row}`,
        promotion: 'q'
    };
    socket.emit('move', move);
};


const getPieceUnicode = (piece) => {
    const unicodePiece = {
        p: '♙',
        n: '♘',
        b: '♗',
        r: '♖',
        q: '♕',
        k: '♔',
        P: '♟',
        N: '♞',
        B: '♝',
        R: '♜',
        Q: '♛',
        K: '♚'  
    }
    return unicodePiece[piece.type] || '';

};
socket.on('playerRole', (role) => {
    playerRole = role;
    renderBoard();
})

socket.on('spectatorRole', () => {
    playerRole = null;
    renderBoard();
})

socket.on('boardState', (fen) => {
    chess.load(fen)
    renderBoard();
})
socket.on('move', (move) => {
    chess.move(move)
    renderBoard();
})

renderBoard();