export function setUser(data) {
  return {type: 'SET_USER', payload: data};
}

export function unsetUser() {
  return {type: 'UNSET_USER'};
}
