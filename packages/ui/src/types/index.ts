export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface NavigationItem {
  name: string
  href: string
}

export interface CompanyInfo {
  name: string
  email: string
  phone: string
  location: string
}

export type Size = 'sm' | 'md' | 'lg'
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'