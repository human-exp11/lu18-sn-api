const { User, Thought } = require("../models");

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
  Thought.find({})
  .then(thoughtData => res.json(thoughtData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  })
  },
  //get a thought by id
  getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.thoughtId})
      .then((thoughtData) => {
        if (!thoughtData) {
          res
            .status(404)
            .json({ message: "This ID is not associated with any thoughts." });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //create a new thought
  createNewThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          res
            .status(404)
            .json({ message: "This ID is not associated with any users." });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  //update a thought
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res
            .status(404)
            .json({ message: "This ID is not associated with any thoughts." });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  //delete a thought
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.thoughtId }, { runValidators: true, new: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'This ID is not associated with any thoughts.' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
},

  //create a reaction
  createReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res
            .status(404)
            .json({ message: "This ID is not assoicated to any thoughts." });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete a reaction
  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Unable to delete." });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
