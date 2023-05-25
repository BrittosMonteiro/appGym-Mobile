let initialState = {
  show: false,
  cardBackgroundColor: '',
  textBackgroundColor: '',
  text: [],
};

export default function systemMessageReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGE_SUCCESS':
      return (state = action.payload);
    case 'SET_MESSAGE_ERROR':
      return (state = action.payload);
    case 'SET_MESSAGE_OFF':
      return (state = initialState);
    default:
      return state;
  }
}
