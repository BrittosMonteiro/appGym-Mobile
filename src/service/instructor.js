import API_URL from './config';

export async function createInstructorService(data) {
  return await fetch(`${API_URL}/instructor/create`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readInstructorListService(idGym) {
  return await fetch(`${API_URL}/instructor/list/${idGym}`);
}

export async function readInstructorByIdService(idInstructor) {
  return await fetch(`${API_URL}/instructor/byId/${idInstructor}`);
}

export async function updateInstructorService(data) {
  return await fetch(`${API_URL}/instructor/update`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteInstructorService(idInstructor) {
  return await fetch(`${API_URL}/instructor/delete`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idInstructor),
  });
}
