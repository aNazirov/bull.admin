import { ILogin, IUser } from "@interfaces/interfaces";
import { getUserByToken, loginService, Toast } from "@services/index";
import { globalAction } from "./global.slices";


const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expired_at");
  localStorage.clear();
};

export const userSet = (user: IUser) => async (dispatch: any) => {
  dispatch(globalAction.setUser({ user }));
};

export const loginByPassword = (params: ILogin) => async (dispatch: any) => {
  return loginService(params)
    .then(({ user, jwt }) => {
      dispatch(userSet(user));
      dispatch(login({ token: jwt }));
    })
    .catch((e) => Toast.error(e));
};

export const autoLogIn = () => async (dispatch: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    return getUserByToken()
      .then((user) => {
        dispatch(userSet(user));
        dispatch(globalAction.logIn({ token }));
      })
      .catch((e) => {
        Toast.error(e);

        if (e.response?.status === 404) {
          dispatch(userLogout());
        }
      });
  }

  window.location.href = window.location.href.replace(
    window.location.pathname,
    "/login"
  );
};

export const login = (data: any) => async (dispatch: any) => {
  localStorage.setItem("token", data.token ? data.token : "");

  dispatch(globalAction.logIn({ ...data }));
};

export const userLogout = () => async (dispatch: any) => {
  clearStorage();
  dispatch(globalAction.logOut());
};
