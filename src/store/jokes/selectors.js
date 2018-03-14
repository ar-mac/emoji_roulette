export const getJoke = (id) =>
  state.jokes.byId[id] || { id,  value: '' };

