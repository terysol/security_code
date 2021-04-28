// 선언
let key="";
let str="";
let blankCheck="";
let blankCheckCount=0;
let zCheck=0;
let oddFlag = false;

let encStr="";   // 암호화 된 문자열
let desStr="";    // 복호화 된 문자열


// 암호판 초기화
let board = new Array(5);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(5);
}


/*  암호화  */
// value 값에 입력
function handleEncryption(){
    key=document.getElementById("key").value;
    str=document.getElementById("sentence").value;
    document.getElementById('encryp').value=strEncryption(key,str);
    createTable(board);
}

function createTable(data){
    let table=document.getElementById("board");

    for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].length;j++){
            var row=`<tr>
                <td>${data[i][j]}</td>
                <td>${data[i][j]}</td>
                <td>${data[i][j]}</td>
                <td>${data[i][j]}</td>
                <td>${data[i][j]}</td>
            </tr>
            `
           
        }
        table.innerHTML+=row;
    }
    
}

// 5x5 암호판 만들기
function setBoard(key){

    let count=0;

    key+="abcdefghijklmnopqrstuvwxyz";

    // 중복제거
    const arr= key.split('')
    const set = new Set(arr);
    key=[...set].join('');

    // board에 대입입
   for(let i=0;i<board.length;i++){
        for(let j=0; j<board[i].length;j++){
            board[i][j] = key[count++];
        }
    }
}

// 공백 제거
function deleteblank(str){
    str=str.toLowerCase();
    for(let i=0;i<str.length;i++) {
        if (str.charAt(i) === ' ') {
            str = str.substring(0, i) + str.substring(i + 1, str.length)
            blankCheck += 10;
        } else {
            blankCheck += 0;
        }
        if (str.charAt(i) === "z") {
            str = str.substring(0, i) + 'q' + str.substring(i + 1, str.length);
            zCheck += 1;
        } else {
            zCheck += 0;
        }
    }
    return str;
}

// 암호화
function strEncryption(key,str){
    setBoard(key);
    str=deleteblank(str);

    let playFair = [];
    let encPlayFair=[];
    let x1=0, y1=0, x2=0, y2=0;

    for(let i=0;i<str.length;i+=2){
        let tmpArr=[];
        tmpArr[0]= str.charAt(i);
        try{
            if(str.charAt(i) === str.charAt(i+1)){
                tmpArr[1]='x';
                i--;
            }else if(i === str.length-1){
                tmpArr[1]='x';
            }else{
                tmpArr[1]=str.charAt(i+1);
            }
        }catch(err){
            tmpArr[1]='x';
            oddFlag=true;
        }
        console.log('tmpArr ' ,tmpArr);
        playFair.push(tmpArr);
    }

    for(let i=0;i<playFair.length;i++){
        let tmpArr='';
        for(let j=0;j<board.length;j++){
            for(let k=0;k<board[j].length;k++){
                if(board[j][k] === playFair[i][0]){
                    x1=j;
                    y1=k;
                }
                if(board[j][k] === playFair[i][1]){
                    x2=j;
                    y2=k;
                }

            }
        }
        if(x1===x2){
            tmpArr+=board[x1][(y1+1)%5];
            tmpArr+=board[x2][(y2+1)%5];
        }else if(y1 === y2){
            tmpArr+=board[(x1+1)%5][y1];
            tmpArr+=board[(x2+1)%5][y2];
        }else{
            tmpArr+=board[x2][y1];
            tmpArr+=board[x1][y2];
        }
        encPlayFair.push(tmpArr);
    }

    for(let i=0;i<encPlayFair.length;i++){
        encStr+=encPlayFair[i][0] + "" + encPlayFair[i][1] + " ";
    }
    console.log(encStr);
    return encStr;
}


/*  복호화  */
// 복호화
// value 값에 입력
function handleDecryption(){
    document.getElementById('decryp').value = strDecryption(key);
}

function strDecryption(key){
    for(let i=0;i<encStr.length;i++){
        if(encStr.charAt(i) === ' ' ){
            encStr=encStr.substring(0,i) + encStr.substring(i+1,encStr.length);
        }
    }

    desStr=Decryption(key,encStr,zCheck);


    for(let i=0;i<desStr.length;i++){
        if(blankCheck.charAt(i) === '1'){
            desStr = desStr.substring(0,i)+ " " + desStr.substring(i,desStr.length);
        }
    }
    return desStr;
}

// 복호화
function Decryption(key,str, zCheck){
    let playFair = [];
    let decPlayFair=[];
    let x1=0, y1=0, x2=0, y2=0;
    let lengthOddFlag=1;

    for(let i=0;i<str.length;i+=2){
        let tmpArr=[2];
        tmpArr[0]=str.charAt(i);
        tmpArr[1]=str.charAt(i+1);
        playFair.push(tmpArr);
    }

    for(let i=0;i<playFair.length;i++){
        let tmpArr=[];
        for(let j=0;j<board.length;j++){
            for(let k=0;k<board[j].length;k++){
                if(board[j][k] === playFair[i][0]){
                    x1=j;
                    y1=k;
                }
                if(board[j][k] === playFair[i][1]){
                    x2=j;
                    y2=k;
                }
            }
        }

       if(x1===x2){
           tmpArr[0] = board[x1][(y1+4)%5];
           tmpArr[1]= board[x2][(y2+4)%5];
       }else if(y1 === y2){
           tmpArr[0] = board[(x1+4)%5][y1];
           tmpArr[1] = board[(x2+4)%5][y2];
       }else{
           tmpArr[0] = board[x2][y1];
           tmpArr[1]= board[x1][y2];
       }

       decPlayFair.push(tmpArr);
       //console.log(decPlayFair);
    }

    for(let i=0;i<decPlayFair.length;i++){
        if(i !== decPlayFair.length-1 && decPlayFair[i][1] === 'x'
            && decPlayFair[i][0] === decPlayFair[i+1][0]
        ){
            desStr += decPlayFair[i][0];
        }else if(i === decPlayFair.length -1 && decPlayFair[i][1] === 'x'){
            desStr +=decPlayFair[i][0] + '';
        }else{
            desStr += decPlayFair[i][0] + "" + decPlayFair[i][1];
        }
    }
    
    for(let i=0;i<zCheck.length;i++){
        if(zCheck.charAt(i) === '1'){
            desStr = desStr.substring(0,i) + 'z' + desStr.substring(i+1,desStr.length);
        }
    }
    if(oddFlag) desStr = desStr.substring(0,desStr.length-1);
    return desStr;

}