//消息列表
let msgList = [];
// Display initial messages
msgList.forEach(msg => {
    addMessage(msg.role, msg.content);
});

// 在页面加载时从本地存储加载历史消息
window.onload = function() {
    //页面加载
    // var loader = document.querySelector('.loader-container');
    // loader.style.display = 'none';

    const savedMsgList = JSON.parse(localStorage.getItem('msgList'));
    if (savedMsgList) {
        msgList = savedMsgList;
        msgList.forEach(msg => {
            addMessage(msg.role, msg.content);
        });
        addMessage('','以上为历史消息');
    }
    //每次重新进入对话，则显示当前日期和时间
    const currentDate = new Date().toLocaleString();
    addMessage('',currentDate);
    addMessage('assistant','你好，我是小猪雨崽，请问有什么可以帮助你的吗？' +
        '<code style="">' +
        'My website: <a href="https://piggyyuzai.github.io" style="color:#ff75b5;">https://piggyyuzai.github.io</a>' +
        '</code>');
    newmsgList=[];//窗口消息
};

// 在发送消息时保存消息列表到本地存储
function saveMessagesToLocalStorage() {
    localStorage.setItem('msgList', JSON.stringify(msgList));
}
//添加消息框到页面
// function addMessage(role, content) {
//     const chatContainer = document.getElementById('chat-container');
//     const messageDiv = document.createElement('div');
//     //判断是提示还是消息
//     if (role === '') {
//         //提示
//         messageDiv.classList.add('message-divider');
//         messageDiv.textContent = content;
//         chatContainer.appendChild(messageDiv);
//     } else {
//         //消息
//         messageDiv.classList.add('message', role);
//         messageDiv.innerHTML = `<img src="${role === 'user' ? avatar : 'https://piggyyuzai.github.io/piggy.jpg'}">
//                                 ${content}`;
//                                 // <strong>${role}: </strong>${content}`;
//         chatContainer.appendChild(messageDiv);
//         chatContainer.scrollTop = chatContainer.scrollHeight;
//
//         // 为message设置唯一标识符
//         const messageId = 'message-' + Date.now() + '-' + Math.random();
//         messageDiv.dataset.messageId = messageId;
//         return messageId;
//     }
// }

function addMessage(role, content) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    //判断是提示还是消息
    if (role === '') {
        //提示
        messageDiv.classList.add('message-divider');
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
    } else {
        //消息
        messageDiv.classList.add('message', role);
        let processedContent = content.replace(/```([\s\S]+?)```/g, function(match, p1) {
            return '<code>' + p1.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>';
        });
        messageDiv.innerHTML = `<img src="${role === 'user' ? avatar : 'https://piggyyuzai.github.io/piggy.jpg'}">
                                ${processedContent}`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 为message设置唯一标识符
        const messageId = 'message-' + Date.now() + '-' + Math.random();
        messageDiv.dataset.messageId = messageId;
        return messageId;
    }
    //code右上角添加复制按钮
    const codeBlocks = document.querySelectorAll('code'); // 获取所有的code元素
    codeBlocks.forEach(codeNode => {
        codeNode.classList.add('code-block'); // 添加新的 CSS 类
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z" fill="#ffffff" p-id="4305"></path>' +
            '</svg>';
        copyButton.classList.add('copy-button'); // 添加新的 CSS 类
        copyButton.onclick = function() {
            copyToClipboard(codeNode.textContent.trim());
        };
        codeNode.appendChild(copyButton);
    });
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}






