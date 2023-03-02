import request from '@/utils/request'

export function loadKnowledgebaseAssetGrid(data: any) {
  return request({
    url: 'knowledgebaseAsset/loadGrid',
    method: 'post',
    data
  })
}
export function addKnowledgebaseAsset(data: any) {
  return request({
    url: 'knowledgebaseAsset/add',
    method: 'post',
    data
  })
}
export function updateKnowledgebaseAsset(data: any) {
  return request({
    url: 'knowledgebaseAsset/update',
    method: 'post',
    data
  })
}

export function deleteKnowledgebaseAsset(data: any) {
  return request({
    url: 'knowledgebaseAsset/delete',
    method: 'post',
    data
  })
}

export function downloadTemplate(data: any, type: string) {
  return request({
    url: `${type}/downloadTemplate`,
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function importDataFromExcel(data: any, type: string) {
  return request({
    url: `${type}/importDataFromExcel`,
    method: 'post',
    data
  })
}
