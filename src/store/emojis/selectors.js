export const getSelectedEmoji = (state) =>
  state.emojis.byId[state.emojis.selectedEmojiCP] || { codepoint: state.emojis.selectedEmojiCP, notFound: true };

export const getPreviousEmojis = (state) => state.emojis.previousEmojisCPs.map((codepoint) =>
  state.emojis.byId[codepoint] || { codepoint, notFound: true });

