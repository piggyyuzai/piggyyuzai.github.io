window.onload = function() {
    cat();
}
var id=1;
var mirrored = false;
var catinfo={

}
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
function mirrorCat() {
    var cat = document.getElementById('cat');
    mirrored = !mirrored; // toggle
    cat.style.transform = mirrored ? "scaleX(-1)" : "none";
}

function legsAnimation() {
    const legs = ["leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    legs.forEach(function(legId,index) {
        const leg = document.getElementById(legId);
        if (leg.style.animation==='') {
            leg.style.animation = 'legSwing 1s infinite alternate ease-in-out'; // 开始动画
            if (index===1||index===2) { leg.style.animationDelay = "-1s"; } //错开
        } else {
            leg.style.animation = ''; // 停止动画
        }
    });
}
