/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/


Meteor.methods({
    '/collection/save': function (data:any) {
        var currentUserId = this.userId;
        if (!currentUserId) {
            throw new Meteor.Error("sign-in", "Please sign in.");
        } else {
            var user:any = Meteor.users.findOne(currentUserId);
            if (!user) {
                throw new Meteor.Error("account-not-found", "Invalid User ID");
            } else {
                // Save your information to a Mongo Collection
            }
        }
    }
});
