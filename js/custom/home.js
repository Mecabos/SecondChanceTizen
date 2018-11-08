$(document).ready(function () {
    /*----PROFILE PICTURE SLIDER----*/
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
        if(pictureIndex >= pictureArray.length-1){
            rightArrow.attr('disabled', true);
        }
        else if (pictureIndex > 0){
            leftArrow.attr('disabled', false);
        }
        profilePicture.attr("src", pictureArray[pictureIndex]) ;
    }

    function previousProfilePicture(){
        pictureIndex--;
        if(pictureIndex <= 0){
            leftArrow.attr('disabled', true);
        }
        else if (pictureIndex > 0){
            rightArrow.attr('disabled', false);
        }
        profilePicture.attr("src", pictureArray[pictureIndex]) ;
    }

    function populateProfiles(profiles) {
        if (profiles.length > 0){
            $.each(profiles, function (index, value) {
                currentProfile = {
                    id : value.id,
                    name : value.name,
                    age : value.age
                };
                filteredProfilesArray.push(currentProfile);
            });
            setFilteredProfile(0);
        }else{
            setFilteredProfile(-1);
        }

    }

    function setFilteredProfile (index){
        pictureIndex = 0;
        if (index !== -1){
            profileName.html(filteredProfilesArray[index].name);
            profileAge.html(filteredProfilesArray[index].age);
            profilePicture.attr("src", pictureArray[index]) ;
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
        saveNewNotation(newNotationData,function(){
            profileIndex++;
            if (profileIndex <= filteredProfilesArray.length-1){
                setFilteredProfile(profileIndex);
            }
            else{
                setFilteredProfile(-1);
            }
        });
    }

    leftArrow.attr('disabled', true);
    pictureArray = ["images/person1.PNG","images/person2.PNG","images/person3.jpg"];
    //TODO:CHANGE TO DYNAMIC
    userData = {
        id : 5
    };

    rightArrow.on("click", nextProfilePicture);
    leftArrow.on("click", previousProfilePicture);
    neutralIcon.on("click", function(){saveNotation(userData.id, filteredProfilesArray[profileIndex].id, 0)});
    likeIcon.on("click", function(){saveNotation(userData.id, filteredProfilesArray[profileIndex].id, 1)});
    loveIcon.on("click", function(){saveNotation(userData.id, filteredProfilesArray[profileIndex].id, 2)});

    getFilteredUsersAPI(userData,populateProfiles);
});