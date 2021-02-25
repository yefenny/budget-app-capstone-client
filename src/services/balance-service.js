import config from '../config';
import TokenService from './token-service';

const BalanceService = {
  getBalance() {
    return fetch(`${config.API_ENDPOINT}/balances`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }
};

export default BalanceService;
