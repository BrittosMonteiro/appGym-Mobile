let initialState = {
  id: '',
  idGym: '',
  displayName: '',
  token: '',
  userLevel: '',
};

export default function userSessionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return (state = action.payload);
    case 'UNSET_USER':
      return (state = initialState);
    default:
      return state;
  }
}
