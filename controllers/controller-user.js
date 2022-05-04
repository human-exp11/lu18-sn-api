const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
      User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

    //get user by ID
    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .populate({
            path: 'friends',
            select: '-__v'
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'This ID is not associated with any user' });
              return;
            }
            res.json(dbUserData);
         })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //update user by ID
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'This ID is not associated with any users.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    //create a new user
    createNewUser({ body }, res) {
         User.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
    },

    //delete the user and any associated thoughts
    deleteUser({ params }, res) {
        Thought.deleteMany({ userID: params.id })
          .then(() => {
            User.findByIdAndDelete({ userID: params.id })
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'This ID is not associated with any users.' });
                  return;
                }
                res.json(dbUserData);
              });
          })
          .catch(err => res.json(err));
    },
    //add a new friend to user's friend list
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.userID },
          { $push: { friends: params.friendID } },
          { new: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'This ID is not associated with any users.' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
    },
    //delete a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.userID },
          { $pull: { friends: params.friendID } },
          { new: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'This ID is not associated with any users.' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
    }
    
};

module.exports = userController