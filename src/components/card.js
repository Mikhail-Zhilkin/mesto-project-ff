export function createCard(data, functionDelete, functionLike, functionOpenImage) {
    const card = document.querySelector('#card-template').content.cloneNode(true);

    card.querySelector('.card__image').src = data.link;
    card.querySelector('.card__image').alt = `${data.name}: фотография`;
    card.querySelector('.card__title').textContent = data.name;
    card.querySelector('.card__delete-button').addEventListener('click', functionDelete);

    document.querySelector('.places__list').addEventListener('click', functionLike);

    card.querySelector('.card__image').addEventListener('click', () => functionOpenImage(data.link, data.name));

    return card;
};

export function deleteCard(evt) {
    evt.target.closest('li').remove();
};

export function handlerLike (evt) {
    if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active')
    };
};