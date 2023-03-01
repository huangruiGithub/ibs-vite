export type selectOptionType = { label: string; value: string | number; type?: string }

export interface formConfType {
  prop: string
  label?: string
  span?: number
  hide?: boolean
  type?: string
  otherProps?: any
  width: string | number
  selectOptions?: selectOptionType[]
  unit?: string
}