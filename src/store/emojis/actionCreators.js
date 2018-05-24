export const getRandomEmoji = () => {
  const randomId = Math.floor(Math.random() * 90);
  return fetch(`http://localhost:3001/emojis/${randomId}`).then((response) => response.json())
};

export const getEmojis = () => {
//  implement action creator for fetching emojis with specific IDs
//  it's needed for `setupDraws` action creator
//  hint: check json-server documentation how to fetch multiple emojis with provided ids with one request
};
