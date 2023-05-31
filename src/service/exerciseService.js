import API_URL from './config';

const API_END_POINT = `${API_URL}/exercise`;

export async function createExerciseService(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readExerciseListService() {
  return await fetch(`${API_END_POINT}`);
}

export async function countExercisesService() {
  return await fetch(`${API_END_POINT}/countExercises`);
}

export async function updateExerciseService(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteExerciseService(idItem) {
  return await fetch(`${API_END_POINT}`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idItem),
  });
}
