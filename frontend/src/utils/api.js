class Api {
  _get = 'GET'
  _post = 'POST'
  _delete = 'DELETE'
  _put = 'PUT'
  _patch = 'PATCH'

  constructor({baseUrl, headers}, endPoints) {
    this._baseUrl = baseUrl;
    this._getAuthorization = headers.getAuthorization;
    this._contentType = headers['Content-Type'];
    this._setEndPoints(endPoints)
  }

  _confirm(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}.`);
  }

  _setEndPoints(endPoints) {
    Object.entries(endPoints).forEach(([key, value]) => {
      this[key] = value
    })
  }

  _setBodyOptions({ method, body }) {
    return {
      method,
      headers: {
        authorization: this._getAuthorization(),
        "Content-Type": this._contentType,
      },
      body: JSON.stringify(body)
    }
  }

  _sendBody(endPoint, fetchOpt, root) {
    return fetch(this._baseUrl + endPoint, this._setBodyOptions(fetchOpt))
    .then(this._confirm)
    .then(() => this.get(root ?? endPoint))
  }

  get = (endPoint) => {
    return fetch(this._baseUrl + endPoint, {
      headers: {
        "Content-Type": this._contentType,
        "Authorization": this._getAuthorization(),
      }
    })
    .then(this._confirm)
  }

  toggle = (condition, endPoint, id) => {
    return fetch(this._baseUrl + endPoint + '/' + id, {
      method: condition ? this._delete : this._put,
      headers: {
        "Authorization": this._getAuthorization(),
      }
    })
    .then(this._confirm)
  }

  remove = (endPoint, id) => {
    return fetch(this._baseUrl + endPoint + '/' + id, {
      method: this._delete,
      headers: {
        authorization: this._getAuthorization(),
      }
    })
    .then(this._confirm)
  }

  patch = (endPoint, body, root = null) => {
    return this._sendBody(endPoint, { method: this._patch, body }, root)
      .then(this._confirm)
  }

  post = (endPoint, body, root = null) => {
    console.log(this._baseUrl + this.registry)
    return this._sendBody(endPoint, { method: this._post, body }, root)
      .then(this._confirm)
  }
}

const myApi = new Api({
  baseUrl: 'https://127.0.0.1:3000',
  headers: {
    getAuthorization: () => 'Bearer ' + sessionStorage.getItem('token'),
    "Content-Type": "application/json"
  }
}, {
  me: '/users/me',
  login: '/signin',
  registry: '/signup',
  cards: '/cards',
  avatar: '/users/me/avatar',
  likes: '/cards/likes',
})

export default myApi