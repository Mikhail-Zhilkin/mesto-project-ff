import "./pages/index.css";
import { createCard } from "./components/card.js";
import { deleteCard } from "./components/card.js";
import { handlerLike } from "./components/card.js";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { getInfo, getCards, editProfile, addCard, updateAvatar } from "./components/api.js";
import { validationConfig } from "./components/validation.js";
import { enableValidation } from "./components/validation.js";
import { clearValidation } from "./components/validation.js";

const cardsList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditButton = document.querySelector(".profile__edit-button");
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector(".popup__close");
const formProfile = document.querySelector('form[name="edit-profile"]');
const formProfileSubmit = formProfile.querySelector(".popup__button")
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const popupTypeNewCardButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupTypeNewCard = popupTypeNewCard.querySelector(".popup__close");
const formNewPlace = document.querySelector('form[name="new-place"]');
const formNewPlaceSubmit = formNewPlace.querySelector(".popup__button");
const placeNameInput = formNewPlace.elements.placeName;
const linkInput = formNewPlace.elements.link;
const buttonClosePopupTypeImage = popupTypeImage.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const buttonClosePopupTypeNewAvatar = popupTypeNewAvatar.querySelector(".popup__close");
const formNewAvatar = document.querySelector('form[name="new-avatar"]');
const newAvatarInput = formNewAvatar.elements.link;
const formNewAvatarSubmit = formNewAvatar.querySelector(".popup__button")
let userId = '';

enableValidation(validationConfig);

function renderLoading(popupSubmit, isLoading) {
  if(isLoading) {
    popupSubmit.textContent = 'Сохранение...'
  } else {
    popupSubmit.textContent = 'Сохранить'
  }
}

profileImage.addEventListener('click', () => {
  clearValidation(popupTypeNewAvatar, validationConfig)
  openPopup(popupTypeNewAvatar);
});

buttonClosePopupTypeNewAvatar.addEventListener('click', () => {
  closePopup(popupTypeNewAvatar);
})

popupTypeNewAvatar.addEventListener("click", (evt) => {
  if (evt.target.contains(popupTypeNewAvatar)) {
    closePopup(popupTypeNewAvatar);
  };
});

function handleFormNewAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(formNewAvatarSubmit, true)

  updateAvatar(newAvatarInput.value)
    .then((res) => {
      profileImage.setAttribute('style', `background-image: url('${res.avatar}')`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formNewAvatarSubmit), false);

  closePopup(popupTypeEdit);

  formProfile.reset();
};

formNewAvatar.addEventListener('submit', handleFormNewAvatarSubmit)

function handlePopupTypeEditOpening() {
  clearValidation(popupTypeEdit, validationConfig)
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  formProfileSubmit.removeAttribute('disabled')

};

function handlePopupTypeEditClosing() {
  closePopup(popupTypeEdit);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(formProfileSubmit, true)

  editProfile(nameInput, jobInput)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name
      profileDescription.textContent = userInfo.about
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formProfileSubmit, false));

  closePopup(popupTypeEdit);

  formProfile.reset();
};

formProfile.addEventListener("submit", handleProfileFormSubmit);

popupTypeEditButton.addEventListener("click", handlePopupTypeEditOpening);

buttonClosePopupTypeEdit.addEventListener("click", handlePopupTypeEditClosing);

popupTypeEdit.addEventListener("click", (evt) => {
  if (evt.target.contains(popupTypeEdit)) {
    closePopup(popupTypeEdit);
  };
});

function handlePopupTypeNewCardOpening() {
  clearValidation(popupTypeNewCard, validationConfig)
  openPopup(popupTypeNewCard);
};

function handlePopupTypeNewCardClosing() {
  closePopup(popupTypeNewCard);
};

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  renderLoading(formNewPlaceSubmit, true);
  
  addCard(placeNameInput, linkInput)
    .then((cardData) => {
      const cardElement = createCard(cardData, userId, deleteCard, handlerLike, openImage);
      cardsList.prepend(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formNewPlaceSubmit, false));

  closePopup(popupTypeNewCard);

  formNewPlace.reset();
};

formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);

popupTypeNewCardButton.addEventListener("click", handlePopupTypeNewCardOpening);

buttonClosePopupTypeNewCard.addEventListener("click", handlePopupTypeNewCardClosing);

popupTypeNewCard.addEventListener("click", (evt) => {
  if (evt.target.contains(popupTypeNewCard)) {
    closePopup(popupTypeNewCard);
  };
});

function openImage(src, name) {
  popupImage.src = src;
  popupImage.alt = `${name}: фотография`;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
}

function handlePopupTypeImageClosing() {
  closePopup(popupTypeImage);
};

buttonClosePopupTypeImage.addEventListener("click", handlePopupTypeImageClosing);

popupTypeImage.addEventListener("click", (evt) => {
  if (evt.target.contains(popupTypeImage)) {
    closePopup(popupTypeImage);
  };
});

function addAnimation(popup) {
  if (popup.classList.contains("popup")) {
    popup.classList.add("popup_is-animated");
  };
};

addAnimation(popupTypeEdit);
addAnimation(popupTypeNewCard);
addAnimation(popupTypeImage); 
addAnimation(popupTypeNewAvatar);

Promise.all([getInfo(), getCards()]) 
  .then((res) => { 
    profileTitle.textContent = res[0].name 
    profileDescription.textContent = res[0].about 
    profileImage.setAttribute('style', `background-image: url('${res[0].avatar}')`);
    userId = res[0]._id 

    res[1].forEach((card) => { 
          const cardElement = createCard(card, userId, deleteCard, handlerLike, openImage);
          cardsList.append(cardElement);
        }) 
  })
  .catch((err) => {
    console.log(err);
  });