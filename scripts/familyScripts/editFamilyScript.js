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

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:9091/families/family/"+family_id,
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function(data) {
            $("#familyName").val(data.name);
            $("#startFamilyBudget").val(data.budget);
            $("#actualBudget").val(data.actualBudget);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
    // запобігаємо стандартній поведінці форми
    $("#editFamily").click(function(event) {
        event.preventDefault();

        var familyName = $("#familyName").val();
        var startFamilyBudget = $("#startFamilyBudget").val();
        var actualBudget = $("#actualBudget").val();

        console.log(familyName);
        console.log(startFamilyBudget);
        console.log(actualBudget);

        $.ajax({
            type: "PATCH",
            url: "http://localhost:9091/families/update/family/"+family_id,
            headers: { "Authorization": "Bearer " + token },
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "name": familyName,
                "budget": startFamilyBudget,
                "actualBudget": actualBudget,
            })
        }).done(function(data) {
            window.location.href = "familyProfile.html";
        })
    });
});
