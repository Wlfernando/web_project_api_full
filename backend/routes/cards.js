const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../handlers/handlersCard');
const { validateCard } = require('../utils/utils');

cardsRouter.get('', getCards);

cardsRouter.post('', validateCard(), createCard);

cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/likes/:cardId', putCardLike);

cardsRouter.delete('/likes/:cardId', deleteCardLike);

module.exports = cardsRouter;
