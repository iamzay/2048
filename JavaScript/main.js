// 分数即分数容器
var score=0,scoreElem=document.querySelector("#score");
var bestsore=0,bestElem=document.querySelector("#best-score");

// 网格的间距和格子大小,根据浏览器尺寸调整
var gridGutter=12,
    cellSize=98;

// 保存每个格子的值
var board=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

// 保存16个tile元素的引用,避免过多的dom查询操作
var tiles=[];

// 保存控制游戏移动的键位
var key={
    left:37,
    up:38,
    right:39,
    down:40,
    leftStr:"left", // 键值对应的字符串
    rightStr:"right",
    upStr:"up",
    downStr:"down"
};

window.onload=init;

function init(){
    var i,j;
    var container=document.querySelector(".game-container");
    var gridCells=container.children;
    var index;


    // 生成16个tile并隐藏
    for(i=0;i<4;++i){
        for(j=0;j<4;++j){
            index=i*4+j;
            tiles[index]=document.createElement("div");
            tiles[index].classList.add("tile");
            hideTile(tiles[index],i,j);
            container.appendChild(tiles[index]);
        }
    }

    prepareForMobile();

    newGame();

    // 添加按键(new game)点击事件
    var button=document.querySelector("#restart-button");
    button.addEventListener("click",newGame);

    // 为设置按键添加事件
    var setting=document.querySelector("#setting-button");
    setting.addEventListener("click",newWindwoInit);

    window.addEventListener("resize",prepareForMobile);
}

// 打开键位设置的窗口后初始化该窗口
function newWindwoInit(){
    window.open("setting.html","setting","height=400,width=400,left=400,top=100,location=no");
}

function newGame(){

    // 更新最好成绩
    if(score>bestsore){
        bestElem.textContent=score.toString();
    }

    // 如果存在游戏结束的提示，则移除之
    if(document.querySelector(".gameover-container")){
        var game_container=document.querySelector(".game-container");
        game_container.removeChild(document.querySelector(".gameover-container"));
    }

    // 初始化分数
    score=0;
    var i,j;

    for(i=0;i<4;++i){
        board[i]=[0,0,0,0];
    }

    // 重新显示面板
    updateBoard();

    // 随机生成两个数并显示
    var cell,number;

    for(i=0;i<2;++i){
        cell=generateCellPos();
        number=Math.random()>0.8?4:2;
        board[cell.row][cell.col]=number;
        showNumber(cell.row,cell.col,number);
    }

    document.addEventListener("keydown",moveTiles);
}

function generateCellPos(){
    var x,y;

    do{
        x=Math.floor(Math.random()*4);
        y=Math.floor(Math.random()*4);
    } while(!isCellEmpty(x,y))

    return {"row":x,"col":y};
}

function isCellEmpty(row,col){
    return !board[row][col];
}

