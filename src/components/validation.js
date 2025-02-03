const showInputError = (formElement, inputElement, errorMessege, validationConfig) => { 
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass); 
    errorElement.textContent = errorMessege;
  }; 
 
const hideInputError = (formElement, inputElement, validationConfig) => { 
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass); 
    errorElement.textContent = '';
} 
 
const isValid = (formElement, inputElement, validationConfig) => { 
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) { 
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig); 
    } else { 
      hideInputError(formElement, inputElement, validationConfig); 
    } 
  }; 

function setEventListeners (formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement)=>{
    inputElement.addEventListener('input', function() {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement)
    })
  })
}

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
     setEventListeners(formElement, validationConfig);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '')
  } else {
    buttonElement.removeAttribute('disabled')
  }
}

export function clearValidation(profileForm, validationConfig) {
    const buttonElement= profileForm.querySelector(validationConfig.submitButtonSelector);
    const inputElements = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));

    toggleButtonState(inputElements, buttonElement)

    inputElements.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig)
    }) 
}