import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }