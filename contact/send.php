<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //服务器配置
    $mail->CharSet ="UTF-8";                     //设定邮件编码
    $mail->SMTPDebug = 0;                        // 调试模式输出
    $mail->isSMTP();                             // 使用SMTP
    $mail->Host = 'smtp.qq.com';                // SMTP服务器
    $mail->SMTPAuth = true;                      // 允许 SMTP 认证
    $mail->Username = '';                // SMTP 用户名  即邮箱的用户名
    $mail->Password = '';             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = 'ssl';                    // 允许 TLS 或者ssl协议
    $mail->Port = 465;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持

    $mail->setFrom('', 'Mailer');  //发件人
    $mail->addAddress('', 'Yu');  // 收件人
    //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
    $mail->addReplyTo('', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送

    //发送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

    //下面是将前面表单中填写的数据进行转码。
    $nametemp = $_POST['name'];
    $name2 = iconv('UTF-8','GB2312',$nametemp);

    $emailtemp = $_POST['email'];
    $email2 = iconv('UTF-8','GB2312',$emailtemp);

    $subjecttemp = $_POST['subject'];
    $subject2 = iconv('UTF-8','GB2312',$subjecttemp);

    $messagetemp = $_POST['message'];
    $message2 = iconv('UTF-8','GB2312',$messagetemp);

    //下面是将数据汇总发送至邮箱
    $mail->Subject = "网站收到新留言啦~~";          // 邮件标题
    $mail->Body = "姓名：".$name2.
                  "邮箱：".$email2.
                  "主题：".$subject2.
                  "留言：".$message2;      // 邮件正文
    $mail->send();
    echo '邮件发送成功';}
catch (Exception $e) {
    echo '邮件发送失败: ', $mail->ErrorInfo;}

