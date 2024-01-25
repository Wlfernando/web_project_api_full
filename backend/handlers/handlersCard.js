const Card = require('../model/card');
const VoidError = require('../utils/components/VoidError');
const CastError = require('../utils/components/CastError');

function getCards(req, res) {
  Card.find({})
    .orFail(() => {
      throw new VoidError('No cards.');
    })
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(req.haveError);
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(() => res.send())
    .catch(req.haveError);
}

function deleteCard(req, res) {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new CastError('There\'s no card with that id.');
    })
    .then(() => res.send())
    .catch(req.haveError);
}

function putCardLike(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send())
    .catch(() => req.haveError(new CastError('Card not found.')));
}

function deleteCardLike(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send())
    .catch(() => req.haveError(new CastError('Card not found.')));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
