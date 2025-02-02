const config = { 
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31", 
  headers: { 
    authorization: "bc81cc80-82be-41b8-a147-e833db250c50", 
    "Content-Type": "application/json", 
  }, 
}; 

function getResponse(res) { 
  if(res.ok){ 
      return res.json() 
  } 
  return Promise.reject(`Ошибка: ${res.status}`); 
} 

function getInfo() { 
  return fetch(`${config.baseUrl}/users/me`, { 
      headers: config.headers 
  }).then(getResponse) 
} 

function getCards() { 
  return fetch(`${config.baseUrl}/cards`, { 
      headers: config.headers 
  }).then(getResponse) 
} 

function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      about: about.value
    })
}).then(getResponse)
}

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      link: link.value
    })
  }).then(getResponse)
}

function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(getResponse)
};

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(getResponse)
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(getResponse)
}

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(getResponse)
}

export { getResponse, getInfo, getCards, editProfile, addCard, deleteCardApi, putLike, deleteLike, updateAvatar }