//=============MAIN FIREBASE===================================
//https://cobrachirper.firebaseio.com/chirps/.json
//============================================================  
//Our To Do Constructor
function User(User, chirps, chirpTimeStamp) {
    this.User = User,
    this.chirps = chirps,
    this.chirpTimeStamp = moment()
}

function Profile(name, handle, city, url) {
    this.name = name;
    this.handle = handle;
    this.city = city;
    this.url = url;
}

function Chirp(chirps, username) {
    this.chirps = chirps;
    this.date = moment();
    this.username = username;
};
//==============================================================================//
var chirpTypeTweetsUrl = "https://cobrachirper.firebaseio.com/chirps/.json";
var chirpTypeTweetsCus = "https://cobrachirper.firebaseio.com/chirps/";
var chirpTypeProfileUrl = "https://nabilchirps.firebaseio.com/profile/.json";
var chirpTypeProfileCus = "https://nabilchirps.firebaseio.com/profile/";
//=============================================================================//
//Central Data Container/Array
var todoArray = [];
var profile = [];
var chirps = [];

//This variable will keep track of current item
var currId;
var baseUrl = "nabilchirps";
var baseUrlAll = "cobrachirper";
var timeStamp = "";
//Fetch data from Firebase 
var fetch = function (callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "https://" + baseUrl +".firebaseio.com/chirps/.json", true);
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.response);
            callback(JSON.parse(this.response));
            //displayTime();

        }
    }
    xhr.send();
}
var fetchAll = function (callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://" + baseUrlAll + ".firebaseio.com/chirps/.json", true);
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log(this.response);
            callback(JSON.parse(this.response));
            //displayTime();

        }
    }
    xhr.send();
}
fetchAll(showresultstopanel);
fetch(showresultstopanel);


function showresultstopanel(data) {

    var indexCounter = 0;
    var htmlstrtopanel = "";
    

    timeStamp = "";
    todoArray = [];

    for (var i in data) {
        console.log(data[i].User, data[i].chirp);
        todoArray.push({
            id: i,
            User: data[i].User,
            chirp: data[i].chirp
        })
        
        timeStamp = displayTime();
        htmlstrtopanel += "<div class='header'>  <strong class='primary-font'></strong><small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span> "+ timeStamp + " </small></div>";
        htmlstrtopanel += "<span class='chat-img pull-left'>";
        htmlstrtopanel +="<img src='data:image/jpeg;base64,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' class='img-circle'></span>";
        htmlstrtopanel += "<strong class='primary-font'>" + data[i].User + "</strong>";
        $("#myChirp").html(htmlstrtopanel);
        htmlstrtopanel += "<br/>" + data[i].chirp + "<br/>";
        htmlstrtopanel += "<button onclick='dodeletetodo(" + indexCounter + ")' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-trash'></span></button><br/>";
        indexCounter++;
    }

    
    $("#myChirp").html(htmlstrtopanel);

}



function doaddtodo() {
    console.log($("#todotext").val())
    console.log($("#todocompleted").val())
    var newtodo = {
        User: $("#todotext").val(),
        chirp: $("#todocompleted").val()

    }
    sendToAjax(newtodo);
}

//Send to Ajax
function sendToAjax(objToPost) {
    var request = new XMLHttpRequest();
    request.open('POST', "https://" + baseUrl + ".firebaseio.com/chirps/.json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //fetch(showresults);
            fetch(showresultstopanel);

        }
        else {
            //Do Something On Error
        }
    };
    request.send(JSON.stringify(objToPost));
}

//Delete Chirps
function dodeletetodo(index) {
    console.log("Index to delete:", index);
    console.log(todoArray[index]);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://" + baseUrl + ".firebaseio.com/chirps/" + todoArray[index].id + "/.json", true)
    xhr.send();
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //fetch(showresults);
            fetch(showresultstopanel);
        }
        else {
            //Do Something On Error
        }

    };
}

function displayTime() {
    //alert("displaytime is being called here");
    var formatedTime = "";
    var formatedTimeJson = "";
    var formattedTime = "";
    var offsetRef = new Firebase("https://nabilchirps.firebaseio.com/.info/serverTimeOffset");
    offsetRef.on("value", function (snap) {
        var offset = snap.val();
        var estimatedServerTimeMs = new Date().getTime() + offset;
        //alert(estimatedServerTimeMs);
        var myDate = new Date(estimatedServerTimeMs);
        formatedTimeJson = myDate.toJSON();
        //formatedTime = myDate.getDay() + " " + myDate.getHours() + " " + myDate.getMinutes();
        //alert(formatedTime);
        console.log("Server Time: " + estimatedServerTimeMs);
        //console.log("Formatted Time Json: " + formatedTimeJson);
        //console.log("Formatted Time Regular: " + formatedTime);
        var date = new Date(estimatedServerTimeMs);
        // hours part from the timestamp
        var hours = date.getHours();
        console.log("hours", hours);
        // minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        console.log("minutes", hours);
        // seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        console.log("seconds", hours);

        // will display time in 10:30:23 format
        formattedTime = (hours) + ':' + minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);
        console.log("formattedTime", formattedTime);
    });

    return formattedTime;
}
displayTime();
//=================================================================//
//var retrieveChirps = function () {
//    var request = new XMLHttpRequest();
//    request.open('GET', chirpTypeTweetsUrl, true);
//    request.send();
//    request.onload = function () {
//        if (this.status >= 200 && this.status < 400) {
//            var data = JSON.parse(request.response);
//            console.log('GET was succesful');
//            chirps = [];
//            for (var i in data) {
//                data[i].id = i;
//                chirps.push(data[i]);
//            }
//            displayChirps();
//        } else {
//            console.log("Error" + request.response);
//        }
//    }

