import { openPopup } from "./modal";
import { closePopup } from "./modal";
import { deleteCardApi, deleteLike, putLike } from "./api";


export function createCard(data, userId, functionDelete, functionLike, functionOpenImage) {
  const card = document.querySelector("#card-template").content.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");
  const popupTypeDeleteCard = card.querySelector('.popup_type_delete-card');
  const popupTypeDeleteCardButton = card.querySelector('.popup__button')
  const buttonClosePopupTypeDeleteCard = card.querySelector(".popup__close");

  cardImage.src = data.link;
  cardImage.alt = `${data.name}: фотография`;
  cardTitle.textContent = data.name;
  cardLikeCounter.textContent = data.likes.length;

  if(data.owner._id !== userId) {
    cardDeleteButton.remove()
  } else {
    popupTypeDeleteCardButton.addEventListener('click', (evt) => {
      functionDelete(evt, data._id)
    })
  }

  cardDeleteButton.addEventListener("click", () => {
    openPopup(popupTypeDeleteCard);
  });
  buttonClosePopupTypeDeleteCard.addEventListener('click', () => {
    closePopup(popupTypeDeleteCard);
  })
  popupTypeDeleteCard.addEventListener("click", (evt) => {
   if (evt.target.contains(popupTypeDeleteCard)) {
     closePopup(popupTypeDeleteCard);
   };
 });

  popupTypeDeleteCard.classList.add("popup_is-animated");

  const isMyLike = data.likes.some((item) => {
    return item._id === userId
  })

  if(isMyLike) {
    cardLikeButton.classList.add("card__like-button_is-active")
  }

  cardLikeButton.addEventListener("click", (evt) => {
    functionLike(evt, cardLikeCounter, data._id)
  });

  cardImage.addEventListener("click", () =>
    functionOpenImage(data.link, data.name)
  );

  return card;
};

export function deleteCard(evt, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      evt.target.closest("li").remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

export function handlerLike(evt, likeCounter, cardId) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
