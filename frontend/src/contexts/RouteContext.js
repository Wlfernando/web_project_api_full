import { createContext } from "react";

export const RouteContext = createContext()

const main = '/';

const register = main + 'signup';

const login = main + 'signin';

export const routeDev = {
  main,
  register,
  login,
}