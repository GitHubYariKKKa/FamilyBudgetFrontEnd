
var user_id;
var token = localStorage.getItem('token');
var family_id =  localStorage.getItem('family_id');
const cookies = document.cookie.split(';');
for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('user_id=')) {
        user_id = parseInt(cookie.substring('user_id='.length), 10);
        console.log(user_id);
        break;
    }
}

$.ajax({
    url: "http://localhost:9091/users",
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(data) {
        $("#userTable tbody").empty();
        $.each(data, function(i, user) {
            $("#userTable").append(
                "<tr>" +
                "<td>"  + user.id + "</td>" +
                "<td>" + user.name + "</td>" +
                "<td>" + user.surName + "</td>" +
                "<td>" + user.lastName + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + "<button id=\"addUserToFamily\" data-user-id=\"" + user.id + "\" class=\"btn btn-dark\">Додати в Сім'ю</button>"+ "</td>" +
                "</tr>");
            console.log(user);
        });
    },
    error: function(xhr) {
        console.log(token);
    }
});

$(document).on('click', '#addUserToFamily', function() {
    var user_id = $(this).data('user-id');
    console.log(user_id);
    // відправка запиту на сервер
    $.ajax({
        type: "POST",
        url: "http://localhost:9091/users/user/"+ user_id +"/add_to_family/"+family_id,
        headers: { "Authorization": "Bearer " + token },
    })
});

$("#filterUser").bind("click", function() {
    var username = $("#username").val();
    console.log(username);
    $.ajax({
        type: "GET",
        url: "http://localhost:9091/users/user/email/"+username,
        headers: { "Authorization": "Bearer " + token },
        success: function(user) {
            if (user.family == null) {
                $("#userTable tbody").empty();
                $("#userTable").append(
                    "<tr>" +
                    "<td>" + user.id + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.surName + "</td>" +
                    "<td>" + user.lastName + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + "<button id=\"addUserToFamily\" data-user-id=\"" + user.id + "\" class=\"btn btn-dark\">Додати в Сім'ю</button>" + "</td>" +
                    "</tr>");
                console.log(user);
            }else{
                alert("Цей користувач уже має Сім'ю!");
            }
        },
    })
});
