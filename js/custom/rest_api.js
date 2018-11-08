/*---------------------------------URLS---------------------------------*/
var serverURL = 'http://localhost:8080';
var getFilteredUsersURL = serverURL + '/user/notation/getFilteredUsers';
var saveNewNotationURL = serverURL + '/user/notation/saveNewNotation';
var getPictureListURL = serverURL + '/user/picture/getPictureList/';

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

function saveNewNotationAPI(newNotationData, callback){
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

        }
    });
}

function getPictureListAPI(userId, callback){
    $.ajax({
        type: 'POST',
        url: getPictureListURL+userId,
        contentType: "application/json",
        datatype: "application/json",
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}