import API_URL from './config';

export async function createActivityService(data) {
  return await fetch(`${API_URL}/activity/create`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readActivityListService(idUser) {
  return await fetch(`${API_URL}/activity/list/${idUser}`);
}

export async function readActivityByIdService(idActivity) {
  return await fetch(`${API_URL}/activity/byId/${idActivity}`);
}
