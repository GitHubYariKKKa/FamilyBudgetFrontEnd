
var user_id;
var token = localStorage.getItem('token');
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
    url: "http://localhost:9091/users/user/"+user_id,
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(response) {
        if (response.family.id){
            localStorage.setItem('family_id', response.family.id);
        }
        localStorage.setItem('role', response.role);
       if (response.family == null){
           $("#leaveFamily").hide();
           $("#showFamily").hide();
       }
    },
    error: function(xhr) {
        console.log(token);
    }
});


var prices = [];
var days = [];

$.ajax({
    url: "http://localhost:9091/users/user/"+ user_id +"/spending",
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(response) {
        $.each( response, function(i, shopping) {
            prices.push(parseInt(shopping.spendMoney));
            days.push(shopping.day.toString());
        });

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar', // тип графіку
            data: {
                labels:days, // мітки для осі x
                datasets: [{
                    data: prices, // дані
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1 // товщина меж стовпців
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true // початок шкали з нуля
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

$.ajax({
    url: "http://localhost:9091/users/user/"+user_id,
    method: "GET",
    headers: { "Authorization": "Bearer " + token },
    success: function(data) {
        $("#nameField").text(data.name);
        $("#fullName").text(data.surName+" "+data.name+" "+data.lastName);
        $("#email").text(data.email);
        $("#phoneNumber").text(data.phoneNumber);
        $("#address").text(data.address);
        $("#budget").text(data.budget);

        $.each(data.shoppingHistory, function(i, shopping) {
            if (!shopping.done) {
                $("#shoppingTable").append(
                    "<tr>" +
                    "<td>" + shopping.id + "</td>" +
                    "<td>" + shopping.productName + "</td>" +
                    "<td>" + shopping.price + "</td>" +
                    "<td>" + shopping.buyDate + "</td>" +
                    "<td><button id=\"myButton\"  class=\"btn btn-primary\" data-product-id=\"" + shopping.id + "\">Завершити</button></td>" +
                    "</tr>");
            }
        });
    },
    error: function(xhr) {
        console.log(token);
    }
});

$(document).on('click', '#myButton', function() {
    var productId = $(this).data('product-id');

    $.ajax({
        type: "PATCH",
        url: "http://localhost:9091/shopping/update/shopping/"+productId,
        headers: { "Authorization": "Bearer " + token },
        success: function(data) {
            console.log("success");
            var row = $("#shoppingTable tr").filter(function() {
                return $(this).find("button").data("product-id") == productId;
            });
            row.css("background-color", "green");
            row.find("[data-product-id='" + productId + "']").data("disabled", true);
        },
    });
});

$(document).on('click', '#leaveFamily', function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9091/users/user/"+ user_id +"/remover_from_family",
        headers: { "Authorization": "Bearer " + token },
        success: function(data) {
            $("#leaveFamily").hide();
        },
    });
});



