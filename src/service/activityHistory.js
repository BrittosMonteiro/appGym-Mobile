import API_URL from './config';

export async function createActivityHistoryService(idActivity) {
  return await fetch(`${API_URL}/activityHistory/create`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idActivity),
  });
}

export async function readActivityHistoryByIdService({idActivity}) {
  return await fetch(`${API_URL}/activityHistory/byId/${idActivity}`);
}
