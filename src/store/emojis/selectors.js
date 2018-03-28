export const getEmojiById = (state, id) =>
  state.emojis.byId[id] || {};
