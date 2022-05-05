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
router.route('/')
.get(getAllUsers)
.post(createNewUser);

//GET single user by _id and thought & friend data
router.route('/:id')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser);


//POST to add new friend
router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);


module.exports = router;