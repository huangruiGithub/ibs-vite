const defaultSettings = {
  title: '高档数控机床综合业务系统',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,
  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false
}

const title = defaultSettings.title || '高档数控机床综合业务系统'

export default function getPageTitle(pageTitle: any) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
