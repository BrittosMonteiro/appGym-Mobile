import API_URL from './config';

const API_END_POINT = `${API_URL}/activity`;

export async function createActivityService(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readActivityListService() {
  return await fetch(`${API_END_POINT}`);
}

export async function updateActivity(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}
