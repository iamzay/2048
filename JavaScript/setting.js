var btn_container=document.querySelector("#right");
var btns=btn_container.children;
var i;

// 显示玩家上次设置的键位，并为每一个按键添加点击事件
for(i=0;i<btns.length;++i){
    btns[i].addEventListener("click",configure);
    switch(btns[i].id){
    case 'left-btn':
        btns[i].textContent=window.opener.key.leftStr;
        break;
    case 'right-btn':
        btns[i].textContent=window.opener.key.rightStr;
        break;
    case 'up-btn':
        btns[i].textContent=window.opener.key.upStr;
        break;
    case 'down-btn':
        btns[i].textContent=window.opener.key.downStr;
    }
}

function configure(event){
    var target=event.target;

    function changeKey(event){

        // 键值和字符串的映射
        var keyCodeMap={
            8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
            34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
            48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
            61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
            77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
            96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
            106: "*", 107:"+", 109:"-", 110:".", 111: "/",
            112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
            144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
        };

        // 更新字符串
        target.textContent=keyCodeMap[event.keyCode];

        // 设置键值
        switch(target.id){
        case 'left-btn':
            window.opener.key.left=event.keyCode;
            window.opener.key.leftStr=target.textContent;
            break;
        case 'right-btn':
            window.opener.key.right=event.keyCode;
            window.opener.key.rightStr=target.textContent;
            break;
        case 'up-btn':
            window.opener.key.up=event.keyCode;
            window.opener.key.upStr=target.textContent;
            break;
        case 'down-btn':
            window.opener.key.down=event.keyCode;
            window.opener.key.downStr=target.textContent;
        }

        // 移除键盘事件
        document.removeEventListener("keydown",changeKey);
    }

    target.textContent="...";

    // 当玩家点击了某个按键后添加一个键盘事件，用来读取玩家设置的键值
    document.addEventListener("keydown",changeKey);
}
