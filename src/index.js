import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard } from './components/card.js';
import { deleteCard } from './components/card.js';
import { handlerLike } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopupWithButton } from './components/modal.js';
import { closePopupOverlay } from './components/modal.js';


const cardsList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');
const buttonCloseEditPopup = editPopup.firstElementChild.firstElementChild;
const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const NewCardButton = document.querySelector('.profile__add-button');
const NewCardPopup = document.querySelector('.popup_type_new-card');
const buttonCloseNewCardPopup = NewCardPopup.firstElementChild.firstElementChild;
const formNewPlace = document.querySelector('form[name="new-place"]');
const buttonCloseImagePopup = imagePopup.firstElementChild.firstElementChild;

initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard, handlerLike, openImage);

    cardsList.append(cardElement);
});

editPopupButton.addEventListener('click', () => {
    openPopup(editPopup);

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;

    buttonCloseEditPopup.addEventListener('click', () => {
        closePopupWithButton(editPopup);
    
        formProfile.reset();
    });

    closePopupOverlay(editPopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const profileTitle = document.querySelector('.profile__title');
    const profiledescription = document.querySelector('.profile__description');
    profileTitle.textContent = nameInput.value
    profiledescription.textContent = jobInput.value;

    editPopup.classList.remove('popup_is-opened');
    formProfile.reset();
};

formProfile.addEventListener('submit', handleProfileFormSubmit);

NewCardButton.addEventListener('click', () => {
    openPopup(NewCardPopup);

    buttonCloseNewCardPopup.addEventListener('click', () => {
        closePopupWithButton(NewCardPopup);

        formNewPlace.reset();
    });

    closePopupOverlay(NewCardPopup);
});

function handleformNewPlaceSubmit(evt, arr) {
    evt.preventDefault();

    arr = [{name: evt.target[0].value, link: evt.target[1].value}];

    arr.forEach((item) => {
        const cardElement = createCard(item, deleteCard, handlerLike, openImage);
    
        cardsList.prepend(cardElement);
    });

    NewCardPopup.classList.remove('popup_is-opened');
    formNewPlace.reset();
};

formNewPlace.addEventListener('submit', handleformNewPlaceSubmit);

function openImage(src, alt) {
    popupImage.src = src;
    popupCaption.textContent = alt;

    openPopup(imagePopup);

    buttonCloseImagePopup.addEventListener('click', ()=>closePopupWithButton(imagePopup));
    
    closePopupOverlay(imagePopup);
};

function addAnimation (popup) {
    if(popup.classList.contains('popup')){
    popup.classList.add('popup_is-animated')
    };
};

addAnimation(editPopup);
addAnimation(NewCardPopup);
addAnimation(imagePopup);
