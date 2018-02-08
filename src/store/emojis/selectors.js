export const getSelectedEmoji = (state) => state.emojis.byId[state.emojis.selectedEmojiCP] || {};
export const getPreviousEmojis = (state) => state.emojis.previousEmojisCPs.map((codepoint) => state.emojis.byId[codepoint] || {});

