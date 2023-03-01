import request from '@/utils/request'

interface loadEndpointTableDataParamsType {
  currentPage: number;
  pageSize: number;
  params: {
    testToolName?: string;
    endpointName?: string;
    protocolType?: string | number;
    type: number;
  };
  sort: {};
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