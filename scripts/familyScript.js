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
$(document).ready(function() {
    if (family_id!=null) {
        $("#createFamilyButton").hide();
    }

    $.ajax({
        url: "http://localhost:9091/families",
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
        success: function(response) {
            $.each(response, function(i, family) {

                $("#familyTable").append(
                    "<tr>" +
                    "<td>"  + family.id + "</td>" +
                    "<td>" + family.name + "</td>" +
                    "<td>" + family.budget + "</td>" +
                    "<td>" + family.membersCount + "</td>" +
                    "</tr>");
            });
        },
        error: function(xhr) {
            console.log(token);
        }
    });
});

