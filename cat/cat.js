window.onload = function() {
    randomBg();
    randomCat();
    spark();
    selectCats();
}

// 测试红边
function redBorder() {
    document.querySelectorAll('*').forEach(function(element) {
        element.style.border = element.style.border === '1px solid red' ? 'none' : '1px solid red';
    });
}

// 鼠标拖尾
function spark() {
    const spark = document.querySelector(".spark");
    const sparkle = (e) => {
        if (Math.random() > 1 / 2) return; // making the sparkle appear 1/2 time
        const randomX = e.clientX + Math.ceil(Math.random() * 40 - 20);
        const randomY = e.clientY + Math.ceil(Math.random() * 40 - 20);
        const randomClass = ["frame","fadeout","frame","fadeout","fadeout","fadeout_green",];
        // 随机方块
        const newDiv = document.createElement("div");
        ['sparkle_box', randomClass[Math.floor(Math.random() * randomClass.length)]].forEach(className => {
            newDiv.classList.add(className)
        })
        newDiv.style.left = `${randomX}px`;
        newDiv.style.top = `${randomY}px`;
        newDiv.style.opacity = `${Math.ceil(Math.random() * 50) * 0.02}`; // 透明度
        spark.appendChild(newDiv);

        setTimeout(() => {
            spark.removeChild(newDiv);
        }, Math.ceil(Math.random() * 500));
    };
    ['mousemove', 'touchmove'].forEach(event => spark.addEventListener(event, sparkle))
}

// 随机背景
function randomBg() {
    random = Math.floor(Math.random() * 19) + 1;
    var img = new Image();
    img.src = "./asset/background/" + random + ".png";
    img.onload = function() {
        if (this.width < 256) {
            background2.style.backgroundImage = "url('"+this.src+"')";
            background2.style.display = 'block';
            background3.style.display = 'none';
        } else {
            background3.src = this.src;
            background2.style.display = 'none';
            background3.style.display = 'block';
        }
        console.log('随机背景：' + random);
    }
    // document.body.background = "./asset/background/" + random + ".png";
}

// 猫猫对话
msgList = [];
function cattalk(){
    var inputmsg = document.getElementById("input").value;
    if(input!== "") {
        input.value = "";
        reply.style.display = "block";
        paw.style.display = "block";
        reply.innerHTML = "kitten is thinking..."
        paw.style.top = -(reply.clientHeight + 60)+'px'; // 关闭消息按钮位置
        msgList.push({ role: 'user', content: inputmsg });
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Link_D0p6K71X31nSGnsqoBJvuNE0zSALVDeY2N00cvLKWs'
            },
            // body: JSON.stringify({ app_code: 'XZ1s42iz', messages: [{ role: 'user', content: inputmsg }] }),
            body: JSON.stringify({ app_code: 'XZ1s42iz', messages: msgList.slice(-10) }),//取最后10项，联系上下文
        };
        fetch('https://api.link-ai.chat/v1/chat/completions', options)
            .then(response => response.json())
            .then(response => {
                const replymsg = response.choices[0].message.content.replace(/\n/g, '<br>'); // 换行符转义
                msgList.push({ role: 'assistant', content: replymsg });
                reply.innerHTML = replymsg;
                paw.style.top = -(reply.clientHeight + 60)+'px'; // 关闭消息按钮位置
            })
            .catch(error => {
                reply.innerHTML = "消息发送失败或违规！"
                paw.style.top = -(reply.clientHeight + 60)+'px'; // 关闭消息按钮位置
            });
    }
}

// 喂食
function Feed() {
    foodimg = document.createElement('img');
    foodimg.src = `./asset/food/${Math.floor(Math.random() * 10) + 1}.png`;
    foodimg.id = "food";
    foodimg.style.top = caty+"px";
    foodimg.style.left = mirrored ? catx - 65 + "px" : catx + "px";
    feed.appendChild(foodimg);
    // setTimeout(changeHead, 2000);
}

// 摇摇乐
coined=false;
function shake() {
    if(coined) return;
    coined=true;
    coin.style.display="block";
    coin.style.animation="coin 1s infinite";
    setTimeout(function(){
        coin.style.animation="none";
    },1000);
    setTimeout(function(){
        coin.style.display="none";
    },2500);
    setTimeout(function(){
        boxback.style.animation="boxback 2s infinite";
        boxcat.style.animation="cat 2s infinite";
        boxpaw.style.animation="paw 2s infinite";
        setTimeout(function(){
            boxback.style.animation="none";
            boxcat.style.animation="none";
            boxpaw.style.animation="none";
            coined=false;
        },2000);
    },1000);
}

