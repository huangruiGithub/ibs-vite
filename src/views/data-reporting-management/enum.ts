// 表 4 操作系统枚举表
export const systemTypeList = [
  { value: 1, label: 'Windows' },
  { value: 2, label: '嵌入式 Windows' },
  { value: 3, label: 'Linux' },
  { value: 4, label: '嵌入式 Linux' },
  { value: 5, label: 'Mac' },
  { value: 6, label: 'Unix' },
  { value: 7, label: 'IOS' },
  { value: 8, label: 'WindowsPhone' },
  { value: 9, label: 'Symbian' },
  { value: 10, label: 'Android' },
  { value: 11, label: 'Vxworks' },
  { value: 12, label: 'QNX' },
  { value: 13, label: 'Palm OS' },
  { value: 14, label: 'ARM embed OS' },
  { value: 15, label: 'FreeRTOS' },
  { value: 16, label: 'LiteOS' },
  { value: 17, label: 'AliOS Things' },
  { value: 18, label: 'MICO' },
  { value: 19, label: 'Deepin' },
  { value: 20, label: 'StartOS' },
  { value: 21, label: 'UbuntuKylin' },
  { value: 22, label: 'NeoKylin' },
  { value: 23, label: 'NewStart CGEL' },
  { value: 24, label: 'NewStart CGSL' },
  { value: 25, label: 'NewStart NSDL' },
  { value: 26, label: 'WiOS' },
  { value: 27, label: '凝思磐石' },
  { value: 28, label: 'SPGnux' },
  { value: 29, label: '中科方德' },
  { value: 30, label: 'Rtos' },
  { value: 31, label: 'μC/OS-II' },
  { value: 99, label: '其它' }
]
// 表 5 风险影响行业枚举表
export const influenceIndustryList = [
  { value: 1, label: '钢铁' },
  { value: 2, label: '有色' },
  { value: 3, label: '黄金' },
  { value: 4, label: '稀土' },
  { value: 5, label: '石化' },
  { value: 6, label: '化工' },
  { value: 7, label: '建材' },
  { value: 8, label: '机械' },
  { value: 9, label: '汽车制造' },
  { value: 10, label: '轨道交通机械制造' },
  { value: 11, label: '民用飞机' },
  { value: 12, label: '民用船舶' },
  { value: 13, label: '轻工' },
  { value: 14, label: '纺织' },
  { value: 15, label: '食品' },
  { value: 16, label: '医药' },
  { value: 17, label: '家电' },
  { value: 18, label: '电子信息产品制造' },
  { value: 19, label: '民爆' },
  { value: 20, label: '电信' },
  { value: 21, label: '其他' }
]
// 表 6 漏洞等级枚举表
export const vulLevelList = [
  { value: 1, label: '低' },
  { value: 2, label: '中低' },
  { value: 3, label: '中' },
  { value: 4, label: '中高' },
  { value: 5, label: '高' },
  { value: 6, label: '超危' }
]
// 表 7 漏洞利用类型枚举代码
export const vulAtktypeList = [
  { value: 1, label: '缓冲区溢出' },
  { value: 2, label: '信息泄露' },
  { value: 3, label: '权限许可和访问控制' },
  { value: 4, label: '竞争条件' },
  { value: 5, label: '跨站请求伪造' },
  { value: 6, label: '数字错误' },
  { value: 7, label: '资料不足' },
  { value: 8, label: '代码注入' },
  { value: 9, label: '路径遍历' },
  { value: 10, label: '输入验证' },
  { value: 11, label: '跨站脚本' },
  { value: 12, label: 'SQL 注入' },
  { value: 13, label: '拒绝服务' },
  { value: 14, label: '授权问题' },
  { value: 15, label: '加密问题' },
  { value: 16, label: '信任管理' },
  { value: 17, label: '资源管理错误' },
  { value: 18, label: '弱身份验证' },
  { value: 19, label: '访问验证错误' },
  { value: 20, label: '权限许可和访问控制' },
  { value: 21, label: '跨站脚本攻击（XSS）' },
  { value: 22, label: '文件包含' },
  { value: 23, label: '代码执行' },
  { value: 24, label: '命令执行' },
  { value: 25, label: '文件上传' },
  { value: 26, label: '任意文件操作' },
  { value: 27, label: '权限绕过' },
  { value: 28, label: '跨站请求伪造（CSRF）' },
  { value: 29, label: '配置错误' },
  { value: 30, label: '逻辑漏洞' },
  { value: 31, label: '弱口令' },
  { value: 32, label: '后门' },
  { value: 99, label: '其它' }
]
// 表 7 漏洞利用类型枚举代码
export const vulAtktypeList2 = [
  { value: '1', label: '缓冲区溢出' },
  { value: '2', label: '信息泄露' },
  { value: '3', label: '权限许可和访问控制' },
  { value: '4', label: '竞争条件' },
  { value: '5', label: '跨站请求伪造' },
  { value: '6', label: '数字错误' },
  { value: '7', label: '资料不足' },
  { value: '8', label: '代码注入' },
  { value: '9', label: '路径遍历' },
  { value: '10', label: '输入验证' },
  { value: '11', label: '跨站脚本' },
  { value: '12', label: 'SQL 注入' },
  { value: '13', label: '拒绝服务' },
  { value: '14', label: '授权问题' },
  { value: '15', label: '加密问题' },
  { value: '16', label: '信任管理' },
  { value: '17', label: '资源管理错误' },
  { value: '18', label: '弱身份验证' },
  { value: '19', label: '访问验证错误' },
  { value: '20', label: '权限许可和访问控制' },
  { value: '21', label: '跨站脚本攻击（XSS）' },
  { value: '22', label: '文件包含' },
  { value: '23', label: '代码执行' },
  { value: '24', label: '命令执行' },
  { value: '25', label: '文件上传' },
  { value: '26', label: '任意文件操作' },
  { value: '27', label: '权限绕过' },
  { value: '28', label: '跨站请求伪造（CSRF）' },
  { value: '29', label: '配置错误' },
  { value: '30', label: '逻辑漏洞' },
  { value: '31', label: '弱口令' },
  { value: '32', label: '后门' },
  { value: '99', label: '其它' }
]
// 表 8 漏洞类型枚举表
export const vulTypeList = [
  { value: 1, label: 'WEB 应用漏洞' },
  { value: 2, label: '安全产品漏洞' },
  { value: 3, label: '应用程序漏洞' },
  { value: 4, label: '操作系统漏洞' },
  { value: 5, label: '数据库漏洞' },
  { value: 6, label: '网络设备漏洞' },
  { value: 7, label: '硬件漏洞' },
  { value: 99, label: '其他' }
]
// 表 9 威胁类型枚举表
export const threattypesList = [
  { value: '1', label: 'C2节点' },
  { value: '2', label: '僵尸网络' },
  { value: '3', label: 'proxy代理' },
  { value: '4', label: 'FastFlux节点' },
  { value: '5', label: '扫描器节点' },
  { value: '6', label: '恶意软件' },
  { value: '7', label: '垃圾邮件' },
  { value: '8', label: '漏洞利用' },
  { value: '9', label: '钓鱼网址' },
  { value: '10', label: '可疑文件' },
  { value: '11', label: '记录数据' },
  { value: '12', label: '色情' },
  { value: '13', label: '赌博' },
  { value: '14', label: 'DGA域名' },
  { value: '15', label: '全球地域IP' },
  { value: '16', label: '中国移动IP' },
  { value: '17', label: 'VOIP节点' },
  { value: '18', label: 'IDC节点' },
  { value: '19', label: 'VPN节点' },
  { value: '20', label: '广告' },
  { value: '21', label: 'APT攻击' },
  { value: '22', label: '远控木马' },
  { value: '23', label: '网银大盗' },
  { value: '24', label: '僵尸主机' },
  { value: '25', label: '僵尸网络C2' },
  { value: '26', label: '爆破攻击' },
  { value: '27', label: '挖矿' },
  { value: '28', label: 'DDOS攻击' },
  { value: '29', label: '欺诈' },
  { value: '30', label: '流氓软件' },
  { value: '31', label: 'IOT攻击C2' },
  { value: '32', label: 'IOT失陷主机' },
  { value: '33', label: '宏病毒' },
  { value: '34', label: 'MAC恶意软件' },
  { value: '35', label: '恶意脚本' },
  { value: '36', label: '恶意SSL证书' },
  { value: '37', label: '恶意网站' },
  { value: '38', label: '勒索软件' },
  { value: '39', label: '主机扫描' },
  { value: '40', label: 'Sinkhole C2' },
  { value: '41', label: '网络爬虫' },
  { value: '42', label: '间谍软件' },
  { value: '43', label: '窃密木马' },
  { value: '44', label: 'Tor节点' },
  { value: '45', label: '木马回连服务器' },
  { value: '46', label: '木马下载服务器' },
  { value: '47', label: '感染型病毒' },
  { value: '48', label: 'voip攻击' },
  { value: '49', label: 'Web漏洞攻击' },
  { value: '50', label: '网络蠕虫' },
  { value: '51', label: 'Sinkhole重定向IP' },
  { value: '99', label: '其它' }
]

