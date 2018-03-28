export const getRandomEmoji = () => {
  const randomId = Math.floor(Math.random() * 90);
  return fetch(`http://localhost:3001/emojis/${randomId}`).then((response) => response.json())
};
