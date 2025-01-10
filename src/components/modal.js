export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
        popup.classList.remove('popup_is-opened');  
        };
    });
};

export function closePopupWithButton(popup) {
    popup.classList.remove('popup_is-opened');
};

export function closePopupOverlay(popup) {
    popup.firstElementChild.addEventListener('click', (evt) => evt.stopPropagation());

    popup.addEventListener('click', () => popup.classList.remove('popup_is-opened'));
};