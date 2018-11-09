$(document).ready(function () {

    matchListContainer = $("#match_list");

    function setLikeMatchResume(likeMatchResumeList){
        matchListContainerHtml = "";
        if (likeMatchResumeList.length > 0){
            $.each(likeMatchResumeList, function (index, value) {
                lastMessageHtml = "";
                lastMessageSenderHtml = "";
                timeSinceLastMessageHtml = "";
                if (value.lastMessage === null){
                    lastMessageHtml = '<p class="text-muted" style=" font-weight: bold;"> Start talking together !</p>'
                }else{
                    lastMessageHtml = '<p class="text-muted">' + value.lastMessage +'</p>'
                    if (value.lastMessageSender === false){
                        if (value.nbrUnseenMessages === 0){
                            lastMessageSenderHtml = '<div class="replied"><i class="icon ion-reply"></i></div>';
                        }else{
                            lastMessageSenderHtml = '<div class="chat-alert">' + value.nbrUnseenMessages +'</div>';
                        }
                    }else{
                        if (value.nbrUnseenMessages === 0){
                            lastMessageSenderHtml = '<div class="seen"><i class="icon ion-checkmark-round"></i></div>';
                        }else{
                            lastMessageSenderHtml = '<div class="replied"><i class="icon ion-reply"></i></div>';
                        }
                    }
                    timeSinceLastMessageHtml = '<small class="text-muted">' + value.timeSinceLastMessage +'</small>';
                }

                matchListContainerHtml  +='<li class="">'
                    +'<a href="" data-toggle="tab" data-target="'+ value.id +'" class="single_match_container">'
                    +'<div class="contact">'
                    + '<img src="' + serverURL+ value.profilePicture.link +'"  alt="" class="profile-photo-sm pull-left"/>'
                    + '<div class="msg-preview">'
                    + '<h6>' + value.name +'</h6>'
                    + lastMessageHtml
                    + timeSinceLastMessageHtml
                    + lastMessageSenderHtml
                    +'<div class="" style="margin-top: 10px"><i data-target="'+ value.id +'" class="fas fa-user-minus delete_user"></i> <i data-target="'+ value.id +'" style="margin-left: 10px" class="fas fa-flag-checkered report_user"></i></div>'
                    + '</div>'
                    + '</div>'
                    + '</a>'
                    + '</li>';
            });
            matchListContainer.html(matchListContainerHtml);
            matchListContainer.find('.single_match_container').on("click", function(){
                localStorage['targetUserID'] = $(this).data("target");
                window.location = "chat.html";
            });

            $(".delete_user").on("click",function(e){
                e.preventDefault();
                e.stopPropagation();
                if (confirm("Are you sure you want to delete this match ?")) {
                    deleteLikeMatchAPI(
                        {
                            sourceUser : {
                                id : localStorage['loggedUserID']
                            },
                            targetUser : {
                                id : $(this).data("target")
                            }
                        },function(){

                            alert("Match deleted !");
                            window.location = "home.html";
                        }
                    );
                } else {

                }

            });

            $(".report_user").on("click",function(e){
                e.preventDefault();
                e.stopPropagation();
                if (confirm("Are you sure you want to Report this person ?!")) {
                    banLikeMatchAPI(
                        {
                            sourceUser : {
                                id : localStorage['loggedUserID']
                            },
                            targetUser : {
                                id : $(this).data("target")
                            }
                        },function(){

                            alert("Person Reported we're sorry for the inconvenience !");
                            window.location = "home.html";
                        }
                    );
                } else {

                }
            });

        }
    }

    loggedUserData = {
        id : localStorage['loggedUserID']
    };

    getLikeMatchResumeListAPI(loggedUserData,setLikeMatchResume)
});