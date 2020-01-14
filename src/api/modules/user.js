import axios from '../base'

// 获取图形验证码
function verificationCode () {
  return axios({
    url: `/verificationCode`,
    method: 'get'
  })
}

function register (data, params) {
  return axios({
    url: `/users?vid=${params.vid}&value=${params.value}`,
    method: 'post',
    data
  })
}

function login (data, params) {
  return axios({
    url: `/users/token?vid=${params.vid}&value=${params.value}`,
    method: 'post',
    data
  })
}

// 发送密码重置邮件
function resetPasswordEmail (email) {
  return axios({
    url: `/users/emails/${email}/resetPasswordEmail`,
    method: 'get'
  })
}

// 用户重置密码
function resetPassword (data) {
  return axios({
    // url: `/users/password?password=${data.password}&vid=${data.vid}&value=${data.value}`,
    url: `/users/password`,
    method: 'put',
    data
  })
}

// 效验邮箱可用性
function checkEmail (email) {
  return axios({
    url: `/users/emails/${email}`,
    method: 'get'
  })
}

// 校验用户名可用性
function checkUser (user) {
  return axios({
    url: `/users/usernames/${user}`,
    method: 'get'
  })
}

export { verificationCode, register, login, resetPasswordEmail, checkEmail, checkUser, resetPassword }
