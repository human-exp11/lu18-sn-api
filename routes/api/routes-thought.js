const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtByID,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}= require('../../controllers/controller-thought');

//GET all thoughts
router
.route('/')
.get(getAllThoughts)

//GET single thought by _id
router
.route('/:id')
.get(getThoughtByID)

//POST to create a new thought
router
.route('/')
.post(createNewThought);

//PUT to update thought by _id
router
.route('/:id')
.put(updateThought)

//DELETE to remove thought by _id
router
.route('/:id')
.delete(deleteThought);

//POST to create reaction stored in single thought's reactions array
router
.route('/:thoughtId/reactions')
.post(createReaction);

//DELETE to remove reaction by reactionID
router
.route('/:thoughtId/reactions/:reactionID')
.delete(deleteReaction);

module.exports = router;