//}
//retrieveChirps();
//var pollingChirps = function (callback) {
//    var timer = setInterval(callback, 4000);
//}
//function onKeyPress(e) {
//    if (typeof e === "undefined" && window.event) {
//        e = window.event;
//    }
//    if (e.keyCode == 13) {
//        createTweet();
//    }
//}

//createTweet = function () {
//    var chirpValue = $('#chirp-input').val();
//    var handle = profile.handle;
//    var newChirp = new Chirp(chirpValue, handle);
//    console.log(newChirp.date);
//    console.log("newChirp.handle:  ", newChirp.handle);
//    postChirp(newChirp);
//    $('#chirp-input').val('');
//}

///*
//POST Chirps via AJAX CALL
//*/

//postChirp = function (dataToSend) {
//    var request = new XMLHttpRequest();
//    var url = chirpTypeTweetsUrl
//    request.open('POST', url, true);
//    request.onload = function () {
//        if (this.status >= 200 && this.status < 400) {
//            console.log('POST was successful!');
//            var id = JSON.parse(this.response);
//            dataToSend.id = id;
//            chirps.push(dataToSend);
//            pollingChirps(retrieveChirps);
//        } else {
//            console.log('POST was unsuccessful.');
//        }
//    }

//    request.send(JSON.stringify(dataToSend));
//};
//displayChirps = function () {

//    $("#chirp-display").empty();
//    chirps.reverse();
//    for (var i in chirps) {

//        var tempChirp = chirps[i];
//        var tempTime = moment(tempChirp.date).fromNow();
//        console.log(tempTime);

//        var newChirp = new Chirp(tempChirp.chirps, tempChirp.username);

//        newChirp.__proto__ = { id: i };

//        chirps.push(newChirp);

//        $("#chirp-display").append("<p><strong><h4 class='chirp-h4' ><a href='#' id='chirp-display' data-toggle='modal' data-target='#myModal2' class='panel-body' onclick='retrieveFriendChirps(" + i + ")'>" + tempChirp.username + "</a></h4></strong></p>")
//        $("#chirp-display").append("<p><em><h4 class='chirpP'>" + tempChirp.chirps + "</h4></em></p>")
//        $("#chirp-display").append("<p><h6>" + tempTime + "</h6><a href='#'><i class='glyphicon glyphicon-trash pull-right' onclick='deleteChirp(" + i + ")'></i></a></p></br><hr>")
//    }
//}
//function deleteChirp(itemIndexClicked) {
//    var currChirp = chirps[itemIndexClicked];
//    currEditId = currChirp.id;

//    var customUrl = chirpTypeTweetsCus + currEditId + "/.json";

//    var myrequest = new XMLHttpRequest();
//    myrequest.open("DELETE", customUrl, true);
//    myrequest.onload = function () {
//        if (this.status >= 200 && this.status < 400) {
//            var firebaseData = JSON.parse(this.response);
//            console.log("DELETE was a success", firebaseData);
//            //removeFriendRow(currEditId);
//            retrieveChirps();
//        } else {
//            console.log("there was a problem");
//        }
//    };
//    myrequest.send();

//};
//var retrieveProfile = function () {

//    var request = new XMLHttpRequest();

//    request.open('GET', chirpTypeProfileUrl, true);
//    request.send();
//    request.onload = function () {
//        if (this.status >= 200 && this.status < 400) {
//            var data = JSON.parse(request.response);
//            console.log('GET from chirpTypeProfileUrl was successful');
//            alert('GET from chirpTypeProfileUrl was successful');
//            var name = data.name;
//            var handle = data.handle;
//            var city = data.city;
//            var url = data.url;

//            profile = new Profile(name, handle, city, url)
//            console.log("PROFILE DATA:  ", profile);
//            alert(profile.handle);

//            //var profileName = '<a href="#" id="profile-name"><i class="glyphicon glyphicon-comment"></i>&nbsp;&nbsp;' + profile.name + '</a>';
//            //var profileHandle = '<a href="#" id="profile-handle"><i class="glyphicon glyphicon-user"></i>&nbsp;&nbsp;' + profile.handle + '</a>';
//            //var profileCity = '<a href="#" id="profile-city"><i class="glyphicon glyphicon-home"></i>&nbsp;&nbsp;' + profile.city + '</a>';

//            //$('#profile-handle').empty();
//            //$('#profile-name').empty();
//            //$('#profile-city').empty();
//            //$('#profile-handle').append(profileHandle);
//            //$('#profile-name').append(profileName);
//            //$('#profile-city').append(profileCity);
//        } else {
//            console.log("Error" + request.response);
//        }
//    }
//}

//retrieveProfile();