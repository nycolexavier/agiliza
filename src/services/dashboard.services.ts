import api from './api';

export function buscarDashboard() {
  return api.get('/dashboard');
}
