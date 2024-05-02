function redBorder() {
    var elements = document.querySelectorAll('*');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].style.border==='none') {
            elements[i].style.border = '1px solid red';
        } else {
            elements[i].style.border = 'none';
        }
    }
}
window.onload = function() {
    cat();
    catPosition();
}
id=1;
// let catx = 100;
// let caty = 100;
// catx = Math.max(-window.innerWidth / 2 + 75, Math.min(window.innerWidth / 2 - 75, catx));
// caty = Math.max(-window.innerHeight / 2 + 75, Math.min(window.innerHeight / 2 - 75, caty));
// function catPosition() {
//     var cat = document.getElementById('cat');
//     catTop = window.innerHeight / 2 - 75 + caty;
//     catLeft = window.innerWidth / 2 - 75 + catx;
//     cat.style.top = catTop + 'px';
//     cat.style.left = catLeft + 'px';
// }
// document.addEventListener('click', function(event) {
//     var mouseX = event.clientX; // 获取鼠标点击位置相对于浏览器窗口的水平坐标
//     var mouseY = event.clientY; // 获取鼠标点击位置相对于浏览器窗口的垂直坐标
//     console.log('catx:'+ catx + ', caty:'+ caty);
//     console.log('点击位置的坐标：(' + mouseX + ', ' + mouseY + ')');
//     catx = mouseX - window.innerWidth / 2;
//     caty = mouseY - window.innerHeight / 2;
//     console.log('catx:'+ catx + ', caty:'+ caty);
//
//     var speed = 100;
//     var distance = Math.sqrt(catx * catx + caty * caty);
//     var duration = distance / speed * 1000;
//
//     var cat = document.getElementById('cat');
//     // Move cat to clicked position
//     cat.style.transitionDuration = duration + "ms";
//     catPosition();
// });
let catx = window.innerWidth / 2 + 0;
let caty = window.innerHeight / 2 + 0;
function catPosition() {
    var cat = document.getElementById('cat');
    catx = Math.max(75, Math.min(window.innerWidth - 75, catx));
    caty = Math.max(75, Math.min(window.innerHeight - 75, caty));
    catTop = caty - 75;
    catLeft = catx - 75;
    cat.style.top = catTop + 'px';
    cat.style.left = catLeft + 'px';
}
document.addEventListener('click', function(event) {
    offsetX = event.clientX - catx;
    offsetY = event.clientY - caty;
    // a=1;
    // if(offsetX<0){
    //     b=-1;
    //     if(a!=b){
    //         mirrorCat();
    //     }
    //     a=b;
    // }
    // if(offsetX>0){
    //     b=1;
    //     if(a!=b){
    //         mirrorCat();
    //     }
    //     a=b;
    // }
    console.log('offsetX:'+ offsetX + ', offsetY:'+ offsetY);
    catx = event.clientX;
    caty = event.clientY;

    var speed = 100;
    distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    var duration = distance / speed * 1000;

    var cat = document.getElementById('cat');
    // Move cat to clicked position
    cat.style.transitionDuration = duration + "ms";
    catPosition();
    legsAnimation();
    setTimeout(function() {
        legsAnimation();
    }, duration*0.8);
});
function cat(){
    const parts = ["head", "body", "tail", "leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    parts.forEach(function(partId) {
        const part = document.getElementById(partId);
        if (partId.startsWith("leg")) { partId = "leg"; }
        part.style.backgroundImage = "url('asset/cat/" + id + partId + ".png')";
    });
}
function changeHead() {
    head.style.backgroundImage = "url('asset/cat/"+id+"meow.png')";
    setTimeout(function() {
        head.style.backgroundImage = "url('asset/cat/"+id+"head.png')";
    }, 500); // 0.5 秒后恢复原来的头部图片
}
function changeCat() {
    id = Math.floor(Math.random() * 6) + 1;
    cat();
}
var mirrored = false;
function mirrorCat() {
    var cat = document.getElementById('cat');
    mirrored = !mirrored; // toggle
    cat.style.transform = mirrored ? "scaleX(-1) translateX(-150px)" : "none";
}

function legsAnimation() {
    const legs = ["leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    legs.forEach(function(legId,index) {
        const leg = document.getElementById(legId);
        if (leg.style.animation==='') {
            leg.style.animation = 'legSwing 0.5s infinite alternate ease-in-out'; // 开始动画
            if (index===1||index===2) { leg.style.animationDelay = "-0.5s"; } //错开
        } else {
            leg.style.animation = ''; // 停止动画
        }
    });
}
