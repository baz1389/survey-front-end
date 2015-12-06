'use strict';

// lcn adds
// var url = 'http://localhost:3000/'; //CHANGE TO GH PAGES URL
var url = 'http://localhost:5000/'; //CHANGE TO GH PAGES URL
var poll_url = "";

var createdPoll = $('#rendered-poll');
var createdPollsList = $('#poll-list');

//ben changes start
var poll = {
 id: 0,
 title: null,
 options: [],
 owner_id: null
};
//ben changes end

// for poplulating the poll content into the div
var createdPollsHTML = function(poll) {
  createdPollsList.append('<div id=' + poll.id + ' class="poll-posts usr-posts"><h3>' + poll.title + '</h3><p>' + poll.description +'</p><p> poll id: '+ poll.id +'</p><p> user id: '+ poll.user_id +'</p><button class="delete-poll">Delete this listing</button></div>');
 };

// create object from form data
var form2object = function(form) {
  var data = {};
  $(form).children().each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};


// callback function
var callback = function callback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val('status: ' + error.status + ', error: ' + error.error);
    return;
  }
  $('.user-messages').val(JSON.stringify(data, null, 4));
};


// registration callback
var regCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Registration fail!</strong>");
    return;
  }
  console.log('data is ' + data);
};



// login callback
var loginCb = function (error, data) {

  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Login fail!</strong>");
    return;
  } else {
    console.log(JSON.stringify(data, null, 4));
  }

}; // end of login callback;



// logout callback
var logoutCb = function (error){
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Whoops! You're still logged in.</strong>");
  }
  // changeLogout();
  console.log(JSON.stringify(data, null, 4));
  console.log("Logged out");
};


// createPoll callback
var createPollCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Poll create fail!</strong>");
    return;
  }
  console.log('successful create, data is ' + JSON.stringify(data, null, 4));

  //ben edits start

  // used bracket notation to solve for special character in key value
  poll.id = data["_id"];

  console.log("poll id is: " + poll.id)
  poll.title = data.title;
  poll.options = data.options;
  poll.owner_id = data.owner_id;

  $('#poll-creation-container').attr('data-pollid', poll.id);

  //ben edits end

  // lcn unique URL add
  // poll_url = (url + "polls/" + data["_id"]);
  // change url to localhost:5000 for testing
  poll_url = (url + "#" + data["_id"]);

  console.log('poll_url is ' + poll_url);

  var newPollLink = $('<li><a href="' + poll_url + '" data-poll-id="' + data["_id"] + '" class="load-poll">' + data.title + '</a></li>');

  // km add jQuery animation
  $('#user-polls').fadeIn().removeClass('hidden')

  $('#poll-list').append(newPollLink);

  $(".user-messages").html('<p>Your survey can be found here: <a href="' + poll_url + '">' + poll_url + '</a></p>');

};


// showPoll callback
var showPollCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Poll listing fail!</strong>");
    return;
  }
  // grab poll from backend
  console.log('the retrieved poll is ' + JSON.stringify(data, null, 4));
   // used bracket notation to solve for special character in key value
   // seems that the returned object is wrapped in an array, so all
   // keys need to be include the data[0]
  poll.id = data[0]["_id"];
  poll.title = data[0].title;
  poll.options[0] = data[0].options[0];
  poll.owner_id = data[0].owner_id;
  console.log("poll id is: " + poll.id)
  console.log("data[0]: " + data[0]);
  console.log("data.title: " + data[0].title);
  console.log("data.owner_id: " + data[0].owner_id);
  console.log("data.options[0]: " + data[0].options[0]);


 // km add jQuery animation
 $('.vote-poll-container').fadeIn().removeClass('hidden');
 $('.render-poll-title').html(poll.title);

  $('.option-one').val(poll.options[0]);
  $('.option-two').val(poll.options[1]);
  $('.option-three').val(poll.options[2]);
  $('.option-four').val(poll.options[3]);
  $('.option-five').val(poll.options[4]);


// km changing class references to id refs
  $('#option-one').html(poll.options[0]);
  $('#option-two').html(poll.options[1]);
  $('#option-three').html(poll.options[2]);
  $('#option-four').html(poll.options[3]);
  $('#option-five').html(poll.options[4]);
  $('#rendered-poll').attr('data-currentpollid', poll.id);

};



// listAllPolls callback
var listAllPollsCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Poll listing fail!</strong>");
    return;
  }
  // grab polls from backend
  var polls = data.polls;

  // polls.forEach(function(poll){
  //   listPollHTML(poll);
  // });

};


// updatePollTitle callback
var editPollCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Poll edit fail!</strong>");
    return;
  }
  // console.log test
  console.log('new poll data is ' + data);
  var id = $('#poll-creation-container').attr('data-pollid');
  var pollTitle = data.title;

  console.log('the retrieved poll is ' + JSON.stringify(data, null, 4));

  $(".user-messages").html("<strong>Poll updated!</strong>");

};
// end of editPollCb submit handler

// deletePoll callback
var deletePollCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Poll deletion fail!</strong>");
    return;
  }

  // find li by data attribute, delete that li in the 'your polls list and hide the rendered survey container? If so, do in click handler js section'

  $(".user-messages").html("<strong>Poll deletion success!</strong>");



};






