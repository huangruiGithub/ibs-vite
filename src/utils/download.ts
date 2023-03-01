import iconv from 'iconv-lite'
export function fileDownload(res: any) {
  const a = document.createElement('a')
  const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
  const temp = res.headers['content-disposition'].split(';')[1].split('filename=')[1]
  // 对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
  //   iconv.skipDecodeWarning = true // 忽略警告
  const fileName = iconv.decode(temp, 'utf-8')
  a.setAttribute('download', fileName)
  const objectUrl = URL.createObjectURL(blob)
  a.setAttribute('href', objectUrl)
  a.click()
}
