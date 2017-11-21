if (Meteor.isServer) {
    Meteor.methods({ 
        addPost: function(post) { 
             if(!Meteor.userId()){
                throw new Meteor.Error('not authorized');
                return false;
             }
             else{
                 var username = Meteor.user().username;
                 var year = new Date().getFullYear();
                 var month = new Date().getMonth()+1;
                 var day = new Date().getDate();
                //  var date = (month + '/' + day + '/' + year).toString();
                var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              
                var date = (day + ' ' + monthNames[month-1] + ' ' + year).toString();
                 Posts.insert({
                    post:post,
                    author:username,
                    date:date,
                    createdAt:new Date(),
                    comment:[],
                    userId:Meteor.userId()
                })
             }
        },
        addComments: function(post,thisUser,thisPost,postAuthor,Name,email) { 
            if(!Meteor.userId()){
               throw new Meteor.Error('not authorized');
               return false;
            }
            else{
                var post = post;
                var commentedBy = Name;
                var year = new Date().getFullYear();
                var month = new Date().getMonth()+1;
                var day = new Date().getDate();
                var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              
                var date = (day + ' ' + monthNames[month-1] + ' ' + year).toString();
                if(post===' '){
                    return false;
                }else{
                Posts.update(thisPost,{$push:{comments:{commentedBy:Name,email:email,commentMsg:post,date:date}}});
                }
            // console.log(Name,thisPost)
            }
       }
    });
}