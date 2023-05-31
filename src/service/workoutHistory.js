import API_URL from './config';

const API_END_POINT = `${API_URL}/workoutHistory`;

export async function createWorkoutHistoryService(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readWorkoutHistoryByIdService({idActivity}) {
  return await fetch(`${API_END_POINT}/byId/${idActivity}`);
}

export async function readWorkoutHistoryListByIdUserService(idUser) {
  return await fetch(`${API_END_POINT}/list/${idUser}`);
}

export async function deleteWorkoutHistoryByIdService(idWorkout) {
  return await fetch(`${API_END_POINT}`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idWorkout),
  });
}
