// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(data, del) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__image').src = data.link;
    card.querySelector('.card__title').textContent = data.name;
    card.querySelector('.card__delete-button').addEventListener('click', (e) => del(e));

    return card;
}

// @todo: Функция удаления карточки

function deleteCard(e) {
    e.target.closest('li').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard);

    cardsList.append(cardElement);
});

