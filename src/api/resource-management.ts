import request from '@/utils/request'

interface loadEndpointTableDataParamsType {
  currentPage: number
  pageSize: number
  params: {
    testToolName?: string
    endpointName?: string
    protocolType?: string | number
    type: number
  }
  sort: {}
}
export function loadEndpointTableData(data: loadEndpointTableDataParamsType) {
  return request({
    url: '/endpoint/loadEndpointTableData',
    method: 'post',
    data
  })
}
export function deleteThreePartyEndpoint(data: { endpointIds: number[] }) {
  return request({
    url: '/endpoint/deleteThreePartyEndpoint',
    method: 'post',
    data
  })
}
export function getProtocolList(params: { type: number }) {
  return request({
    url: '/endpoint/getProtocolList',
    method: 'get',
    params
  })
}
export function download(data: any) {
  return request({
    url: 'files/download',
    method: 'post',
    responseType: 'blob',
    headers: {
      // 和后端设置的一样
      'Content-Type': 'application/octet-stream;charset=UTF-8'
    },
    data
  })
}
