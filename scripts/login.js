window.onload = function() {
    var form = document.querySelector('.form');
    var usernameInput = document.getElementById('login-username');
    var passwordInput = document.getElementById('login-password');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单提交

        var username = usernameInput.value;
        var password = passwordInput.value;

        // 进行验证
        if (username === 'piggyyuzai' && password === 'piggyyuzai') {
            window.location.href = './book/index.html'; // 验证通过，跳转到index.html页面
        }
        else {
            alert('账号或密码错误'); // 验证失败，弹出提示框
            //清空输入框
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });
}
