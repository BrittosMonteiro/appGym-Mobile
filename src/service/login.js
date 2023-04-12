export async function createAccountService(data) {
  return fetch(`http://localhost:5050/login/createAccount`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function loginService(data) {
  return fetch(`http://localhost:5050/login/login`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}
