const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
      User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

    //get user by ID
    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
          .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'This ID is not associated with any user' });
              return;
            }
            res.json(userData);
         })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //update user by ID
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'This ID is not associated with any users.' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.json(err));
  },

    //create a new user
    createNewUser({ body }, res) {
         User.create(body)
         .then(userData => res.json(userData))
         .catch(err => res.json(err));
    },

    //delete the user and any associated thoughts
    deleteUser({ params }, res) {
            User.findByIdAndDelete({ _id: params.id })
              .then(userData => {
                if (!userData) {
                  res.status(404).json({ message: 'This ID is not associated with any users.' });
                  return;
                }
                res.json(userData);
            })
          .catch(err => res.json(err));
    },
    //add a new friend to user's friend list
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $push: { friends: params.friendId } },
          { runValidators:true,  new: true }
        )
          .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: 'This ID is not associated with any users.' });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(400).json(err));
    },
    //delete a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.id } },
          { new: true }
        )
          .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: 'This ID is not associated with any users.' });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(400).json(err));
    }
    
};

module.exports = userController;