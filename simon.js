let gameseq=[]
let userseq=[]
let started=false
let btns=["yellow","red","purple","green"]
let level=0
let h2=document.querySelector("h2")
document.addEventListener("keypress",function(){
    if(started==false){
    console.log("Game started")
started=true
levelup()
    }
})
function btnflash(btn){
btn.classList.add("flash")
setTimeout(function(){
    btn.classList.remove("flash");
},500)
}
function levelup(){
    userseq=[]
level++
h2.innerText=`Level ${level}`
let randidx=Math.floor(Math.random()*3)
let randcolor=btns[randidx]
let randbtn=document.querySelector(`.${randcolor}`)
// console.log(randbtn)
// console.log(randcolor)
// console.log(randidx)
gameseq.push(randcolor)
btnflash(randbtn)
}
function btnpress(){
    let btn=this
    btnflash(btn)
    let usercolor=btn.getAttribute("id")
    userseq.push(usercolor)
    // console.log(usercolor)
    console.log(gameseq)
    checkans(userseq.length-1)

}
let allbtns=document.querySelectorAll(".btn")
for(btn of allbtns){
    btn.addEventListener("click",btnpress)
}
function checkans(idx){
    // let idx=level-1
    if(userseq[idx]==gameseq[idx]){
        // console.log("same value")
     if(userseq.length==gameseq.length){
        setTimeout(levelup,1000)
    }
    }
   
    else{
        h2.innerHTML=`Game Over!Your score was <b>${level}</b><br>Press any key to start`
        document.querySelector("body").style.backgroundColor = "red";
  setTimeout(function () {
    document.querySelector("body").style.color = "white";
  }, 150);
        reset()
    }

}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}