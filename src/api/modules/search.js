import axios from '../base'

function format (param) {
  return encodeURIComponent(param).replace('%2F', '/')
}

function getKeyword (param) {
  return axios({
    url: `/keywords/${format(param)}/candidates`,
    method: 'get'
  })
}

function getSearch (params) {
  return axios({
    url: `/illustrations`,
    method: 'get',
    params: { ...params, pageSize: 30 }
  })
}

function getTags (param) {
  return axios({
    url: `/keywords/${format(param)}/pixivSuggestions`
  })
}

export { getSearch, getTags, getKeyword }
