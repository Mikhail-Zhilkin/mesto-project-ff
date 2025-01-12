export function createCard(data, functionDelete, functionLike, functionOpenImage) {
  const card = document.querySelector("#card-template").content.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = `${data.name}: фотография`;
  cardTitle.textContent = data.name;
  cardDeleteButton.addEventListener("click", functionDelete);

  cardLikeButton.addEventListener("click", functionLike);

  cardImage.addEventListener("click", () =>
    functionOpenImage(data.link, data.name)
  );

  return card;
};

export function deleteCard(evt) {
  evt.target.closest("li").remove();
};

export function handlerLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  };
};
