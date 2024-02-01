const Card = require('../model/card');
const CastError = require('../utils/components/CastError');

function hasNotFoundCard() {
  throw new CastError('Card not found.');
}

function getCards(req, res, next) {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(() => res.send())
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    .then(() => res.send())
    .catch(next);
}

function putCardLike(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send(), hasNotFoundCard)
    .catch(next);
}

function deleteCardLike(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send(), hasNotFoundCard)
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
