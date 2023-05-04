import API_URL from './config';

const API_END_POINT = `${API_URL}/training`;

export async function createTrainingService(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readActivityListService(idUser) {
  return await fetch(`${API_END_POINT}/list/${idUser}`);
}

export async function readTrainingByIdService(idActivity) {
  return await fetch(`${API_END_POINT}/byId/${idActivity}`);
}

export async function updateTrainingByIdService(data) {
  return await fetch(`${API_END_POINT}/`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteTrainingByIdService(idTraining) {
  return await fetch(`${API_END_POINT}`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idTraining),
  });
}
