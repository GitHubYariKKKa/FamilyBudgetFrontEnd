var user_id;
var token = localStorage.getItem('token');
var family_id =  localStorage.getItem('family_id');
var role =  localStorage.getItem('role');
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
    url: "http://localhost:9091/families/family/check/budget/"+family_id,
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(data) {
        if(data.isLess){
            alert("Увага! Залишилось менше 10% бєджету на місяць!Не забудь те поповнити баланс.");
        }else{
            console.log("It's Okay");
        }
    }
});

$.ajax({
    url: "http://localhost:9091/users/inFamily/"+family_id,
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(data) {
        $("#userTable tbody").empty();
        $.each(data, function(i, user) {
            if (role === "USER" && user.id === user_id){
                $("#userTable").append(
                    "<tr>" +
                    "<td>"  + user.id + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.surName + "</td>" +
                    "<td>" + user.lastName + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + "<a href='userProfile.html' target='_blank' class=\"btn btn-dark\">Редагувати</a>" + "<a href='createShopping.html' target='_blank' class=\"btn btn-dark\">Додати покупку</a>"+ "</td>" +
                    "</tr>");
            }else if (role === "PARENT") {
                $("#userTable").append(
                    "<tr>" +
                    "<td>" + user.id + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.surName + "</td>" +
                    "<td>" + user.lastName + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + "<button id='removeButton' data-user-id=\"" + user.id + "\" class=\"btn btn-dark\">Видалити</button>" + "<a href='createShopping.html' target='_blank' class=\"btn btn-dark\">Додати покупку</a>" + "</td>" +
                    "</tr>");
            }else{
                $("#userTable").append(
                    "<tr>" +
                    "<td>" + user.id + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.surName + "</td>" +
                    "<td>" + user.lastName + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + "<a href='createShopping.html' target='_blank' class=\"btn btn-dark\">Додати покупку</a>" + "</td>" +
                    "</tr>");
            }
            console.log(user);
        });

    },
    error: function(xhr) {
        console.log(token);
    }
});

$(document).on('click', '#removeButton', function() {
    var user_id = $(this).data('user-id');
    // відправка запиту на сервер
    $.ajax({
        type: "POST",
        url: "http://localhost:9091/users/user/"+ user_id +"/remover_from_family",
        headers: { "Authorization": "Bearer " + token },
    })
});

$.ajax({
    url: "http://localhost:9091/families/family/"+family_id,
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(data) {
        console.log(data);
        $("#name").val(data.name);
        $("#actualBudget").val(data.actualBudget);
    },
    error: function(xhr) {
        console.log(token);
    }
});

$.ajax({
    url: "http://localhost:9091/users/"+ family_id +"/spending",
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(dataFromController) {
        console.log(dataFromController);

        var data = {
            labels: [],
            datasets: []
        };

        var jsonData = dataFromController;

        // Перебираємо дані та формуємо datasets та labels
        var names = Array.from(new Set(jsonData.map(item => item.name)));
        names.forEach((name, index) => {
            var moneySpentData = jsonData.filter(item => item.name === name).map(item => item.moneySpend);
            var dayData = jsonData.filter(item => item.name === name).map(item => item.day);
            var color = `rgba(${index * 100}, ${index * 50}, ${index * 25}, 0.5)`;
            data.datasets.push({
                label: name,
                data: moneySpentData,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            });
            data.labels = dayData;
        });

        // Створюємо графік
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    },
    error: function(xhr) {
        console.log(token);
    }
});

