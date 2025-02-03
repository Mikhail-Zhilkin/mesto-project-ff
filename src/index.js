import "./pages/index.css";
import { createCard } from "./components/card.js";
import { handlerLike } from "./components/card.js";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";
import { getInfo, getCards, editProfile, addCard, deleteCardApi, updateAvatar } from "./components/api.js";
import { enableValidation } from "./components/validation.js";
import { clearValidation } from "./components/validation.js";

const cardsList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupTypeImageCaption = popupTypeImage.querySelector(".popup__caption");
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
const formNewAvatarSubmit = formNewAvatar.querySelector(".popup__button");
const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');
const popupTypeDeleteCardButton = popupTypeDeleteCard.querySelector('.popup__button')
const buttonClosePopupTypeDeleteCard = popupTypeDeleteCard.querySelector(".popup__close");
let userId = '';
const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

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
      closePopup(popupTypeNewAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formNewAvatarSubmit), false);

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
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formProfileSubmit, false));

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
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formNewPlaceSubmit, false));

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
  popupTypeImageCaption.textContent = name;

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

function deleteCard(card) {
  openPopup(popupTypeDeleteCard);
  popupTypeDeleteCardButton.dataset.card = card._id;
}

function hundleDeleteCard() {
  const card = popupTypeDeleteCardButton.dataset.card

  deleteCardApi(card)
    .then(() => {
      document.getElementById(card).remove();
      popupTypeDeleteCardButton.dataset.card = "";
      closePopup(popupTypeDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    });
};

popupTypeDeleteCardButton.addEventListener("click", hundleDeleteCard);

buttonClosePopupTypeDeleteCard.addEventListener('click', () => {
  closePopup(popupTypeDeleteCard);
})
popupTypeDeleteCard.addEventListener("click", (evt) => {
 if (evt.target.contains(popupTypeDeleteCard)) {
   closePopup(popupTypeDeleteCard);
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
addAnimation(popupTypeDeleteCard);

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