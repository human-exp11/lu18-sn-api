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
router.route('/')
.get(getAllThoughts)

router.route('/:userId')
.post(createNewThought)

router.route('/:thoughtId')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought)


//POST to create reaction stored in single thought's reactions array
router.route('/:thoughtId/reactions')
.post(createReaction);

//DELETE to remove reaction by reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;

