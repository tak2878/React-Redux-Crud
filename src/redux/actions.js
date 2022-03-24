import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const deletedUser = () => ({
  type: types.DELETE_USER,
});

const AddUser = () => ({
  type: types.ADD_USER,
});

const userUpdated = () => ({
  type: types.UPDATE_USER,
});

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

var url = "http://localhost:5000/users";

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${url}`)
      .then((resp) => {
        dispatch(getUsers(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${url}/${id}`)
      .then((resp) => {
        dispatch(deletedUser());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${url}`, user)
      .then(() => {
        dispatch(AddUser());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`${url}/${id}`)
      .then((resp) => {
        dispatch(getUser(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${url}/${id}`, user)
      .then(() => {
        dispatch(userUpdated());
      })
      .catch((error) => console.log(error));
  };
};
