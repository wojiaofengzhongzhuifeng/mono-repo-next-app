export const prefixUrl = '/api/user'

export type ApiConfig = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  manual: boolean
  showError: boolean
}
