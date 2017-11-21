if (Meteor.isServer) {
    Meteor.publish('Posts', function() {
        if(!this.userId){
            return false;
            throw new Meteor.Error('Not authorized');
            
            
        }
        else{
           return Posts.find();
        }
    });
}