/*---------------------------------URLS---------------------------------*/
var serverURL = 'http://192.168.1.2:8080';
var getFilteredUsersURL = serverURL + '/user/notation/getFilteredUsers';
var saveNewNotationURL = serverURL + '/user/notation/saveNewNotation';
var getPictureListURL = serverURL + '/user/picture/getPictureList/';
var getLikeMatchResumeListURL = serverURL + '/user/likeMatch/getLikeMatchResumeList';
var getMessageListURL = serverURL + '/user/message/getMessageList';
var markMessageListAsSeenURL = serverURL + '/user/message/markMessageListAsSeen';
var saveNewMessageURL = serverURL + '/user/message/saveNewMessage';
var getUserURL = serverURL + '/user/appUser/getUser';
var deleteLikeMatchURL = serverURL + '/user/likeMatch/delete';
var banLikeMatchURL = serverURL + '/user/likeMatch/ban';

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

function getUserAPI(userData,callback){
    $.ajax({
        type: 'POST',
        url: getUserURL,
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
/*---LIKEMATCH---*/
function getLikeMatchResumeListAPI(userData, callback){
    $.ajax({
        type: 'POST',
        url: getLikeMatchResumeListURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(userData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}
function deleteLikeMatchAPI(likeMatchData, callback){
    $.ajax({
        type: 'POST',
        url: deleteLikeMatchURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(likeMatchData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}

function banLikeMatchAPI(likeMatchData, callback){
    $.ajax({
        type: 'POST',
        url: banLikeMatchURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(likeMatchData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}
/*---CHAT---*/
function getMessageListAPI(messageData, callback){
    $.ajax({
        type: 'POST',
        url: getMessageListURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(messageData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}

function markMessageListAsSeenAPI(messageData, callback){
    $.ajax({
        type: 'POST',
        url: markMessageListAsSeenURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(messageData),
        success: function (response) {
            callback(response);
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}

function saveNewMessageAPI(newMessageData, callback){
    $.ajax({
        type: 'POST',
        url: saveNewMessageURL,
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(newMessageData),
        success: function () {
            callback();
        },
        error : function (xhr, ajaxOptions, thrownError){

        }
    });
}