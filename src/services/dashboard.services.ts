import api from './api';

export function DashboardGet() {
  return api.get('/dashboard');
}
