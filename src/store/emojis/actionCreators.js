export const getRandomEmoji = () => {
  const randomId = Math.floor(Math.random() * 90);
  return fetch(`http://localhost:3001/emojis/${randomId}`).then((response) => response.json())
};

export const getEmojis = (ids) => {
  const requests = ids.map(id => id ? getEmoji(id) : {})
  return Promise.all(requests)
};

export const getEmoji = id => fetch(`http://localhost:3001/emojis/${id}`).then(emoji => emoji.json())