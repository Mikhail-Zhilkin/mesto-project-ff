export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  const closePopupKey = (evt) => {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", closePopupKey);
    };
  };

  document.addEventListener("keydown", closePopupKey);
};

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
};

export function closePopupOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target.contains(popup)) {
      popup.classList.remove("popup_is-opened");
    };
  });
}; 
