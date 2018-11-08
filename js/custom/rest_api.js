/*---------------------------------URLS---------------------------------*/
var serverURL = 'http://localhost:8080/user';
var getFilteredUsersURL = serverURL + '/notation/getFilteredUsers';
var saveNewNotationURL = serverURL + '/notation/saveNewNotation';

/*---------------------------------REST Services---------------------------------*/
/*---NOTATION---*/
function getFilteredUsersAPI(userData,callback){
    $.ajax({
        type: 'POST',
        url: getFilteredUsersURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(userData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){
            callback([])
        }
    });
}

function saveNewNotation(newNotationData, callback){
    $.ajax({
        type: 'POST',
        url: saveNewNotationURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(newNotationData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    });
}