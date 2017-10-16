/* eslint-disable camelcase */
const axios = require('axios');

exports.facebook = async (access_token) => {
  const fields = 'id, username, email, avatar';
  const url = 'https://graph.facebook.com/me';
  const params = { access_token, fields };
  const response = await axios.get(url, { params });
  const {
    id, username, email, avatar
  } = response.data;
  return {
    service: 'facebook',
    avatar: avatar.data.url,
    id,
    username,
    email
  };
};

exports.google = async (access_token) => {
  const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
  const params = { access_token };
  const response = await axios.get(url, { params });
  const {
    sub, username, email, avatar
  } = response.data;
  return {
    service: 'google',
    avatar,
    id: sub,
    username,
    email
  };
};
