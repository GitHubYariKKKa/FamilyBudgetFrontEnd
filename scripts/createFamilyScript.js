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

$("#createFamily").click(function(event) {
    event.preventDefault();
    var familyName = $("#familyName").val();
    var startFamilyBudget = $("#startFamilyBudget").val();

    console.log(familyName);
    console.log(startFamilyBudget);

    $.ajax({
        type: "POST",
        url: "http://localhost:9091/families/create/family",
        headers: { "Authorization": "Bearer " + token },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": familyName,
            "budget": startFamilyBudget,
            "createdBy":user_id
        }),
        success: function(response) {
            localStorage.setItem('family_id', response.id);
            window.location.href = "familyProfile.html";
        }
    });
});