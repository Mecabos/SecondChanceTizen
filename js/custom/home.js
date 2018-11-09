$(document).ready(function () {
    filteredProfilesArray = [];
    pictureIndex = 0;
    profileIndex = 0;
    profilePicture = $(".profile_picture");
    leftArrow = $("#left_arrow");
    rightArrow = $("#right_arrow");
    profileName = $("#profile_name");
    profileAge = $("#profile_age");
    neutralIcon = $("#rate_icon_image_neutral");
    likeIcon = $("#rate_icon_image_like");
    loveIcon = $("#rate_icon_image_love");

    function nextProfilePicture(){
        pictureIndex++;
        if(pictureIndex >= filteredProfilesArray[profileIndex].pictureList.length-1){
            rightArrow.attr('disabled', true);
            leftArrow.attr('disabled', false);
        }
        else if (pictureIndex > 0){
            leftArrow.attr('disabled', false);
        }
        profilePicture.attr("src", serverURL+filteredProfilesArray[profileIndex].pictureList[pictureIndex]) ;
    }

    function previousProfilePicture(){
        pictureIndex--;
        if(pictureIndex <= 0){
            leftArrow.attr('disabled', true);
            rightArrow.attr('disabled', false);
        }
        else if (pictureIndex > 0){
            rightArrow.attr('disabled', false);
        }
        profilePicture.attr("src",serverURL+filteredProfilesArray[profileIndex].pictureList[pictureIndex]) ;
    }

    function populateProfiles(profiles) {
        if (profiles.length > 0){
            $.each(profiles, function (index, value) {
                getPictureListAPI(value.id,function (pictureList) {
                    currentProfilePictureList = [value.profilePicture.link];
                    $.each(pictureList, function (index2, picture) {
                        currentProfilePictureList.push(picture.link)
                    });
                    currentProfile = {
                        id : value.id,
                        name : value.name,
                        age : value.age,
                        pictureList : currentProfilePictureList
                    };
                    filteredProfilesArray.push(currentProfile);
                    if (index+1 === profiles.length){
                        setFilteredProfile(0);
                        neutralIcon.on("click", function(){saveNotation(loggedUserData.id, filteredProfilesArray[profileIndex].id, 0)});
                        likeIcon.on("click", function(){saveNotation(loggedUserData.id, filteredProfilesArray[profileIndex].id, 1)});
                        loveIcon.on("click", function(){saveNotation(loggedUserData.id, filteredProfilesArray[profileIndex].id, 2)});
                    }
                });
            });
        }else{
            setFilteredProfile(-1);
        }
    }

    function setFilteredProfile (index){
        pictureIndex = 0;
        if (index !== -1){
            profileName.html(filteredProfilesArray[index].name);
            profileAge.html(filteredProfilesArray[index].age);
            profilePicture.attr("src", serverURL+filteredProfilesArray[profileIndex].pictureList[pictureIndex]) ;
            if (filteredProfilesArray[profileIndex].pictureList.length > 1){
                leftArrow.attr('disabled', true);
                rightArrow.attr('disabled', false);
            }
        }else{
            profileName.html("No more persons available with the specified filters");
            profileAge.html("Please try again later");
            profilePicture.attr("src", "images/no_person_available.png") ;
            leftArrow.attr('hidden', true);
            rightArrow.attr('hidden', true);
            neutralIcon.attr('hidden', true);
            likeIcon.attr('hidden', true);
            loveIcon.attr('hidden', true);
        }
    }

    function saveNotation(sourceUserId, targetUserId, value){
        newNotationData = {
            sourceUser : {
                id : sourceUserId
            },
            targetUser : {
                id : targetUserId
            },
            value : value
        };
        saveNewNotationAPI(newNotationData,function(){
            profileIndex++;
            if (profileIndex <= filteredProfilesArray.length-1){
                setFilteredProfile(profileIndex);
            }
            else{
                setFilteredProfile(-1);
            }
        });
    }

    function setLoggedUserData(user){
        localStorage['loggedUserName'] = user.name;
        localStorage['loggedUserProfilePictureLink'] = serverURL+user.profilePicture.link;
    }

    leftArrow.attr('disabled', true);

    //TODO:CHANGE TO DYNAMIC
    localStorage['loggedUserID'] = 1;
    loggedUserData = {
        id : localStorage['loggedUserID']
    };

    rightArrow.on("click", nextProfilePicture);
    leftArrow.on("click", previousProfilePicture);
    getFilteredUsersAPI(loggedUserData,populateProfiles);
    getUserAPI(loggedUserData,setLoggedUserData);
});