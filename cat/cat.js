//测试红边
function redBorder() {
    document.querySelectorAll('*').forEach(function(element) {
        element.style.border = element.style.border === '1px solid red' ? 'none' : '1px solid red';
    });
}

//鼠标拖尾
function spark() {
    const spark = document.querySelector(".spark");
    const sparkle = (e) => {
        if (Math.random() > 1 / 2) return; // making the sparkle appear 1/2 time
        const randomX = e.clientX + Math.ceil(Math.random() * 40 - 20);
        const randomY = e.clientY + Math.ceil(Math.random() * 40 - 20);
        const randomClass = ["frame","fadeout","frame","fadeout","fadeout","fadeout_green",];

        const newDiv = document.createElement("div");
        ['sparkle_box', randomClass[Math.floor(Math.random() * randomClass.length)]].forEach(className => {
            newDiv.classList.add(className)
        })
        // newDiv.classList.add("ten");
        // newDiv.classList.add(randomClass[Math.floor(Math.random() * randomClass.length)]);
        newDiv.style.left = `${randomX}px`;
        newDiv.style.top = `${randomY}px`;
        newDiv.style.opacity = `${Math.ceil(Math.random() * 50) * 0.02}`; // 透明度
        spark.appendChild(newDiv);

        setTimeout(() => {
            spark.removeChild(newDiv);
        }, Math.ceil(Math.random() * 500));
    };
    ['mousemove', 'touchmove'].forEach(event => spark.addEventListener(event, sparkle))
    // wrapper.addEventListener("mousemove", sparkle);
    // wrapper.addEventListener("touchmove", sparkle);
}


window.onload = function() {
    catpart();
    catPosition();
    spark();
    selectCats();
}


//渲染猫猫的各个部分
id=2;
function catpart(){
    const parts = ["head", "body", "tail", "leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    parts.forEach(function(partId) {
        const part = document.getElementById(partId);
        if (partId.startsWith("leg")) { partId = "leg"; }
        part.style.backgroundImage = "url('asset/cat/" + id + partId + ".png')";
    });
}
// 选择猫猫
function selectCats() {
    var select = document.querySelector('.select');
    var selectItems = document.querySelector('.select-items');

    select.addEventListener('click', function () {
        selectItems.style.display = selectItems.style.display === 'none' ? 'block' : 'none';
    });
    select.addEventListener('mouseover', function () {
        selectItems.style.display = 'block';
    });
    select.addEventListener('mouseout', function (event) {
        if (!select.contains(event.relatedTarget)) {
            selectItems.style.display = 'none';
        }
    });
    selectItems.addEventListener('click', function (event) {
        var selectedDiv = select.querySelector('.selected');
        selectedDiv.textContent = event.target.textContent;
        var img = document.createElement('img');
        img.src = './asset/cat/' + event.target.getAttribute('data-value') + 'head.png';
        selectedDiv.appendChild(img);

        console.log('选择了' + event.target.textContent + '猫猫');
        id = event.target.getAttribute('data-value');
        catpart();
        selectItems.style.display = 'none';
    });
    selectItems.addEventListener('mouseover', function (event) {
        var cat_select = document.getElementById('preview');
        cat_select.style.display = 'block';
        cat_select.src = './asset/cat/' + event.target.getAttribute('data-value') + 'head.png';
    });
    selectItems.addEventListener('mouseout', function (event) {
        document.getElementById('preview').style.display = 'none';
    });
}
//随机猫猫
function randomCat() {
    id = Math.floor(Math.random() * 8) + 1;
    catpart();
    document.getElementById("select_cat").selectedIndex = 0; // 重置 select cat 选择框
}
//抚摸猫猫，播放喵喵声
function changeHead() {
    var meow=new Audio('audio/meow.wav')
    meow.play();
    head.style.backgroundImage = "url('asset/cat/"+id+"meow.png')";
    setTimeout(function() {
        head.style.backgroundImage = "url('asset/cat/"+id+"head.png')";
    }, 500); // 0.5 秒后恢复原来的头部图片
}



//定位猫猫
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
//移动
document.addEventListener('click',moveto);
dire=1; //方向，1为右，-1为左
function moveto(event) {
    if (!event.target.classList.contains('spark')) {
        return; // 如果点击事件的目标不是 class=spark 的元素，则不执行后续操作
    }
    // if (event.target.tagName.toLowerCase() !== 'body') {
    //     return; // 如果点击事件的目标不是 body 元素 背景，则不执行后续操作
    // }
    document.removeEventListener('click',moveto);
    var cat = document.getElementById('cat');
    offsetX = event.clientX - catx;
    offsetY = event.clientY - caty;
    if (dire*offsetX<0) {
        dire*=-1;
        mirrorCat();
    }
    console.log('向右'+ offsetX + ', 向下'+ offsetY);
    catx = event.clientX;
    caty = event.clientY;

    var speed = 100;
    distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    var duration = distance / speed * 1000; // 运动时间

    const destination = document.getElementById('destination'); // 显示目的地标点
    destination.style.display = 'block';
    destination.style.left = event.clientX - 25 + 'px';
    destination.style.top = event.clientY - 50 + 'px';

    setTimeout(function() {
        cat.style.transitionDuration = duration + "ms";
        catPosition();
        legsAnimation();
        setTimeout(function() {
            legsAnimation();
            document.addEventListener('click',moveto);
            destination.style.display = 'none';
        }, duration*0.8);
    },1);
    cat.style.transitionDuration = 0+"ms";
}
//猫猫换向
var mirrored = false;
function mirrorCat() {
    var cat = document.getElementById('cat');
    mirrored = !mirrored; // toggle
    cat.style.transform = mirrored ? "scaleX(-1) translateX(-150px)" : "none";
}
//四肢动作
function legsAnimation() {
    const legs = ["leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    legs.forEach(function(legId,index) {
        const leg = document.getElementById(legId);
        leg.style.animation = leg.style.animation === '' ? 'legSwing 0.5s infinite alternate ease-in-out' : '';
        if (index === 1 || index === 2) { leg.style.animationDelay = "-0.5s"; }
    });
}

