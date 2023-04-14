$(document).on('click', '#registrationButton', function() {
    var name = $("#name").val();
    var surName = $("#surName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var phoneNumber = $("#phoneNumber").val();
    var address = $("#address").val();
    var postalIndex = $("#postalIndex").val();
    var password = $("#password").val();
    var repeatedPassword = $("#repeatedPassword").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:9091/users/create/user",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "surName": surName,
            "lastName": lastName,
            "email": email,
            "address": address,
            "phoneNumber": phoneNumber,
            "postalIndex":postalIndex,
            "password": password
        })

    }).done(function(data) {
            window.location.href = "login.html";
        })
});