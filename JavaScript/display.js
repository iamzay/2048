// 根据board数组的值设置显示tile
function updateBoard(){
    var index;

    for(var i=0;i<4;++i){

        for(var j=0;j<4;++j){
            index=i*4+j;

            if(!board[i][j]){
                hideTile(tiles[index]);
            } else{
                showTile(tiles[index],i,j);
                setTileColor(tiles[index],board[i][j]);
                setTileContent(tiles[index],board[i][j]);

                if(board[i][j]>=1024){
                    tiles[index].style.fontSize="38px";
                }
            }
        }
    }

    scoreElem.textContent=score.toString();
}

function showNumber(row,col,number){
    var tile=tiles[row*4+col];

    tile.parentNode.removeChild(tile);
    tile=tiles[row*4+col]=document.createElement("div");
    tile.classList.add("tile");
    setTileContent(tile,number);
    setTileColor(tile,number);
    showTile(tile,row,col);
    tile.classList.add("tile-new");

    document.querySelector(".game-container").appendChild(tile);
}

// 只能以px为单位改变元素属性
function animation(target) {
    var i,
        time=arguments[arguments.length-1],
        cnt=0;
    var changes=new Object();

    function change(){
        if(cnt==time){
            return;
        }
        var prop;
        for(prop in changes){
            target.style[prop]=(parseFloat(target.style[prop])+changes[prop])+"px";
        }
        ++cnt;
        setTimeout(arguments.callee,1);
    }

    for(i=1;i<arguments.length-1;++i){
        changes[arguments[i][0]]=(arguments[i][2]-arguments[i][1])/time;
    }

    // 认为setTimeout最小的间隔是10ms
    setTimeout(change,1);


}
