let API_URL = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  API_URL = 'http://192.168.0.14:5050';
} else {
  API_URL = 'https://app-produtividade-api.onrender.com';
}

export default API_URL;
