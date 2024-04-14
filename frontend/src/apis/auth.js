import axios from 'axios';


const API = (token) =>
  axios.create({
    baseURL: 'http://localhost:8000',
    headers: { Authorization: token },
  });


let url = 'http://localhost:8000';

export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/login`, body);
  } catch (error) {
    console.log('error in loginuser api');
  }
};

export const registerUser = async (body) => {
  try {
    console.log(body)
    return await axios.post(`${url}/auth/register`, body);
    
  } catch (error) {
    console.log('error in register api');
  }
};
export const validUser = async () => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log('error in valid user api');
  }
};