// 单位编号
export const sourceDeptList = [
  { value: 'FZYJZX', label: '国家工业信息安全发展研究中心' },
  { value: 'GXBWS', label: '工业与信息化部电子第五研究所' },
  { value: 'TXYJY', label: '中国信息通信研究院' },
  { value: 'RJCPZX', label: '中国软件评测中心' },
  { value: 'BZHYJY', label: '中国电子技术标准化研究院' }
]

// 表11 资产设备类型枚举表
export const assetTypeList = [
  { value: '/server', label: '/主机' },
  { value: '/server/Linux', label: '/主机/Linux' },
  { value: '/server/Windows', label: '/主机/Windows' },
  { value: '/server/AIX', label: '/主机/AIX' },
  { value: '/server/Solaris', label: '/主机/Solaris' },
  { value: '/server/HP-UX', label: '/主机/HP-UX' },
  { value: '/server/Neokylin', label: '/主机/中标麒麟' },
  { value: '/server/Meditation', label: '/主机/凝思磐石' },
  { value: '/server/waterhouse', label: '/主机/普华' },
  { value: '/server/fileSystem', label: '/主机/文件系统' },
  { value: '/network', label: '/网络设备' },
  { value: '/network/Switch', label: '/网络设备/交换机' },
  { value: '/network/WLAN ', label: '/网络设备/WLAN' },
  { value: '/network/Router', label: '/网络设备/路由器' },
  { value: '/network/LB', label: '/网络设备/负载均衡' },
  { value: '/network/Hub', label: '/网络设备/Hub' },
  { value: '/security', label: '/安全设备' },
  { value: '/security/FW', label: '/安全设备/防火墙' },
  { value: '/security/UTM', label: '/安全设备/安全防护网关' },
  { value: '/security/WAF', label: '/安全设备/Web应用安全网关' },
  { value: '/security/IDS', label: '/安全设备/入侵检测' },
  { value: '/security/IPS', label: '/安全设备/入侵防御' },
  { value: '/security/VPN', label: '/安全设备/VPN' },
  { value: '/security/Vulns', label: '/安全设备/漏洞扫描' },
  { value: '/security/CVS', label: '/安全设备/配置核查' },
  { value: '/security/MDS', label: '/安全设备/恶意代码检测' },
  { value: '/security/GAP', label: '/安全设备/网闸' },
  { value: '/security/Terminal', label: '/安全设备/终端安全管理' },
  { value: '/security/SEG', label: '/安全设备/邮件安全网关' },
  { value: '/security/Bastion', label: '/安全设备/堡垒机' },
  { value: '/security/PKI', label: '/安全设备/身份认证' },
  { value: '/security/WTP', label: '/安全设备/网页防篡改' },
  { value: '/security/Detector', label: '/安全设备/流量检测设备' },
  { value: '/security/Guard', label: '/安全设备/流量清洗设备' },
  { value: '/security/AV', label: '/安全设备/防病毒系统' },
  { value: '/security/SOC', label: '/安全设备/安全管理平台' },
  { value: '/security/NBA', label: '/安全设备/网络行为分析' },
  { value: '/security/NTA', label: '/安全设备/网络流量分析' },
  { value: '/security/SA', label: '/安全设备/安全审计' },
  { value: '/security/IBA', label: '/安全设备/上网行为审计' },
  { value: '/security/LA', label: '/安全设备/日志审计' },
  { value: '/security/DBA', label: '/安全设备/数据库审计' },
  { value: '/security/Honeypot', label: '/安全设备/蜜罐系统' },
  { value: '/security/Sandbox', label: '/安全设备/沙箱系统' },
  { value: '/security/AST', label: '/安全设备/应用安全测试' },
  { value: '/security/DLP', label: '/安全设备/数据防泄密系统' },
  { value: '/security/DM', label: '/安全设备/数据脱敏系统' },
  { value: '/virtual', label: '/虚拟化' },
  { value: '/virtual/ESXi', label: '/虚拟化/ESXi' },
  { value: '/virtual/vCenter', label: '/虚拟化/vCenter' },
  { value: '/virtual/vm', label: '/虚拟化设备/虚拟主机' },
  { value: '/virtual/Xen', label: '/虚拟化/Xen' },
  { value: '/virtual/Xenserver', label: '/虚拟化/XenServer' },
  { value: '/virtual/Hyper-V', label: '/虚拟化/Hyper-V' },
  { value: '/virtual/KVM', label: '/虚拟化/KVM' },
  { value: '/virtual/KVM/VM', label: '/虚拟化设备/KVM/VM' },
  { value: '/virtual/KVM/HOST', label: '/虚拟化设备/KVM/宿主机' },
  { value: '/virtual/FusionSphere', label: '/虚拟化/FusionSphere' },
  { value: '/virtual/CloudCell', label: '/虚拟化/CloudCell' },
  { value: '/database', label: '/数据库' },
  { value: '/database/Oracle', label: '/数据库/Oracle' },
  { value: '/database/Cassandra', label: '/数据库/Cassandra' },
  { value: '/database/Sqlserver', label: '/数据库/SQLServer' },
  { value: '/database/Mysql', label: '/数据库/MySQL' },
  { value: '/database/DB2', label: '/数据库/DB2' },
  { value: '/database/Sybase', label: '/数据库/Sybase' },
  { value: '/database/Informix', label: '/数据库/Informix' },
  { value: '/database/PostgreSQL', label: '/数据库/PostgreSQL' },
  { value: '/database/MongoDB', label: '/数据库/MongoDB' },
  { value: '/database/HBase', label: '/数据库/HBase' },
  { value: '/database/Hive', label: '/数据库/Hive' },
  { value: '/database/Dameng', label: '/数据库/武汉达梦' },
  { value: '/database/Kingbase', label: '/数据库/人大金仓' },
  { value: '/database/Shentong', label: '/数据库/神舟通用' },
  { value: '/database/Gbase', label: '/数据库/南大通用' },
  { value: '/middleware', label: '/中间件' },
  { value: '/middleware/Websphere', label: '/中间件/WebSphere' },
  { value: '/middleware/Weblogic', label: '/中间件/WebLogic' },
  { value: '/middleware/Tomcat', label: '/中间件/Tomcat' },
  { value: '/middleware/IIS', label: '/中间件/IIS' },
  { value: '/middleware/Apache', label: '/中间件/Apache' },
  { value: '/middleware/Bind', label: '/中间件/Bind' },
  { value: '/middleware/Jboss', label: '/中间件/JBoss' },
  { value: '/middleware/Tongweb', label: '/中间件/Tong Web' },
  { value: '/middleware/Domino', label: '/中间件/Domino' },
  { value: '/middleware/Resin', label: '/中间件/Resin' },
  { value: '/middleware/Nginx', label: '/中间件/Nginx' },
  { value: '/middleware/Tuxedo', label: '/中间件/Tuxedo' },
  { value: '/middleware/Webspheremq', label: '/中间件/webspheremq' },
  { value: '/middleware/Rabbitmq', label: '/中间件/RabbitMq' },
  { value: '/middleware/Activemq', label: '/中间件/ActiveMQ' },
  { value: '/middleware/Tonglinkq', label: '/中间件/TongLinkQ' },
  { value: '/storage', label: '/存储设备' },
  { value: '/storage/EMC', label: '/存储设备/EMC' },
  { value: '/storage/Netapp', label: '/存储设备/Netapp' },
  { value: '/storage/SAN', label: '/存储设备/SAN' },
  { value: '/storage/NAS', label: '/存储设备/NAS' },
  { value: '/storage/RAID', label: '/存储设备/磁盘阵列' },
  { value: '/storage/HONGSHAN', label: '/存储设备/宏杉存储' },
  { value: '/business', label: '/业务系统' },
  { value: '/appserver', label: '/应用系统' },
  { value: '/appserver/EMAIL', label: '应用系统/邮件' },
  { value: '/appserver/ADC', label: '/应用系统/应用交付系统' },
  { value: '/appserver/Webserver', label: '/应用系统/WebServer' },
  { value: '/appserver/ERP', label: '/应用系统/ERP' },
  { value: '/appserver/OA', label: '/应用系统/OA' },
  { value: '/phy', label: '/机房设备' },
  { value: '/phy/SafeGuard', label: '/机房设备/安防' },
  { value: '/phy/Power', label: '/机房设备/动力' },
  { value: '/phy/Env', label: '/机房设备/环境' },
  { value: '/gongKong', label: '/工控设备' },
  { value: '/gongKong/Hirschmann', label: '/工控设备/赫斯曼交换机' },
  { value: '/bigdata', label: '/大数据' },
  { value: '/bigdata/Spark', label: '/大数据/Spark' },
  { value: '/bigdata/Yarn', label: '/大数据/Yarn' },
  { value: '/bigdata/Hdfs', label: '/大数据/Hdfs' },
  { value: '/bigdata/Hbase', label: '/大数据/Hbase' },
  { value: '/bigdata/ES', label: '/大数据/Elasticsearch' },
  { value: '/bigdata/Hive', label: '/大数据/Hive' },
  { value: '/bigdata/Zookeeper', label: '/大数据/Zookeeper' },
  { value: '/bigdata/Storm', label: '/大数据/Storm' },
  { value: '/bigdata/Kafka', label: '/大数据/Kafka' },
  { value: '/bigdata/Flume', label: '/大数据/Flume' },
  { value: '/bigdata/Impala', label: '/大数据/Impala' },
  { value: '/bigdata/Hadoop', label: '/大数据/Hadoop' },
  { value: '/openstack', label: '/openstack' },
  { value: '/openstack/Manager', label: '/openstack/Manager' },
  { value: '/openstack/Nova', label: '/openstack/Nova' },
  { value: '/openstack/Cinder', label: '/openstack/Cinder' },
  { value: '/openstack/Keystone', label: '/openstack/Keystone' },
  { value: '/openstack/Neutron', label: '/openstack/Neutron' },
  { value: '/openstack/Dashboard', label: '/openstack/Dashboard' },
  { value: '/CNC', label: '/高档数控机床' },
  { value: '/CNC/CNCController', label: '/高档数控机床/CNC 控制器' },
  { value: '/CNC/PLCController', label: '/高档数控机床/PLC 控制器' },
  { value: '/CNC/ServoDriver', label: '/高档数控机床/伺服驱动控制器' },
  { value: '/CNC/HMIClient', label: '/高档数控机床/HMI 终端' },
  { value: '/CNC/DNCClient', label: '/高档数控机床/DNC 终端' },
  { value: '/CNC/DNCServer', label: '/高档数控机床/DNC 服务器' },
  { value: '/CNC/Other', label: '/高档数控机床/其他' },
  { value: '/UAV', label: '/无人机' },
  { value: '/UAV/PatrolInspection', label: '/无人机/工业巡检' },
  { value: '/UAV/Logistics', label: '/无人机/工业物流' },
  { value: '/UAV/HighEnd', label: '/无人机/高端消费' },
  { value: '/UAV/Counterweight', label: '/无人机/J 用无人机任务载荷' },
  { value: '/UAV/Other', label: '/无人机/其他' },
  { value: '/IC', label: '/关键基础部件/集成电路' },
  { value: '/IC/ASP', label: '/关键基础部件/集成电路/模拟信号芯片' },
  { value: '/IC/DSP', label: '/关键基础部件/集成电路/数字信号芯片' },
  { value: '/IC/MSP', label: '/关键基础部件/集成电路/混合信号芯片' },
  { value: '/IC/Other', label: '/关键基础部件/集成电路/其他' },
  { value: '/firmware', label: '/关键基础部件/关键固件' },
  { value: '/firmware/FPGA', label: '/关键基础部件/关键固件/FPGA' },
  { value: '/firmware/ROM', label: '/关键基础部件/关键固件/ROM' },
  { value: '/firmware/EPROM', label: '/关键基础部件/关键固件/EPROM' },
  { value: '/firmware/EEPROM', label: '/关键基础部件/关键固件/EEPROM' },
  { value: '/firmware/FLASH', label: '/关键基础部件/关键固件/FLASH' },
  { value: '/firmware/Other', label: '/关键基础部件/关键固件/其他' },
  { value: '/EmbeddedSystem', label: '/关键基础部件/嵌入式系统' },
  { value: '/EmbeddedSystem/VxWorks', label: '/关键基础部件/嵌入式系统/VxWorks' },
  { value: '/EmbeddedSystem/Android', label: '/关键基础部件/嵌入式系统/Android' },
  { value: '/EmbeddedSystem/Linux', label: '/关键基础部件/嵌入式系统/Linux' },
  { value: '/EmbeddedSystem/Rots', label: '/关键基础部件/嵌入式系统/Rots' },
  { value: '/EmbeddedSystem/WinCE', label: '/关键基础部件/嵌入式系统/WinCE' },
  { value: '/EmbeddedSystem/OSII', label: '/关键基础部件/嵌入式系统/μC/OS-II' },
  { value: '/EmbeddedSystem/FreeRTOS', label: '/关键基础部件/嵌入式系统/FreeRTOS' },
  { value: '/EmbeddedSystem/Other', label: '/关键基础部件/嵌入式系统/其他' },
  { value: '/PLC', label: '/关键基础部件/PLC' },
  { value: '/IndustrialNetwork/', label: '/关键基础部件/关键网络设备' },
  { value: '/IndustrialNetwork/Router', label: '/关键基础部件/关键网络设备/工业路由器' },
  { value: '/IndustrialNetwork/Switch', label: '/关键基础部件/关键网络设备/工业交换机' },
  { value: '/IndustrialNetwork/Gateway', label: '/关键基础部件/关键网络设备/工业网关' },
  { value: '/IndustrialNetwork/FW', label: '/关键基础部件/关键网络设备/工业防火墙' },
  { value: '/IndustrialNetwork/Other', label: '/关键基础部件/关键网络设备/其他' },
  { value: '/IOT', label: '/关键基础部件/物联网设备' },
  { value: '/IOT/Wifi', label: '/关键基础部件/物联网设备/WiFi 路由器' },
  { value: '/IOT/Camera', label: '/关键基础部件/物联网设备/摄像头' },
  { value: '/IOT/VideoRecorder', label: '/关键基础部件/物联网设备/硬盘录像机' },
  { value: '/IOT/STB', label: '/关键基础部件/物联网设备/机顶盒或电视盒子' },
  { value: '/IOT/Printer', label: '/关键基础部件/物联网设备/网络打印机' },
  { value: '/IOT/Sound', label: '/关键基础部件/物联网设备/智能音箱' },
  { value: '/IOT/Storage', label: '/关键基础部件/物联网设备/网络存储' },
  { value: '/IOT/Other', label: '/关键基础部件/物联网设备/其他' },
  { value: '/medical', label: '/智能医疗' },
  { value: '/medical/WearableDevice', label: '/智能医疗/智能可穿戴设备' },
  { value: '/medical/VideoEquipments', label: '/智能医疗/医学影像设备' },
  { value: '/medical/Clinical', label: '/智能医疗/临床检验设备' },
  { value: '/medical/Special', label: '/智能医疗/特种治疗设备' },
  { value: '/DCS', label: '/集散控制系统 DCS' },
  { value: '/IndustryRobot', label: '/工业机器人' },
  { value: '/IndustryRobot/AGV', label: '/工业机器人/AGV' },
  { value: '/IndustryRobot/Manipulator', label: '/工业机器人/工业机械臂' },
  { value: '/otherdev', label: '/其它设备和系统' },
  { value: '/otherdev/Printer', label: '/其它设备和系统/网络打印机' }
]
// 表 13 工业设备分类
export const equipmentTypeList = [
  { value: 1, label: '采矿设备' },
  { value: 2, label: '化工设备' },
  { value: 3, label: '冶炼设备' },
  { value: 4, label: '电力设备' },
  { value: 5, label: '建材设备' },
  { value: 6, label: '动力设备' },
  { value: 7, label: '仪器仪表' },
  { value: 8, label: '数控机床' },
  { value: 9, label: '机器人' },
  { value: 10, label: '电工、电子设备' },
  { value: 11, label: '轻工设备' },
  { value: 12, label: '工程机械' },
  { value: 13, label: '农林机械' },
  { value: 14, label: '物流设备' },
  { value: 15, label: '交通设备' },
  { value: 16, label: '智能医疗设备' },
  { value: 17, label: '无人机' },
  { value: 18, label: '网络设备' },
  { value: 19, label: '嵌入式系统' },
  { value: 20, label: '关键固件' },
  { value: 21, label: '集成电路' },
  { value: 22, label: 'DCS' },
  { value: 23, label: '其他' }
]
// 表 16 平台应用领域
export const applicationAreaList = [
  { value: 1, label: '装备制造' },
  { value: 2, label: '航空航天' },
  { value: 3, label: '石油化工' },
  { value: 4, label: '电力能源' },
  { value: 5, label: '轨道交通' },
  { value: 6, label: '汽车制造' },
  { value: 7, label: '冶金材料' },
  { value: 8, label: '智慧城市' },
  { value: 9, label: '信息电子' },
  { value: 10, label: '工控安全' },
  { value: 99, label: '其他' }
]
// 表 19 恶意代码类型枚举表
export const malwareTypeList = [
  {
    value: '0201',
    label: '计算机恶意程序',
    children: [
      { value: '020101', label: '僵尸网络' },
      { value: '020102', label: '木马程序' },
      { value: '020103', label: '蠕虫病毒' },
      { value: '020199', label: '其他' }
    ]
  },
  {
    value: '0202',
    label: '移动恶意程序',
    children: [
      { value: '020201', label: '恶意扣费' },
      { value: '020202', label: '信息窃取' },
      { value: '020203', label: '远程控制' },
      { value: '020204', label: '恶意传播' },
      { value: '020205', label: '资源消耗' },
      { value: '020206', label: '系统破坏' },
      { value: '020207', label: '诱骗欺诈' },
      { value: '020208', label: '流氓行为' },
      { value: '020299', label: '其他' }
    ]
  },
  {
    value: '0203',
    label: '工程恶意程序',
    children: [
      { value: '020301', label: '篡改组态' },
      { value: '020302', label: '伪造控制指令' },
      { value: '020303', label: '实时欺骗' },
      { value: '020304', label: '获取超级权限' },
      { value: '020305', label: '拒绝服务' },
      { value: '020306', label: '信息窃取' },
      { value: '020307', label: '恶意传播' },
      { value: '020308', label: '系统破坏' },
      { value: '020309', label: '勒索病毒' },
      { value: '020399', label: '其他' }
    ]
  },
  {
    value: '0204',
    label: '物联网恶意程序',
    children: [
      { value: '020401', label: '拒绝服务' },
      { value: '020402', label: '信息窃取' },
      { value: '020403', label: '远程控制' },
      { value: '020404', label: '恶意传播' },
      { value: '020499', label: '其他' }
    ]
  },
  {
    value: '0205',
    label: '其他恶意程序',
    children: [{ value: '020501', label: '其他' }]
  }
]
// 表 20 动态类型枚举表
export const infoTypeList = [
  { value: '1', label: '政策研究' },
  { value: '2', label: '技术发展' },
  { value: '3', label: '安全事件' },
  { value: '4', label: '漏洞披露' },
  { value: '5', label: '产业信息' },
  { value: '6', label: '安全风险' },
  { value: '7', label: '安全研究' },
  { value: '8', label: '重大报告' }
]
// 表 21 利用工具类型枚举表
export const toolTypeList = [
  { value: '1', label: '敏感信息收集工具/内网嗅探工具' },
  { value: '2', label: '开源漏洞利用工具（如 Metasploit）' },
  { value: '3', label: '情报收集工具' },
  { value: '4', label: '漏洞扫描器' },
  { value: '5', label: '流量分析工具' },
  { value: '6', label: '暴力破解工具' },
  { value: '7', label: '渗透后利用工具' },
  { value: '8', label: 'WEB渗透工具' },
  { value: '9', label: 'ICS渗透工具' },
  { value: '10', label: '代理转发工具' },
  { value: '99', label: '其他' }
]
// 表 23 系统/行业枚举表
export const sourceDevList = [
  { value: 'DCS', label: '集散控制系统 DCS' },
  { value: 'SKJC', label: '高档数控机床' },
  { value: 'JQR', label: '工业机器人' },
  { value: 'JCBJ', label: '关键基础部件' },
  { value: 'WRJ', label: '无人机' },
  { value: 'ZNYL', label: '智能医疗' },
  { value: 'OTHER', label: '其他' }
]
export const statusList = [
  { value: 0, label: '未上报' },
  { value: 1, label: '新增' },
  { value: 2, label: '更新' },
  { value: 3, label: '删除' }
]
export const assetStatusList = [
  { value: 0, label: '不在线' },
  { value: 1, label: '在线' }
]
export const productPartList = [
  { value: 'a', label: '应用程序' },
  { value: 'h', label: '硬件平台' },
  { value: 'o', label: '操作系统' }
]
export const patchStatusList = [
  { value: 1, label: '已解决' },
  { value: 2, label: '未解决' }
]
export const riskCategoryList = [
  { value: '数据泄露', label: '数据泄露' },
  { value: '数据篡改', label: '数据篡改' },
  { value: '数据滥用', label: '数据滥用' },
  { value: '违规传输', label: '违规传输' },
  { value: '非法访问', label: '非法访问' },
  { value: '流量异常', label: '流量异常' },
  { value: '其他', label: '其他' }
]
export const riskLevelList = [
  { value: 0, label: '高' },
  { value: 1, label: '中' },
  { value: 2, label: '低' }
]
export const riskTypeList = [
  { value: 0, label: '通用型' },
  { value: 1, label: '事件型' }
]
export const riskStatusList = [
  { value: 0, label: '发现风险' },
  { value: 1, label: '处理中' },
  { value: 2, label: '已处置' }
]
export const isEnabledList = [
  { value: '0', label: '不存活' },
  { value: '1', label: '存活' }
]
export default {
  vulLevelList,
  vulAtktypeList,
  vulAtktypeList2,
  vulTypeList,
  sourceDeptList,
  assetTypeList,
  statusList,
  applicationAreaList,
  sourceDevList,
  equipmentTypeList,
  systemTypeList,
  assetStatusList,
  productPartList,
  patchStatusList,
  toolTypeList,
  riskCategoryList,
  riskLevelList,
  riskTypeList,
  riskStatusList,
  influenceIndustryList,
  threattypesList,
  isEnabledList,
  malwareTypeList,
  infoTypeList
}
