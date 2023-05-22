import API_URL from './config';

const API_END_POINT = `${API_URL}/group`;

export async function createCategoryService(data) {
  return await fetch(`${API_END_POINT}`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readCategoriesService() {
  return await fetch(`${API_END_POINT}/`);
}

export async function countCategoriesService() {
  return await fetch(`${API_END_POINT}/countCategories`);
}

export async function deleteCategoryService(idCategory) {
  return await fetch(`${API_END_POINT}`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idCategory),
  });
}
