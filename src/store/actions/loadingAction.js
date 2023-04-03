export function setLoading() {
  return {type: 'SET_LOADING', payload: true};
}

export function unsetLoading() {
  return {type: 'UNSET_LOADING', payload: false};
}
