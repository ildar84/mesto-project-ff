  const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
      authorization: '03be439b-f60c-48ad-a32d-929108118bdf',
      'Content-Type': 'application/json'
    }
  };

  const checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(res => checkResult(res));
  };

  const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => checkResult(res));
  };

  const updateUserData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => checkResult(res));
  };

  const createNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => checkResult(res));
  };
 
  const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResult(res));
  };

  const createLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => checkResult(res));
  };

  const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResult(res));
  };

  const updateAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => checkResult(res));  
  };

  export { getUserData, getInitialCards, updateUserData, createNewCard, deleteCard, createLike, deleteLike, updateAvatar };