$(document).ready(function() {
    $("#loginButton").click(function(event) {
        // Зупиняємо дійсну поведінку кнопки, щоб сторінка не перезавантажувалася
        event.preventDefault();

        // Відправляємо запит на сервер
        $.ajax({
            url: "http://localhost:9091/api/auth/login",
            method: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify( {
                "username": $("#username").val(),
                "password": $("#password").val()
            })
        })
            .done(function(data) {
                console.log(data);
                document.cookie = "user_id="+data.userId+";"
                localStorage.setItem('token', data.token);
                // Якщо запит успішний, перенаправляємо користувача на сторінку з його профілем
                window.location.href = "families.html";
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                // Якщо запит не успішний, виводимо повідомлення про помилку
                alert("Помилка: " + textStatus + " " + errorThrown);
            });
    });
});