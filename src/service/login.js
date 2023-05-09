import API_URL from './config';

const API_END_POINT = `${API_URL}/login`;

export async function createAccountService(data) {
  return await fetch(`${API_END_POINT}/createAccount`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function loginService(data) {
  return await fetch(`${API_END_POINT}/login`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}
