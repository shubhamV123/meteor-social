Template.dashboard.helpers({
    posts: function() {
    var posts = Posts.find({},{sort:{createdAt:-1}});
    
    return posts;
    },
    count:function(){
        var test = Posts.findOne({_id:this._id},{$count:'comments'});
        if(test.comments==undefined){
            return 0;
        }
        else{
        return test.comments.length;
        }
    }
});


Template.dashboard.events({ 
    'submit .msg-post': function(event) { 
         var post=event.target.msgPost.value;
         if(isNotEmpty(post)){
             Meteor.call('addPost', post);
             event.target.msgPost.value = '';
             Bert.alert('You have successfully posted','success','growl-top-right');
             
         }
         else{
            Bert.alert('Please fill the field','danger','growl-top-right')
         }
         return false;
    },
    'submit .comment': function(event) { 
        var post=event.target.commentPost.value;
        var thisUser = Meteor.userId();
        var thisPost = Posts.findOne({_id:this._id})._id;
        var postAuthor = Posts.findOne({_id:this._id}).author;
        var Name = Meteor.user().username;
        var thisPostComment =  Posts.findOne({_id:this._id},{commented:{$in:Name}}).commented;
        var email=Meteor.user().emails[0].address;
        // console.log(thisUser,thisPost,postAuthor,Name,this._id,thisPostComment)
        

        // var post=event.target.commentPost.value;
        if(isNotEmpty(post)){
            Meteor.call('addComments',post,thisUser,thisPost,postAuthor,Name,email);
            // Meteor.call('addComments', post);
            event.target.commentPost.value = '';
            Bert.alert('Your comment has been successfully submitted','success','growl-top-right');
            
        }
        else{
           Bert.alert('Please fill all fields','danger','growl-top-right');
        }
        return false;
   } 
});
var isNotEmpty = function(value){
    if(value && value!= ''){
        return true;
    }
    Bert.alert('Please fill in all fields','danger','growl-top-right')
    return false;
};