Messages = new Meteor.Collection('messages');

if (Meteor.is_client) {
  Template.list.messages = function(){
    return Messages.find({});
  };
  Template.newMessageTemplate.events = {   
    'submit form.add-new-message' : function(event){
      event.preventDefault();
      var messageTextInputField = $('input.message-text');
      var messageText = messageTextInputField.val();
      console.log(messageText);
      Messages.insert({message : messageText});
      messageTextInputField.val('');
    }
  };  
}

if (Meteor.is_server) {
  Meteor.startup(function () {    
    // code to run on server at startup
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