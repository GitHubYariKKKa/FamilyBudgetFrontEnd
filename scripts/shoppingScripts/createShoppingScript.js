
var token = localStorage.getItem('token');

$("#createShopping").click(function(event) {
    event.preventDefault();
    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();
    var date = $("#date").val();
    var id = $("#forWho").val();

    console.log(productName);
    console.log(productPrice);
    console.log(date);

    $.ajax({
        type: "POST",
        url: "http://localhost:9091/shopping/create/"+id,
        headers: { "Authorization": "Bearer " + token },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "productName": productName,
            "price": productPrice,
            "buyDate": date
        })
    }).done(function(data) {
        window.location.href = "familyProfile.html";
    })
});