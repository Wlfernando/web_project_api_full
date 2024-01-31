import myApi from "./api";

const { me, login, registry, sign, get } = myApi;

function confirmBody(user) {
  if (typeof user !== 'object') {
    throw new Error('Pass an object')
  }

  if (!user.password) {
    throw new Error('Missed password')
  }

  if (!user.email) {
    throw new Error('Missed email')
  }

  if (Object.keys(user).length !== 2) {
    throw new Error('There\'re more elements needed')
  }
}

export function register(user) {
  confirmBody(user)

  return sign(registry, user)
}

export function signin(user) {
  confirmBody(user)

  return sign(login, user)
    .then(({ token }) => {
      sessionStorage.setItem('token', token)
      return get(me)
    })
    .then((user) => {
      sessionStorage.setItem('email', user.email)
    })
}