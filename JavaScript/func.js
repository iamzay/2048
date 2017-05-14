// 隐藏tile到方格的中心
function hideTile(tile,row,col){
    tile.style.width="0px";
    tile.style.height="0px";
    tile.textContent="";
    setHiddenTileOffset(tile,row,col);
}

// 设置tile的宽度和高度使其显示
function showTile(tile,row,col){
    setTileOffset(tile,row,col);
    tile.style.width=cellSize+"px";
    tile.style.height=cellSize+"px";
}

// 根据位置返回偏移值
function getOffset(pos){
    return (gridGutter+pos*(gridGutter+cellSize))+"px";
}

// 根据位置设置不隐藏的tile的偏移值
function setTileOffset(tile,row,col){
    tile.style.top=getOffset(row);
    tile.style.left=getOffset(col);
}

// tile隐藏时置于方格的正中间，这样从隐藏到显示能有一个从中心放大的效果
// 但是后来改成用CSS3来实现
function setHiddenTileOffset(tile,row,col){
    tile.style.top=(parseInt(getOffset(row))+cellSize/2)+"px";
    tile.style.left=(parseInt(getOffset(col))+cellSize/2)+"px";
}

// 根据tile的值获得文字的颜色
function getTileColor(value){

    if(value==2||value==4){
        return "#776e65";
    }

    return "white";
}

// 根据tile的值获得背景色
function getTileBackground(value){

    switch(value){
    case 2:
        return "#eee4da";
    case 4:
        return "#ede0c8";
    case 8:
        return "#f2b179";
    case 16:
        return "#f59563";
    case 32:
        return "#f67c5f";
    case 64:
        return "#f65e3b";
    case 128:
        return "#edcf72";
    case 256:
        return "#edcc61";
    case 512:
        return "#9c0";
    case 1024:
        return "#33b5e5";
    case 2048:
        return "#09c";
    case 4096:
        return "#a6c";
    case 8192:
        return "#93c";
    }
    return "black";
}

// 根据tile的值设置前景色和背景色
function setTileColor(tile,value){
    tile.style.color=getTileColor(value);
    tile.style.background=getTileBackground(value);
}

// 根据tile的值设置其显示的字符串
function setTileContent(tile,value){
    tile.textContent=value.toString();
}

// 返回一个游戏结束时进行提示的html片段
function createGameOverWarning(){
    var fragment=document.createDocumentFragment();
    var gameover_container=document.createElement("div");

    gameover_container.classList.add("gameover-container");

    var gameover=document.createElement("p");
    gameover.textContent="Game over!";
    gameover.classList.add("gameover");

    var retry_button=document.createElement("button");
    retry_button.textContent="Try again";
    retry_button.classList.add("retry-button");

    gameover_container.appendChild(gameover);
    gameover_container.appendChild(retry_button);

    retry_button.addEventListener("click",newGame);
    
    fragment.appendChild(gameover_container);

    return fragment;
}

function clearContainer(container) {

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
