let initialState = {
  id: null,
  token: null,
  userType: 3,
};

export default function userSessionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return (state = action.payload);
    case 'UNSET_USER':
      return (state = initialState);
    default:
      return (state = initialState);
  }
}
