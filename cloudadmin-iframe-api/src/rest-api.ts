import { CloudAdminConfig } from './types'

const request = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}

const apiPost = async (url: string, payload: any) => {
  const response = await fetch(url, {
    ...request,
    body: JSON.stringify(payload)
  })
  if (response.headers.get('content-type') === 'application/json') {
    return response.json()
  }
  if (response.status >= 200 && response.status < 300) {
    return true
  }
  return false
}

export const getAccessToken = async (config: CloudAdminConfig) => {

  const URL_GET_TOKEN = `${config.cloudAdminApiUrl}/tangoe/user/token`
  const URL_VALIDATE_TOKEN = `${config.cloudAdminApiUrl}/token/validate`

  const response = await apiPost(URL_GET_TOKEN, {
    client_id: config.clientId,
    email: config.clientEmail
  })
  const result = await apiPost(URL_VALIDATE_TOKEN, {
    client_id: config.clientId,
    access_token: response.access_token
  })
  return result ? response.access_token : null
}
