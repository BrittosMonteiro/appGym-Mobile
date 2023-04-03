let initialState = false;

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return (state = action.payload);
    case 'SET_LOADING':
      return (state = initialState);
    default:
      return (state = initialState);
  }
}
