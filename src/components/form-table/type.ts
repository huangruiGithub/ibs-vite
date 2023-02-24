export type selectOptionType = { label: string; value: string | number; type?: string }
export type tagOptionType = { label: string; value: string | number; type?: string }
export type indexType = (index: number) => any | number
export interface tableLabelType {
  prop?: string
  label?: string
  type?: string
  align?: string
  columnKey?: string
  showOverflowTooltip?: boolean
  otherProps?: any
  format?: string
  selectOptions?: selectOptionType[]
  tagOptions?: tagOptionType[]
  unit?: string
  index?: indexType
  tag?: string
  valueFormat?: (scope: any, label: tableLabelType) => any
}
export interface propsType {
  tableLabel: tableLabelType[]
  tableData: any[]
  pagination?: boolean
  currentPage?: number
  pageSize?: number
  tableTotalSize?: number
}