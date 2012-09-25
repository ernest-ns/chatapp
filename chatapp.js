Messages = new Meteor.Collection('messages');
Users = new Meteor.Collection('users');
ChatRooms = new Meteor.Collection('chatRooms');

SESSION_IDENTIFIER_FOR_USER = "currentUser"


if (Meteor.isClient) {
  Template.list.messages = function(){
    return Messages.find({});
  };

  Template.userLoginTemplate.events = {
    'click input.username-button' : function(){
      var userName = $('input.username').val();
      //Log the user in
      
      user = Users.findOne({username: userName});

      HELPER.clog("INFO",userName);
      HELPER.clog("INFO",user);

      if(!_.isNull(user) && !_.isUndefined(user)){
        HELPER.clog('info', "in true");
        Session.set(SESSION_IDENTIFIER_FOR_USER, userName);
      }else{
        HELPER.clog('info', "in false");
        Users.insert({username: userName}, function(errorObject, userId){
          if(errorObject){
            HELPER.clog('info', "error happened");
            clog("ERROR:",errorObject);
          }else{
            HELPER.clog('info', "good happened");
            HELPER.clog("INFO:",userId);
          }          
        });
        Session.set(SESSION_IDENTIFIER_FOR_USER, userName);
      }
      // Hide the login form
      $('.step1').addClass('hidden');
    }
  };

  Template.chatRoomsListTemplate.chatRooms = function(){
    return ChatRooms.find({});
  };

  Template.chatRoomTemplate.events = {
    'click span.chat-room-name' : function(){
      var chatRoomName = $('span.chat-room-name').text();
      chatRoom = ChatRooms.findOne({name :  chatRoomName });      
    }
  };

  Template.newMessageTemplate.events = {
    'click input.go-button' :  function(){
      var messageTextInputField = $('input.message-text');
      var messageText = messageTextInputField.val();
      console.log(messageText);
      Messages.insert({message : messageText});
      messageTextInputField.val('');
    }
  };

 
}

if (Meteor.isServer) {
  Meteor.startup(function () {    
    // code to run on server at startup
    if (Users.find().count() === 0) {
      Users.insert({username:"ernest"});
    }
    if (Messages.find().count() === 0) {
      var initial_messages = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < initial_messages.length; i++)
        Messages.insert({message : initial_messages[i]});
    }
  });
}

HELPER = {
  clog : function(tag,message){
    console.log('******'+ tag + '*************');
    console.log(message);
    console.log("********************");
  }
}