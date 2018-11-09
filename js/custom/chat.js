$(document).ready(function () {

    chatContainer = $("#chat_container");
    sendMessageBtn = $("#send_message_btn");
    messageInput = $("#message_input");

    function setChatContainer(MessageList){
        chatHtml = "";
        if(MessageList.length > 0){
            if (!MessageList[0].sender){
                if (!MessageList[0].seen){
                    markMessageListAsSeenAPI({
                        sourceUser : {
                            id : localStorage['targetUserID']
                        },
                        targetUser : {
                            id : localStorage['loggedUserID']
                        }
                    },function(){});
                }
            }
            $.each(MessageList, function (index, value) {
                sideHtml = "";
                if (value.sender){
                    sideHtml = '<li class="right">' + '<img src="'+ serverURL+value.sourceUser.profilePicture.link +'" alt="" class="profile-photo-sm pull-right" />';
                }else{
                    sideHtml = '<li class="left">' + '<img src="'+ serverURL+value.sourceUser.profilePicture.link +'" alt="" class="profile-photo-sm pull-left" />';

                }
                chatHtml+=   sideHtml
                    +'<div class="chat-item">'
                    +'<div class="chat-item-header">'
                    +'<h5>'+ value.sourceUser.name +'</h5>'
                    +'<small class="text-muted">'+value.timeSinceSent+'</small>'
                    +'</div>'
                    +'<p>'+value.text+'</p>'
                    +'</div>'
                    +'</li>'
            });
            chatContainer.html(chatHtml);
            var $t = $('.tab-content');
            $t.animate({"scrollTop": $('.tab-content')[0].scrollHeight + 100}, "slow");
        }
    }

    function sendNewMessage(){
        saveNewMessageAPI({
            sourceUser : {
                id : localStorage['loggedUserID']
            },
            targetUser : {
                id : localStorage['targetUserID']
            },
            text : messageInput.val()
        },function(){
            newChatHtml = "";
            newChatHtml+= '<li class="right"> '
                +'<img src="'+localStorage['loggedUserProfilePictureLink']+'" alt="" class="profile-photo-sm pull-right" />'
                +'<div class="chat-item">'
                +'<div class="chat-item-header">'
                +'<h5>'+localStorage['loggedUserName']+'</h5>'
                +'<small class="text-muted">now</small>'
                +'</div>'
                +'<p>'+messageInput.val()+'</p>'
                +'</div>'
                +'</li>';
            chatContainer.append(newChatHtml);
            messageInput.val("");
            var $t = $('.tab-content');
            $t.animate({"scrollTop": $('.tab-content')[0].scrollHeight + 1000000}, "slow");
        });
    }

    messageData = {
        sourceUser : {
            id : localStorage['loggedUserID']
        },
        targetUser : {
            id : localStorage['targetUserID']
        }
    };

    sendMessageBtn.on("click",sendNewMessage);
    getMessageListAPI(messageData,setChatContainer);
});


