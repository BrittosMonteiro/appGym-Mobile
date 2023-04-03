let initialState = false;

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_OPEN':
      return (state = true);
    case 'SET_CLOSE':
      return (state = initialState);
    default:
      return (state = initialState);
  }
}
