
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

    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:9091/users/user/"+user_id,
            method: "GET",
            headers: { "Authorization": "Bearer " + token },
            success: function(data) {
                $("#name").val(data.name);
                $("#surName").val(data.surName);
                $("#lastName").val(data.lastName);
                $("#email").val(data.email);
                $("#phoneNumber").val(data.phoneNumber);
                $("#address").val(data.address);
                $("#postalIndex").val(data.postalIndex);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
            // запобігаємо стандартній поведінці форми
            $("#changeButton").click(function(event) {
                event.preventDefault();

                var name = $("#name").val();
                var surName = $("#surName").val();
                var lastName = $("#lastName").val();
                var email = $("#email").val();
                var phoneNumber = $("#phoneNumber").val();
                var address = $("#address").val();
                var postalIndex = $("#postalIndex").val();
                var password = $("#password").val();
                var repeatedPassword = $("#repeatedPassword").val();

                console.log(name);
                console.log(surName);
                console.log(lastName);
                console.log(email);
                console.log(phoneNumber);
                console.log(address);
                console.log(postalIndex);
                console.log(password);
                console.log(repeatedPassword);

                $.ajax({
                    type: "PATCH",
                    url: "http://localhost:9091/users/update/user/"+user_id,
                    headers: { "Authorization": "Bearer " + token },
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
                 });
            });
    });
