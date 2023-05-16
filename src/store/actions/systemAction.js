export function setMessageSuccess(text) {
  return {
    type: 'SET_MESSAGE_SUCCESS',
    payload: {
      show: true,
      cardBackgroundColor: '#219653',
      textBackgroundColor: '#25a65c',
      text,
    },
  };
}

export function setMessageError(text) {
  return {
    type: 'SET_MESSAGE_ERROR',
    payload: {
      show: true,
      cardBackgroundColor: '#EB5757',
      textBackgroundColor: '#ED6969',
      text,
    },
  };
}

export function setMessageOff() {
  return {
    type: 'SET_MESSAGE_OFF',
    payload: {
      show: false,
      cardBackgroundColor: '',
      textBackgroundColor: '',
      text: '',
    },
  };
}
