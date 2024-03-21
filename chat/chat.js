let msgList = [];

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
    // 如果是第一次发送消息，则显示当前日期和时间
    const currentDate = new Date().toLocaleString();
    addMessage('',currentDate);
    addMessage('reply','你好，我是小猪雨崽，请问有什么可以帮助你的吗？');
};

// 在发送消息时保存消息列表到本地存储
function saveMessagesToLocalStorage() {
    localStorage.setItem('msgList', JSON.stringify(msgList));
}

function addMessage(role, content) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');

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

        // 设置唯一标识符
        const messageId = 'message-' + Date.now() + '-' + Math.random();
        messageDiv.dataset.messageId = messageId;
        return messageId;
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value.trim();
    if (messageContent !== '') {
        const newMsg = { role: 'me', content: messageContent };
        msgList.push(newMsg);
        addMessage('me', messageContent);
        messageInput.value = '';
        saveMessagesToLocalStorage(); // 保存消息到本地存储

        const thinking = addMessage('reply', '小猪雨崽在思考哦，请稍等...');//思考提示

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
                console.error('Error sending message:', error);
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

// Display initial messages
msgList.forEach(msg => {
    addMessage(msg.role, msg.content);
});
