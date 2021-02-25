import config from '../config';
import TokenService from './token-service';

const ExpensesService = {
  getExpenses() {
    return fetch(`${config.API_ENDPOINT}/expenses`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  filterExpenses(fromDate, toDate) {
    return fetch(`${config.API_ENDPOINT}/expenses/find/${fromDate}/${toDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getIncomeCategories() {
    return fetch(`${config.API_ENDPOINT}/expense-categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  createIncome(values) {
    return fetch(`${config.API_ENDPOINT}/expenses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(values)
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          throw res;
        });
      }
    });
  },
  updateIncome(id, values) {
    return fetch(`${config.API_ENDPOINT}/expenses/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(values)
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          throw res;
        });
      }
    });
  },
  getIncomeById(id) {
    return fetch(`${config.API_ENDPOINT}/expenses/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteIncome(id) {
    return fetch(`${config.API_ENDPOINT}/expenses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => {
          throw res;
        });
      }
    });
  }
};

export default ExpensesService;