function canMoveLeft(){

    for(var i=0;i<4;++i){

        for(var j=1;j<4;++j){

            if(board[i][j]){

                if(board[i][j]==board[i][j-1]||!board[i][j-1]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveRight(){
    for(var i=0;i<4;++i){

        for(var j=2;j>=0;--j){

            if(board[i][j]){

                if(board[i][j+1]==board[i][j]||!board[i][j+1]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown(){
    for(var i=0;i<3;i++){

        for(var j=0;j<4;++j){

            if(board[i][j]){

                if(board[i][j]==board[i+1][j]||!board[i+1][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveUp(){
    for(var i=1;i<4;++i){

        for(var j=0;j<4;++j){

            if(board[i][j]){

                if(board[i][j]==board[i-1][j]||!board[i-1][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

// 将格子往左移
function moveLeft(){
    var k,
        left,
        tile;

    /*
     * 指示每个位置上的格子是否已经合并过
     * 若是，则后面的格子无法与之合并
     */
    var merged=[];
    var addition=0;

    for(k=0;k<4;++k){
        merged[k]=[0,0,0,0];
    }

    for(var i=0;i<4;++i){

        for(var j=1;j<4;++j){

            /*
             * 向左找到第一个非空格子，若格子值不等于要移动的值，则移动到其右侧的空格
             * 若格子值等于要移动的值且要移到的格子未曾合并过，则合并
             */
            for(k=j-1;k>=0&&!board[i][k];--k)
                ;

            tile=tiles[i*4+j];
            left=parseFloat(tile.style.left);

            if(k<0||((board[i][k]!=board[i][j]||merged[i][k])&&k<j-1)){
                board[i][k+1]=board[i][j];
                animation(tile,["left",left,left-(cellSize+gridGutter)*(j-k-1)],10);
                board[i][j]=0;
            } else if(board[i][k]==board[i][j]){
                board[i][k]*=2;
                animation(tile,["left",left,left-(cellSize+gridGutter)*(j-k)],10);
                addition+=board[i][k];
                board[i][j]=0;
                merged[i][k]=1;
            }
        }
    }

    if(addition){
        updateScore(addition);
    }
}

function moveRight(){
    var k;
    var merged=[];
    var tile,left;
    var addition=0;

    for(k=0;k<4;++k){
        merged[k]=[0,0,0,0];
    }

    for(var i=0;i<4;++i){

        for(var j=2;j>=0;--j){

            for(k=j+1;k<4&&!board[i][k];++k)
                ;

            tile=tiles[i*4+j];
            left=parseFloat(tile.style.left);

            if(k>=4||((board[i][k]!=board[i][j]||merged[i][k])&&k>j+1)){
                board[i][k-1]=board[i][j];
                animation(tile,["left",left,left+(cellSize+gridGutter)*(k-1-j)],10);
                board[i][j]=0;
            } else if(board[i][k]==board[i][j]){
                board[i][k]*=2;
                animation(tile,["left",left,left+(cellSize+gridGutter)*(k-j)],10);
                addition+=board[i][k];
                board[i][j]=0;
                merged[i][k]=1;
            }
        }
    }

    if(addition){
        updateScore(addition);
    }
}

function moveUp(){
    var k;
    var merged=[];
    var tile,
        top,
        addition=0;

    for(k=0;k<4;++k){
        merged[k]=[0,0,0,0];
    }

    for(var i=1;i<4;++i){

        for(var j=0;j<4;++j){

            for(k=i-1;k>=0&&!board[k][j];--k)
                ;

            tile=tiles[i*4+j];
            top=parseFloat(tile.style.top);

            if(k<0||((board[k][j]!==board[i][j]||merged[k][j])&&k<i-1)){
                board[k+1][j]=board[i][j];
                animation(tile,["top",top,top-(cellSize+gridGutter)*(i-k-1)],10);
                board[i][j]=0;
            } else if(board[k][j]==board[i][j]){
                board[k][j]*=2;
                animation(tile,["top",top,top-(cellSize+gridGutter)*(i-k)],10);
                addition+=board[k][j];
                board[i][j]=0;
                merged[k][j]=1;
            }
        }
    }

    if(addition){
        updateScore(addition);
    }
}

function moveDown(){
    var k;
    var merged=[];
    var tile,
        top,
        addition=0;

    for(k=0;k<4;++k){
        merged[k]=[0,0,0,0];
    }

    for(var i=2;i>=0;--i){

        for(var j=0;j<4;++j){

            for(k=i+1;k<4&&!board[k][j];++k)
                ;

            tile=tiles[i*4+j];
            top=parseFloat(tile.style.top);

            if(k>=4||((board[k][j]!=board[i][j]||merged[k][j])&&k>i+1)){
                board[k-1][j]=board[i][j];
                animation(tile,["top",top,top+(cellSize+gridGutter)*(k-1-i)],10);
                board[i][j]=0;
            } else if(board[k][j]==board[i][j]){
                board[k][j]*=2;
                animation(tile,["top",top,top-(cellSize+gridGutter)*(i-i)],10);
                addition+=board[k][j];
                board[i][j]=0;
                merged[k][j]=1;
            }
        }
    }

    if(addition){
        updateBoard(addition);
    }
}

// 在一个随机位置显示值为2的tile
function generateNumber(){
    var cell;
    cell=generateCellPos();
    board[cell.row][cell.col]=2;
    showNumber(cell.row,cell.col,2);
}

function checkGameOver(){

    // 若无法进行任何移动，则游戏结束
    if(canMoveLeft()||canMoveUp()||canMoveDown()||canMoveRight())
        return;

    document.removeEventListener("keydown",moveTiles);

    // 显示游戏结束的提示
    var game_container=document.querySelector(".game-container");
    game_container.appendChild(createGameOverWarning());
}

// 根据玩家按下的键移动方块
function moveTiles(event){

    // 暂时移除键盘事件，防止动画混乱
    document.removeEventListener("keydown",moveTiles);

    switch(event.keyCode){
    case key.left:

        if(canMoveLeft()){
            moveLeft();
            setTimeout(function(){
                updateBoard();
                generateNumber();
            },100);
        }
        break;

    case key.up:

        if(canMoveUp()){
            moveUp();
            setTimeout(function(){
                updateBoard();
                generateNumber();
            },100);
        }
        break;

    case key.down:

        if(canMoveDown()){
            moveDown();
            setTimeout(function(){
                updateBoard();
                generateNumber();
            },100);
        }
        break;

    case key.right:

        if(canMoveRight()){
            moveRight();
            setTimeout(function(){
                updateBoard();
                generateNumber();
            },100);
        }
        break;

    // 没有default
    }

    setTimeout(function(){
        document.addEventListener("keydown",moveTiles);
        checkGameOver();
    },150);
}

function updateScore(difference) {
    var prevAddition=document.querySelector(".score-addition");
    var container=document.querySelector(".score-container");

    if(prevAddition){
        container.removeChild(prevAddition);
    }

    score+=difference;
    scoreElem.textContent=score.toString();

    var addition=document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent="+"+difference;

    container.appendChild(addition);
}

function prepareForMobile(){

    if(window.innerWidth<=768){
        cellSize=55;
    } else {
        cellSize=98;
    }

    displayGridCells();
    updateBoard();
}

function displayGridCells(){
    var container=document.querySelector(".game-container");
    var gridCells=container.children;
    var index;

    for(i=0;i<4;++i){

        for(j=0;j<4;++j){
            index=i*4+j;
            setTileOffset(gridCells[index],i,j);
        }
    }

}