// 渲染猫猫身体各个部分
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
        id = event.target.getAttribute('data-value'); //更新id
        var catname = event.target.textContent;
        console.log('选择了 ' + catname + ' 猫猫');

        var selectedDiv = select.querySelector('.selected'); // 选中项
        selectedDiv.textContent = catname;
        if (event.target.textContent === 'Random') { randomCat(); }
        var img = document.createElement('img');
        img.src = './asset/cat/' + event.target.getAttribute('data-value') + 'head.png';
        selectedDiv.appendChild(img);

        catpart();
        selectItems.style.display = 'none';
    });
    selectItems.addEventListener('mouseover', function (event) {
        preview.style.display = 'block'; // 预览图片
        preview.src = './asset/cat/' + event.target.getAttribute('data-value') + 'head.png';
    });
    selectItems.addEventListener('mouseout', function (event) {
        document.getElementById('preview').style.display = 'none';
    });
}
// 随机猫猫
function randomCat() {
    id = Math.floor(Math.random() * 10) + 1;
    catpart();
}
// 抚摸猫猫，播放喵喵声
function changeHead() {
    var meow=new Audio('audio/meow.wav')
    meow.play();
    head.style.backgroundImage = "url('asset/cat/"+id+"meow.png')";
    setTimeout(function() {
        head.style.backgroundImage = "url('asset/cat/"+id+"head.png')";
    }, 500); // 0.5 秒后恢复原来的头部图片
}
// 定位猫猫
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
// 移动
dire=1; // 方向，1为右，-1为左
speed = 100; // 移动速度
moving = false; // 移动状态
animation = 1; // 腿部动画计数
function moveto(x,y,duration) {
    offsetX = x - catx; offsetY = y - caty; // 移动距离
    console.log('向右'+ offsetX + ', 向下'+ offsetY);
    if (dire*offsetX<0) {
        dire*=-1;
        mirrorCat(); // 换向
    }
    if (duration === null) {
        duration = Math.sqrt(offsetX * offsetX + offsetY * offsetY) / speed * 1000; // 运动时间
    }
    catx = x; caty = y; // 猫猫移动终点
    if (Math.sqrt(offsetX * offsetX + offsetY * offsetY) !== permove) { // 长按鼠标不出现目的地标点
        destination.style.display = 'block'; // 显示目的地 标点
        destination.style.top = y - 50 + 'px';
        destination.style.left = x - 25 + 'px';
        // destination.style.cssText = `display : block;left : ${x - 25}px;top : ${y - 50}px;`;
    }

    setTimeout(function() {
        cat.style.transitionDuration = duration + "ms"; // 运动时间
        catPosition(); // 更新猫猫位置
        // legsAnimation();
        // keyboardlegsAnimation(); // 鼠标长按时，设置腿部动画
        setTimeout(function() { // 到达终点后
            document.addEventListener('click',click);
            destination.style.display = 'none';
            // legsAnimation();
        }, duration*0.8);
    },1);
    cat.style.transitionDuration = 0+"ms"; // 重置变换时间为0，避免影响下一次运动

    // 键盘长按时，设置腿部动画
    // 相当于补间动画
    function keyboardlegsAnimation() {
        const legs = ["leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
        legs.forEach(function(legId,index) {
            const leg = document.getElementById(legId);
            if (index === 1 || index === 2) { leg.style.animationDelay = animation * (-0.1)+"s"; } // 错开腿部动画
            if (index === 0 || index === 3) { leg.style.animationDelay = (animation - 5) * (-0.1)+"s"; } // 错开腿部动画
        });
        animation++;
    }
}
// 猫猫换向
var mirrored = false;
function mirrorCat() {
    var cat = document.getElementById('cat');
    mirrored = !mirrored; // toggle
    cat.style.transform = mirrored ? "scaleX(-1) translateX(-150px)" : "none"; // 翻转
    reply.style.transform = mirrored ? "scaleX(-1)" : "none"; // 翻转
    paw.style.transform = mirrored ? "scaleX(-1) translateX(328px)" : "none"; // 翻转
}
// 四肢动作
function legsAnimation() {
    const legs = ["leg-front-left", "leg-front-right", "leg-back-left", "leg-back-right"];
    legs.forEach(function(legId,index) {
        const leg = document.getElementById(legId);
        leg.style.animation = leg.style.animation === '' ? 'legSwing 0.5s infinite alternate ease-in-out' : '';
        if (index === 1 || index === 2) { leg.style.animationDelay = "-0.5s"; } // 错开腿部动画
    });
}


// 鼠标点击移动
document.addEventListener('click',click);
function click(event) {
    if (!event.target.classList.contains('spark')) {
        return; // 如果点击事件的目标不是 class=spark 的元素，则不执行后续操作
    }
    // if (event.target.tagName.toLowerCase() !== 'body') {
    //     return; // 如果点击事件的目标不是 body 元素 背景，则不执行后续操作
    // }
    if (moving) { return; }
    moving = true; // 开始移动

    legsAnimation();
    setTimeout(function() {
        legsAnimation();
        moving = false; // 移动结束
    }, Math.sqrt((event.clientX-catx) * (event.clientX-catx) + (event.clientY-caty) * (event.clientY-caty)) / speed * 1000 * 0.8);
    moveto(event.clientX,event.clientY,null);
}
// 键盘控制移动
permove = 10; // 移动距离
isKeyDown = false;
talkk = false; // 输入框状态
document.addEventListener("keydown", function (event) { //判断按下的键
    x = catx; y = caty;
    // if (!isKeyDown) { legsAnimation(); } // 开始移动时，设置腿部动画
    if (talkk) {
        return; // 输入框状态下，不响应键盘事件
    }
    switch (event.key) {
        case "w": y -=permove; if (!isKeyDown) { legsAnimation(); }isKeyDown = true; break;
        case "a": x -=permove; if (!isKeyDown) { legsAnimation(); }isKeyDown = true; break;
        case "d": x +=permove; if (!isKeyDown) { legsAnimation(); }isKeyDown = true; break;
        case "s": y +=permove; if (!isKeyDown) { legsAnimation(); }isKeyDown = true; break;
    }
    moveto(x, y, null);
});
document.addEventListener("keyup", function (event) { //判断松开的键
    isKeyDown = false;
    if (talkk) {
        return; // 输入框状态下，不响应键盘事件
    }
    switch (event.key) {
        case "w":case "a":case "d":case "s":
            legsAnimation(); // 停止移动时，设置腿部动画
    }
});


// Tip窗口显示状态
function toggleTip() {
    var overlay = document.querySelector('.overlay');
    var isVisible = tip.style.display === 'block';
    tip.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
}
// talk输入框显示状态
function toggleTalk() {
    input.style.display = input.style.display === 'block' ? 'none' : 'block';
    talk.classList.toggle('active');
    talkk=!talkk;
    reply.style.display = 'none';
    paw.style.display = 'none';
}