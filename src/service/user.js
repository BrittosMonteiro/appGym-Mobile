import API_URL from './config';

export async function createGymUser(data) {
  return await fetch(`${API_URL}/user/createGymUser`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readGymUsersListService(idGym) {
  return await fetch(`${API_URL}/user/byGym/${idGym}`);
}

export async function readUserByIdService(idUser) {
  return await fetch(`${API_URL}/user/byId/${idUser}`);
}

export async function updatePasswordService(data) {
  return await fetch(`${API_URL}/user/updatePassword`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}