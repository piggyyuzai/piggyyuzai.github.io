//消息列表
let msgList = [];
// Display initial messages
msgList.forEach(msg => {
    addMessage(msg.role, msg.content);
});

// 在页面加载时从本地存储加载历史消息
window.onload = function() {
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
    addMessage('reply','你好，我是小猪雨崽，请问有什么可以帮助你的吗？');
};

// 在发送消息时保存消息列表到本地存储
function saveMessagesToLocalStorage() {
    localStorage.setItem('msgList', JSON.stringify(msgList));
}

//添加消息框到页面
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
        messageDiv.innerHTML = `<img src="${role === 'me' ? 'https://piggyyuzai.github.io/KleeWeb/img/welcome.gif' : 'https://piggyyuzai.github.io/piggy.jpg'}">
                                ${content}`;
                                // <strong>${role}: </strong>${content}`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 为message设置唯一标识符
        const messageId = 'message-' + Date.now() + '-' + Math.random();
        messageDiv.dataset.messageId = messageId;
        return messageId;
    }
}

//发送消息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value.trim();
    if (messageContent !== '') {
        const newMsg = { role: 'me', content: messageContent };
        msgList.push(newMsg);
        addMessage('me', messageContent);
        messageInput.value = '';
        saveMessagesToLocalStorage(); // 保存消息到本地存储
        //思考提示
        const thinking = addMessage('reply', '小猪雨崽在思考哦，请稍等...');//思考提示
        //post
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer Link_D0p6K71X31nSGnsqoBJvuNE0zSALVDeY2N00cvLKWs'
            },
            body: JSON.stringify({ app_code: 'XZ1s42iz', messages: [{ role: 'user', content: messageContent }] })
        };
        fetch('https://api.link-ai.chat/v1/chat/completions', options)
            .then(response => response.json())
            .then(response => {
                const replyContent = response.choices[0].message.content;
                const replyMsg = { role: 'reply', content: replyContent };
                hideMessage(thinking); // 隐藏思考提示
                msgList.push(replyMsg);
                addMessage('reply', replyContent);
                saveMessagesToLocalStorage(); // 在接收到回复后保存消息到本地存储
            })
            .catch(error => {
                // console.error('Error sending message:', error);
                addMessage('reply','Error sending message:'+error);
                hideMessage(thinking); // 隐藏思考提示
                const errMsg = { role: 'reply', content: '请不要发送违规、敏感等信息' };
                addMessage('reply','请不要发送违规、敏感等信息');
                msgList.push(errMsg)
                saveMessagesToLocalStorage();
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

//删除历史记录
delHistory.addEventListener('click', function () {
    localStorage.removeItem('msgList');
    localStorage.setItem('msgList', JSON.stringify([])); // 将msgList设置为空数组
    location.reload(); // 刷新页面
})

// 设置窗口显示状态
function togglePopup() {
    var popup = document.getElementById('settings-popup');
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
