import axios from '../base'

function getPixById (id) {
  return axios({
    url: `/illusts/${id}`,
    method: 'get'
  })
}

function related (id) {
  return axios({
    url: `/illusts/${id}/related/`
  })
}

export { getPixById, related }
