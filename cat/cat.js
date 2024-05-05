function redBorder() {
    document.querySelectorAll('*').forEach(function(element) {
        element.style.border = element.style.border === 'none' ? '1px solid red' : 'none';
    });
}
window.onload = function() {
    catpart();
    catPosition();
}
id=1;
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
document.addEventListener('click',moveto);
dire=1; //方向，1为右，-1为左
function moveto(event) {
    document.removeEventListener('click',moveto);
    var cat = document.getElementById('cat');
    offsetX = event.clientX - catx;
    offsetY = event.clientY - caty;
    // console.log('前'+ dire);
    if (dire*offsetX<0) {
        dire*=-1;
        mirrorCat();
    }
    // console.log('后'+ dire);
    console.log('向右'+ offsetX + ', 向下'+ offsetY);
    catx = event.clientX;
    caty = event.clientY;

    var speed = 100;
    distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    var duration = distance / speed * 1000;
    setTimeout(function() {
        cat.style.transitionDuration = duration + "ms";
        catPosition();
        legsAnimation();
        setTimeout(function() {
            legsAnimation();
            document.addEventListener('click',moveto);
        }, duration*0.8);
    },1);
    cat.style.transitionDuration = 0+"ms";
}
function catpart(){
    const parts = ["head", "body", "tail", "leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    parts.forEach(function(partId) {
        const part = document.getElementById(partId);
        if (partId.startsWith("leg")) { partId = "leg"; }
        part.style.backgroundImage = "url('asset/cat/" + id + partId + ".png')";
    });
}
function changeHead() {
    var meow=new Audio('audio/meow.wav')
    meow.play();
    head.style.backgroundImage = "url('asset/cat/"+id+"meow.png')";
    setTimeout(function() {
        head.style.backgroundImage = "url('asset/cat/"+id+"head.png')";
    }, 500); // 0.5 秒后恢复原来的头部图片
}
function changeCat() {
    id = Math.floor(Math.random() * 6) + 1;
    catpart();
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
        leg.style.animation = leg.style.animation === '' ? 'legSwing 0.5s infinite alternate ease-in-out' : '';
        if (index === 1 || index === 2) { leg.style.animationDelay = "-0.5s"; }
    });
}
