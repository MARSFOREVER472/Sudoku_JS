// Código completo de la clase en JavaScript...

document.addEventListener("DOMContentLoaded", function() 
{
    const container = document.getElementById("container");

    // FUNCIÓN PARA GENERAR UN TABLERO DE SUDOKU DE MANERA ALEATORIA...

    function generateRandomSudoku()
    {
        // SE GENERA UNA FUNCIÓN MEDIANTE UN TABLERO TIPO PUZZLE CON UNA MATRIZ DE 9 * 9 DIMENSIONES...

        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];

        return puzzle;
    }

    // FUNCIÓN PARA RESOLVER EL TABLERO DE SUDOKU...

    function solveSudoku(board)
    {
        const solvedPuzzle = JSON.parse(JSON.stringify(board));
        solveHelper(solvedPuzzle);
        return solvedPuzzle;
    }

    // FUNCIÓN QUE RESUELVE EL PUZZLE DE MANERA RECURSIVA...

    function solveHelper(board)
    {
        const emptyCell = findEmptyCell(board);

        if (!emptyCell)
        {
            return true; // PUZZLE RESUELTO.
        }

        const [row, col] = emptyCell;

        for (let num = 1; num <= 9; num++)
        {
            if (isValidMove(board, row, col, num))
            {
                board[row][col] = num;

                if (solveHelper(board))
                {
                    return true;
                }

                board[row][col] = 0; // BACKTRACKING...
            }
        }

        return false; // SI NO ENCUENTRA UN VALOR DE CADA CELDA DEL TABLERO...
    }

    // FUNCIÓN PARA ENCONTRAR UNA CELDA VACÍA DENTRO DEL TABLERO...

    function findEmptyCell(board)
    {
        for (let row = 0; row < 9; row++)
        {
            for (let col = 0; col < 9; col++)
            {
                if (board[row][col] === 0)
                {
                    return [row, col];
                }
            }
        }
        return null; // NO SE ENCUENTRA UNA CELDA VACÍA...
    }

    // FUNCIÓN PARA VERIFICAR SI EL MOVIMIENTO ES VÁLIDO...

    function isValidMove(board, row, col, num)
    {
        // VERIFICA POR FILA...

        for (let i = 0; i < 9; i++)
        {
            if (board[row][i] === num)
            {
                return false;
            }
        }

        // VERIFICA POR COLUMNA...

        for (let i = 0; i < 9; i++)
        {
            if (board[i][col] === num)
            {
                return false;
            }
        }

        // VERIFICA EN CELDAS DE 3 * 3...

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++)
        {
            for (let j = startCol; j < startCol + 3; j++)
            {
                if (board[i][j] === num)
                {
                    return false;
                }
            }
        }

        return true; // MOVIMIENTO VÁLIDO...
    }

    // FUNCIÓN PARA CREAR UN PUZZLE DE SUDOKU MEDIANTE CELDAS...

    function createSudokuGrid(puzzle)
    {
        container.innerHTML = '';

        puzzle.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((cell, columnIndex) => {
                const cellElement = document.createElement('input');
                cellElement.classList.add('cell');
                cellElement.classList
                    .add((rowIndex + columnIndex) % 2 === 0 ?
                        'lightBackground' : 'darkBackground');
                cellElement.type = 'text';
                cellElement.maxLength = 1;
                cellElement.value = cell !== 0 ? cell : '';
                rowElement.appendChild(cellElement);
            });
            container.appendChild(rowElement);
        });
    }

    // INICIALIZA EL PUZZLE...

    let initialPuzzle = generateRandomSudoku();
    let puzzle = JSON.parse(JSON.stringify(initialPuzzle));
    let solvedPuzzle = [];

    // FUNCIÓN PARA RESOLVER EL PUZZLE...

    function solvePuzzle()
    {
        solvedPuzzle = solveSudoku(puzzle);
        createSudokuGrid(solvedPuzzle);
    }

    // FUNCIÓN PARA REINICIAR EL PUZZLE...

    function resetPuzzle()
    {
        initialPuzzle = generateRandomSudoku();
        puzzle = JSON.parse(JSON.stringify(initialPuzzle));
        solvedPuzzle = [];
        createSudokuGrid(puzzle);
    }

    // SE CREA UN PUZZLE INICIAL...

    createSudokuGrid(puzzle);

    // SE INSTAURA MEDIANTE EVENTOS AL INTERACTUAR CON LOS BOTONES...

    document.getElementById("solveButton")
        .addEventListener("click", solvePuzzle);

    document.getElementById("resetButton")
        .addEventListener("click", resetPuzzle);
});