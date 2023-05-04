let API_URL = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  API_URL = 'http://192.168.0.14:5050';
  // API_URL = 'http://localhost:5050';
  // API_URL = 'https://speleogym.onrender.com';
} else {
  API_URL = 'https://speleogym.onrender.com';
}

export default API_URL;
