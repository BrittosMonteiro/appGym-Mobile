import API_URL from './config';

export async function createPlanService(data) {
  return await fetch(`${API_URL}/plan/`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readPlanListService(idGym) {
  return await fetch(`${API_URL}/plan/list/${idGym}`);
}

export async function readPlanByIdService(idPlan) {
  return await fetch(`${API_URL}/plan/byId/${idPlan}`);
}

export async function updatePlanService(data) {
  return await fetch(`${API_URL}/plan/`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deletePlanService(idPlan) {
  return await fetch(`${API_URL}/plan/`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idPlan),
  });
}
