export const getJokeById = (state, id) =>
  state.jokes.byId[id] || { id,  value: '' };

