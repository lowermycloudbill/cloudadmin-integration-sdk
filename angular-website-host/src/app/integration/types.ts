export type Tenant = {
  id: string,
  short_name: string,
  selected: boolean
}

export type IntegrationProperty = {
  token: string | undefined,
  tenant?: string
}
