import API_URL from './config';

const API_END_POINT = `${API_URL}/trainingHistory`;

export async function createTrainingHistoryService(idActivity) {
  return await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idActivity),
  });
}

export async function readTrainingHistoryByIdService({idActivity}) {
  return await fetch(`${API_END_POINT}/byId/${idActivity}`);
}
