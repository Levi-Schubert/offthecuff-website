import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'offthecuff.auth0.com',
    clientID: 'lvr0YInBkYfF4LgAKoKFZ1C1S7ozQ6wz',
    redirectUri: 'http://localhost:3000',
    audience: 'https://offthecuff.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login(){
    this.auth0.authorize();
  }
}