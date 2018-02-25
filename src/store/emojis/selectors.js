export const getSelectedEmoji = (state) =>
  state.emojis.byId[state.emojis.selectedEmojiId] || { id: state.emojis.selectedEmojiId, notFound: true };

export const getPreviousEmojis = (state) => state.emojis.previousEmojisIds.map((id) =>
  state.emojis.byId[id] || { id, notFound: true });

