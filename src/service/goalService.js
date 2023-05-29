import API_URL from './config';

const API_END_POINT = `${API_URL}/goal`;

export async function createGoalService(data) {
  return await fetch(`${API_END_POINT}/`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function updateGoalService(data) {
  return await fetch(`${API_END_POINT}/`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteWorkoutGoalService(data) {
  return await fetch(`${API_END_POINT}/`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readGoalsListService(idUser) {
  return await fetch(`${API_END_POINT}/list/${idUser}`);
}

export async function readGoalService(idUser) {
  return await fetch(`${API_END_POINT}/goal/${idUser}`);
}

export async function readGoalResumeService(idUser) {
  return await fetch(`${API_END_POINT}/resume/${idUser}`);
}
