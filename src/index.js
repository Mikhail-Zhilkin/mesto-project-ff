import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard } from "./components/card.js";
import { deleteCard } from "./components/card.js";
import { handlerLike } from "./components/card.js";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { closePopupOverlay } from "./components/modal.js";

const cardsList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditButton = document.querySelector(".profile__edit-button");
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector(".popup__close");
const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const popupTypeNewCardButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupTypeNewCard = popupTypeNewCard.querySelector(".popup__close");
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formNewPlace.elements.placeName;
const linkInput = formNewPlace.elements.link;
const buttonClosePopupTypeImage = popupTypeImage.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard, handlerLike, openImage);

  cardsList.append(cardElement);
});

popupTypeEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  const handlerClose = () => {
    closePopup(popupTypeEdit);

    buttonClosePopupTypeEdit.removeEventListener("click", handlerClose);
  };

  buttonClosePopupTypeEdit.addEventListener("click", handlerClose);

  closePopupOverlay(popupTypeEdit);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEdit);

  formProfile.reset();
};

formProfile.addEventListener("submit", handleProfileFormSubmit);

popupTypeNewCardButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);

  const handlerClose = () => {
    closePopup(popupTypeNewCard);

    buttonClosePopupTypeNewCard.removeEventListener("click", handlerClose);
  };

  buttonClosePopupTypeNewCard.addEventListener("click", handlerClose);

  closePopupOverlay(popupTypeNewCard);
});

function handleformNewPlaceSubmit(evt, arr) {
  evt.preventDefault();

  arr = [{ name: placeNameInput.value, link: linkInput.value }];

  arr.map((item) => {
    const cardElement = createCard(item, deleteCard, handlerLike, openImage);

    cardsList.prepend(cardElement);
  });

  closePopup(popupTypeNewCard);
  
  formNewPlace.reset();
};

formNewPlace.addEventListener("submit", handleformNewPlaceSubmit);

function openImage(src, name) {
  popupImage.src = src;
  popupImage.alt = `${name}: фотография`;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);

  const handlerClose = () => {
    closePopup(popupTypeImage);

    buttonClosePopupTypeImage.removeEventListener("click", handlerClose);
  };

  buttonClosePopupTypeImage.addEventListener("click", handlerClose);

  closePopupOverlay(popupTypeImage);
};

function addAnimation(popup) {
  if (popup.classList.contains("popup")) {
    popup.classList.add("popup_is-animated");
  }
};

addAnimation(popupTypeEdit);
addAnimation(popupTypeNewCard);
addAnimation(popupTypeImage);
