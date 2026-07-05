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
})