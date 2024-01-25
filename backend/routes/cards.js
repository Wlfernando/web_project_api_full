const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../handlers/handlersCard');

cardsRouter.get('', getCards);

cardsRouter.post('', createCard);

cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/likes/:cardId', putCardLike);

cardsRouter.delete('/likes/:cardId', deleteCardLike);

module.exports = cardsRouter;
