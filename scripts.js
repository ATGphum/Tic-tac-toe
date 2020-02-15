//module to create gameboard
const GameBoard = (() => {
    //array to store the board state
    var _board = []
    var _played = []
    const resetBoard = () => {
        for(var i = 0; i < 9; i++){
            _board[i] = "<br>";
            _played[i] = false;
        }
    }

    //returns a copy of the board
    const returnBoard = () => {
        var boardCopy = [];
        for(var i = 0; i < 9; i++){
            boardCopy[i] = _board[i];
        }
        return boardCopy;
    }
        
    //change board at index to given symbol
    const changeSquare = (index, symbol) => {
        if(_played[index] == false){
            _played[index] = true;
            _board[index] = symbol;
            printBoard();
            return true;
        }
        return false;
    }

    const printBoard = () => {
        var screen = document.querySelector('#screen');
        screen.innerHTML = "";
        for(var i = 0; i < 9; i++){
            screen.innerHTML += "<div class=piece id=box" + i + ">" + _board[i] + "</div>";
        }
    }

    //check board to see if there is a win
    const winState = () => {
        if(_board[0] != "<br>" && _board[0] == _board[1] && _board[1] == _board[2]){
            return true;
        }
        if(_board[3] != "<br>" && _board[3] == _board[4] && _board[4] == _board[5]){
            return true;
        }
        if(_board[6] != "<br>" && _board[6] == _board[7] && _board[7] == _board[8]){
            return true;
        }
        if(_board[0] != "<br>" && _board[0] == _board[3] && _board[3] == _board[6]){
            return true;
        }
        if(_board[1] != "<br>" && _board[1] == _board[4] && _board[4] == _board[7]){
            return true;
        }
        if(_board[2] != "<br>" && _board[2] == _board[5] && _board[5] == _board[8]){
            return true;
        }
        if(_board[0] != "<br>" && _board[0] == _board[4] && _board[4] == _board[8]){
            return true;
        }
        if(_board[2] != "<br>" && _board[2] == _board[4] && _board[4] == _board[6]){
            return true;
        }
    } 
    return {changeSquare, printBoard, resetBoard, winState, returnBoard};    
})();

//factory to store player object
const player = (name, symbol) => {
    const getName = () => name;

    const makeMove = (index) => {
        var success = GameBoard.changeSquare(index, symbol);
        return success;
    }

    const detectInput = () => {
        for(var i = 0; i < 9; i++){
            var box = document.querySelector(`#box${i}`);
            box.addEventListener('click', (e) => sendMove(e));
        }
    }
    
    const sendMove = (e) => {
        const id = e.srcElement.id;
        var success = makeMove(id.charAt(3)); 
        if(success){
            currGame.transTurn();
            currGame.checkWin();
        }
    } 
    return {getName, makeMove, detectInput}
} 

const ai = (name, symbol) => {
    const getName = () => name;

    const makeMove = (index) => {
        var success = GameBoard.changeSquare(index, symbol);
        return success;
    }
    
    const Move = () => {
        var val;
    }

    const isMovesLeft = (board) => {
        for(var i = 0; i < 9; i++){
            if(board[i] == "<br>"){
                return true;
            }
        }
        return false;
    }
    const evaluate = (_board) => {
        if(_board[0] != "<br>" && _board[0] == _board[1] && _board[1] == _board[2]){
            if(_board[0] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[3] != "<br>" && _board[3] == _board[4] && _board[4] == _board[5]){
            if(_board[3] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[6] != "<br>" && _board[6] == _board[7] && _board[7] == _board[8]){
            if(_board[6] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[0] != "<br>" && _board[0] == _board[3] && _board[3] == _board[6]){
            if(_board[0] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[1] != "<br>" && _board[1] == _board[4] && _board[4] == _board[7]){
            if(_board[1] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[2] != "<br>" && _board[2] == _board[5] && _board[5] == _board[8]){
            if(_board[2] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[0] != "<br>" && _board[0] == _board[4] && _board[4] == _board[8]){
            if(_board[0] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }
        else if(_board[2] != "<br>" && _board[2] == _board[4] && _board[4] == _board[6]){
            if(_board[2] == symbol){
                return +10;
            }
            else{
                return -10;
            }
        }       
        else{
            return 0;
        }
    }

    const minimax = (board, depth, isMax) => {
        console.log("minimax");
        var score = evaluate(board);

        if(score == 10){
            return score;
        }

        if(score == -10){
            return score;
        }

        if(isMovesLeft(board) == false){
            return 0;
        }

        if(isMax){
            var best = -1000;

            for(var i = 0; i < 9; i++){
                if(board[i] == "<br>"){
                    board[i] = symbol;
                    
                    best = Math.max(best, minimax(board, depth + 1, !isMax));

                    board[i] = "<br>";
                }
            }
            return best;
        }
        
        else{
            var best = 1000;

            for(var i = 0; i < 9; i++){
                if(board[i] == "<br>"){
                    board[i] = "X";
                    
                    best = Math.min(best, minimax(board, depth + 1, !isMax));

                    board[i] = "<br>";
                }
            }
            return best;
        }
    }
    
    const findBestMove = (board) => {
        var bestVal = -1000;
        var val = -1;
        
        for(var i = 0; i < 9; i++){
            if(board[i] == "<br>"){
                console.log("chill");
                board[i] = symbol;  

                var moveVal = minimax(board, 0, false);
                
                board[i] = "<br>";

                if(moveVal > bestVal){
                    val = i;
                    bestVal = moveVal;
                }
            }
        }
        return val;
    } 

    const choose = () => {
        var move = findBestMove(GameBoard.returnBoard());
        console.log(move);
        var result = makeMove(move);
        console.log(result);
        currGame.transTurn();
    }
    
    return {choose, getName};        
}


//runs the game
const game = () => {
    var pl1;
    var pl2;
    var againstAi;
    var noLosses = 0;
    /*
    player1 = the name of the first player
    player2 = the name of the second player
    againstAi = boolean for whether or not to make player2 an ai
    */
    const newGame = (player1, player2, vsAi) => {
        GameBoard.resetBoard();
        GameBoard.printBoard();
        pl1 = player(player1, "X");
        if(vsAi){
            pl2 = ai("Ai", "O");
            againstAi = true;
        }
        else{
            pl2 = player(player2, "O");
            againstAi = false;
        }
        pl1.detectInput();
        const button = document.querySelector('#new');
        button.addEventListener('click', () => newGame("Phum", "Fiona", true));
    }
   
    var counter = 0; 

    const currTurn = () => {
        return counter;
    }

    const transTurn = () => {
        if(counter % 2 == 0){
            counter++;
            if(againstAi){
                pl2.choose();
            }
            else{
                pl2.detectInput();
            }
        }
        else if(counter % 2 == 1){
            counter++;
            pl1.detectInput();
        }
    }    

    const checkWin = () => {    
        if(GameBoard.winState() == true){
            var winner;
            if(counter % 2 == 1){
                winner = pl1.getName();
            }
            else{
                winner = pl2.getName();
                noLosses++;     
                const losses = document.querySelector('#losses');
                losses.textContent = "Number of losses: " + noLosses;
            }     
            GameBoard.printBoard();
            console.log(winner);
        }
        if(counter == 9){
            console.log("tie");
        }
    }
    return {newGame, transTurn, checkWin, currTurn};   
}


const currGame = game();
currGame.newGame("Phum", "Fiona", true);


