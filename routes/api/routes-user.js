const router = require('express').Router();

const {
    getAllUsers,
    getUserByID,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/controller-user'); 


//GET all users
router
.route('/')
.get(getAllUsers);

//GET single user by _id and thought & friend data
router
.route('/:id')
.get(getUserByID);

//POST a new user
router
.route('/')
.post(createNewUser);

//PUT to update user by _id
router
.route('/:id')
.put(updateUser);

//DELETE to remove user by _id
router
.route('/:id')
.delete(deleteUser);

//POST to add new friend
router
.route('/:userID/friends/:friendID')
.post(addFriend);

//DELETE to remove a friend
router
.route('/:userID/friends/:friendID')
.delete(deleteFriend);

module.exports = router;