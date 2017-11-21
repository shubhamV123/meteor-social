Template.profile.helpers({
    email:function(){
        if(!Meteor.user()){
            Bert.alert('you are not logged in, permission denied','danger','growl-top-right');
            return false;
        }
        else{
            // console.log(Meteor.user())
            return Meteor.user().emails[0].address;
        }
    },
    username:function(){
        if(!Meteor.user()){
            Bert.alert('you are not logged in, permission denied','danger','growl-top-right');
            return false;
        }
        else{
            return Meteor.user().username;
        }
    },
});
Template.profile.events({ 
    // 'submit .edit-profile': function(event) { 
    //      var file = $('#profileImage').get(0).files[0];
    //      if(file){
    //          fsFile = new FS.file(file);
    //      }
    // } 
    
});