//发送消息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value.trim();
    if (messageContent !== '') {
        const newMsg = { role: 'user', content: messageContent };
        addMessage('user', messageContent);
        msgList.push(newMsg);//确认消息不违规，加入列表
        newmsgList.push(newMsg);//确认消息不违规，加入列表
        messageInput.value = '';
        //思考提示
        const thinking = addMessage('assistant', '小猪雨崽在思考哦，请稍等...');//思考提示
        //post
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Link_D0p6K71X31nSGnsqoBJvuNE0zSALVDeY2N00cvLKWs'
            },
            //body: JSON.stringify({ app_code: 'XZ1s42iz', messages: [{ role: 'user', content: messageContent }] })
            body: JSON.stringify({ app_code: 'XZ1s42iz', messages: newmsgList.slice(-10) })//取最后10项，联系上下文
        };
        fetch('https://api.link-ai.chat/v1/chat/completions', options)
            .then(response => response.json())
            .then(response => {
                const replyContent = response.choices[0].message.content;
                const replyMsg = { role: 'assistant', content: replyContent };
                hideMessage(thinking); // 隐藏思考提示
                msgList.push(replyMsg);
                newmsgList.push(replyMsg);
                addMessage('assistant', replyContent);
                saveMessagesToLocalStorage(); // 在接收到回复后保存消息到本地存储
            })
            .catch(error => {
                // console.error('Error sending message:', error);
                // addMessage('reply','Error sending message:'+errorString);
                hideMessage(thinking); // 隐藏思考提示
                addMessage('assistant','消息发送失败或涉及违规、敏感等信息');
                // const errMsg = { role: 'assistant', content: '消息发送失败或涉及违规、敏感等信息' };
                // msgList.push(errMsg)
                // saveMessagesToLocalStorage();
            });
    }
}

//隐藏消息
function hideMessage(messageId) {
    // 根据唯一标识符找到对应的消息元素
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageElement) {
        // 设置消息元素的样式为隐藏
        messageElement.style.display = 'none';
    }
}

// 设置窗口显示状态
function togglePopup() {
    var popup = document.getElementById('setting');
    var overlay = document.querySelector('.popup-overlay');
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        popup.style.display = 'block';
        overlay.style.display = 'block';

        //每次点击设置时更新历史记录长度
        // 获取浏览器缓存中msgList的长度
        const msgListLength = JSON.parse(localStorage.getItem('msgList')).length;
        // 将msgList的长度直接放置在div中
        document.getElementById('msgListLength').innerHTML = `目前有：${msgListLength} 条历史消息`;
    }
}

//删除历史记录
function delHistory() {
    var confirmed = confirm('确定要清除历史消息吗？');
    if (confirmed) {
        localStorage.removeItem('msgList');
        localStorage.setItem('msgList', JSON.stringify([])); // 将msgList设置为空数组
        location.reload(); // 刷新页面
    }
}

//聊天背景与头像
let avatar='https://piggyyuzai.github.io/KleeWeb/img/welcome.gif';
document.addEventListener('DOMContentLoaded', function () {
    const imageUpload = document.getElementById('imageUpload');
    const backgroundImage = document.getElementById('backgroundImage');

    // 每次进入页面时从浏览器缓存中读取背景图片
    backgroundImage.src=localStorage.getItem('backgroundImage') || '';
    // const cachedBackground = localStorage.getItem('backgroundImage');
    // if (cachedBackground) {
    //     backgroundImage.src = cachedBackground;
    // }
    avatar=localStorage.getItem('avatar') || 'https://piggyyuzai.github.io/KleeWeb/img/welcome.gif';
    // const cachedAvatar = localStorage.getItem('avatar');
    // if(cachedAvatar){
    //     avatar=cachedAvatar;
    // }

    // 监听文件上传变化-背景
    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                // 设置背景图片
                backgroundImage.src = reader.result;
                // 将背景图片保存到浏览器缓存中
                localStorage.setItem('backgroundImage', reader.result);
            }
        }
    });
    // 监听文件上传变化-头像
    editAvatar.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                avatar = reader.result;
                localStorage.setItem('avatar', avatar);
            }
        }
        location.reload();
    });
});
//恢复默认背景
function setDefaultBackground() {
    backgroundImage.src = '';
    localStorage.setItem('backgroundImage','');
    location.reload();
}
//默认头像
function setDefaultAvatar() {
    avatar='https://piggyyuzai.github.io/KleeWeb/img/welcome.gif';
    localStorage.setItem('avatar',avatar);
    location.reload();
}