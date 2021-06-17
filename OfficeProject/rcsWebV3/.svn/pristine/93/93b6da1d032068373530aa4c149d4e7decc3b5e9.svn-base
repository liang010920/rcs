import {axios} from '../main'
import '../plugins/jquery.form.js'
import '../plugins/jqueryTool'
import {adminServer as basePath} from '../config/config';

/** 图片上传的url地址 **/
let config = {
    headers:{'Content-Type':'multipart/form-data'}
};
/**文件上传**/
export const uploadFile = params => { return axios.post(`${basePath}file/uploadFile`, params).then(res => res.data); };
// export const getStsToken = params => { return axios.post(`${basePath}common/getStsToken`, params).then(res => res.data); };

/**获取图形验证码**/
export const getAuthCodeImg = params => { return axios.get(`${basePath}captcha/getAuthCodeImg`, params).then(res => res.data); };

/**用户管理**/
//export const loginByUserName = params => { return axios.post(`${basePath}user/loginByUserName`, params).then(res => res.data); };
/**平台用户登录**/
export const adminLoginByUserName = params => { return axios.post(`${basePath}user/admin/loginByUserName`, params).then(res => res.data); };
/**企业用户登录**/
export const customerLoginByUserName = params => { return axios.post(`${basePath}user/customer/loginByUserName`, params).then(res => res.data); };
/**修改密码**/
export const modPassword = params => { return axios.post(`${basePath}user/modPassword`, params).then(res => res.data); };
/**安全配置导致密码修改**/
export const modPasswordSecurity = params => { return axios.post(`${basePath}user/modPasswordSecurity`, params).then(res => res.data); };
/**用户注销退出**/
export const logout = params => { return axios.post(`${basePath}user/logout`, params).then(res => res.data); };
/* 获取当前企业客户或者平台下的所有用户 */
export const getUserList = params => { return axios.post(`${basePath}user/getUserList`, params).then(res => res.data); };
/**删除用户 */
export const delUser = params => { return axios.post(`${basePath}user/delUser`, params).then(res => res.data); };
/**修改用户 */
export const modUser = params => { return axios.post(`${basePath}user/modUser`, params).then(res => res.data); };
// export const getOneUser = params => { return axios.post(`${basePath}user/getOneUser`, params).then(res => res.data); };
/* 用户新增 */
export const addUser = params => { return axios.post(`${basePath}user/addUser`, params).then(res => res.data); };
/* 用户新增分组 */
export const getUserGroupList = params => { return axios.post(`${basePath}user/getUserGroupList`, params).then(res => res.data); };
/* 用户新增分组 */
export const saveUserGroup = params => { return axios.post(`${basePath}user/saveUserGroup`, params).then(res => res.data); };
/* 用户删除分组 */
export const delUserGroup = params => { return axios.post(`${basePath}user/delUserGroup`, params).then(res => res.data); };
/* 新增用户分组 */
// export const addUserGroup = params => { return axios.post(`${basePath}user/addUserGroup`, params).then(res => res.data); };
/* 删除用户分组 */
// export const delUserGroup = params => { return axios.post(`${basePath}user/delUserGroup`, params).then(res => res.data); };
/* 获取用户分组列表 */
// export const getUserGroupList = params => { return axios.post(`${basePath}user/getUserGroupList`, params).then(res => res.data); };

/* 角色管理 */
/* 获取角色列表 */
export const getRoleList = params => { return axios.post(`${basePath}role/getRoleList`, params).then(res => res.data); };
/* 增加橘色 */
export const addRole = params => { return axios.post(`${basePath}role/addRole`, params).then(res => res.data); };
/* 删除角色 */
export const delRole = params => { return axios.post(`${basePath}role/delRole`, params).then(res => res.data); };
/* 修改角色 */
export const modRole = params => { return axios.post(`${basePath}role/modRole`, params).then(res => res.data); };

/* 日志管理 */
/* 分页获取日志信息 */
export const getPageLogs = params => { return axios.post(`${basePath}log/getPageLogs`, params).then(res => res.data); };
export const delPageLogs = params => { return axios.post(`${basePath}log/deleteLog`, params).then(res => res.data); };

/* 系统配置 */
/* 分页获取系统配置列表 */
export const getPageSysCfg = params => { return axios.post(`${basePath}cfg/getPageSysCfg`, params).then(res => res.data); };
/* 修改系统配置 */
export const modSysCfg = params => { return axios.post(`${basePath}cfg/modSysCfg`, params).then(res => res.data); };

/* 桌面管理 */
/* 获取某个customer的桌面配置 */
export const getDesktop = params => { return axios.post(`${basePath}desktop/getDesktop`, params).then(res => res.data); };
/* 修改某个customer的桌面配置 */
export const modDesktop = params => { return axios.post(`${basePath}desktop/modDesktop`, params).then(res => res.data); };

/* 敏感词组管理 */
/* 获取敏感词组列表 */
export const getSensitiveWordsList = params => { return axios.post(`${basePath}sensitiveWords/getSensitiveWordsList`, params).then(res => res.data); };
/* 增加敏感词 */
export const addSensitiveWords = params => { return axios.post(`${basePath}sensitiveWords/addSensitiveWords`, params).then(res => res.data); };
/* 修改敏感词 */
export const modSensitiveWords = params => { return axios.post(`${basePath}sensitiveWords/modSensitiveWords`, params).then(res => res.data); };
/* 删除敏感词 */
export const delSensitiveWords = params => { return axios.post(`${basePath}sensitiveWords/delSensitiveWords`, params).then(res => res.data); };

/* 黑白名单管理 */
/* 获取黑白名单列表 */
export const getBlackWhiteList = params => { return axios.post(`${basePath}blackWhite/getBlackWhiteList`, params).then(res => res.data); };
/* 增加黑白名单 */
export const addBlackWhite = params => { return axios.post(`${basePath}blackWhite/addBlackWhite`, params).then(res => res.data); };
/* 修改黑白名单 */
export const modBlackWhite = params => { return axios.post(`${basePath}blackWhite/modBlackWhite`, params).then(res => res.data); };
/* 删除黑白名单 */
export const delBlackWhite = params => { return axios.post(`${basePath}blackWhite/delBlackWhite`, params).then(res => res.data); };
/*获取某个客户下生效的黑白名单，合并，去重操作*/
export const getValidBlackWhiteList = params => { return axios.post(`${basePath}blackWhite/getValidBlackWhiteList`, params).then(res => res.data); };

/* 客户管理 */
/* 增加客户 */
export const addCustomer = params => { return axios.post(`${basePath}customer/addCustomer`, params).then(res => res.data); };
/* 修改客户信息 */
export const modCustomer = params => { return axios.post(`${basePath}customer/modCustomer`, params).then(res => res.data); };
/* 删除客户 */
export const delCustomer = params => { return axios.post(`${basePath}customer/delCustomer`, params).then(res => res.data); };
/* 修改客户运行状态 */
export const modCustomerState = params => { return axios.post(`${basePath}customer/modCustomerState`, params).then(res => res.data); };
/* 获取客户信息 */
export const getCustomer = params => { return axios.post(`${basePath}customer/getCustomer`, params).then(res => res.data); };
/* 获取客户列表 */
export const getCustomerList = params => { return axios.post(`${basePath}customer/getCustomerList`, params).then(res => res.data); };
/* 增加客户分组 */
export const addCustomerGroup = params => { return axios.post(`${basePath}customer/addCustomerGroup`, params).then(res => res.data); };
/* 删除客户分组 */
export const delCustomerGroup = params => { return axios.post(`${basePath}customer/delCustomerGroup`, params).then(res => res.data); };
/* 修改客户分组 */
export const modCustomerGroup = params => { return axios.post(`${basePath}customer/modCustomerGroup`, params).then(res => res.data); };
/* 查询客户分组 */
export const getGroupList = params => { return axios.post(`${basePath}customer/getGroupList`, params).then(res => res.data); };
/* 登录代码 */
export const getOnlyOne = params => { return axios.post(`${basePath}customer/getOnlyOne`, params).then(res => res.data); };
/* 重置客户密码 */
export const customerModPassword = params => { return axios.post(`${basePath}customer/modPassword`, params).then(res => res.data); };

/* RCS通道管理机器人配置管理 */
/* 增加通道 */
export const addPassway = params => { return axios.post(`${basePath}rcsPassageway/addPassway`, params).then(res => res.data); };
/* 修改通道 */
export const modPassway = params => { return axios.post(`${basePath}rcsPassageway/modPassway`, params).then(res => res.data); };
/* 添加固定菜单 */
export const modPasswayMenu = params => { return axios.post(`${basePath}rcsPassageway/modPasswayMenu`, params).then(res => res.data); };
/* 获取固定菜单 */
export const getPasswayMenu = params => { return axios.post(`${basePath}rcsPassageway/getPasswayMenu`, params).then(res => res.data); };
/* 删除通道 */
export const delPassway = params => { return axios.post(`${basePath}rcsPassageway/delPassway`, params).then(res => res.data); };
/* 获取通道信息 */
export const getPassway = params => { return axios.post(`${basePath}rcsPassageway/getPassway`, params).then(res => res.data); };
/* 获取通道列表 */
export const getPasswayList = params => { return axios.post(`${basePath}rcsPassageway/getPasswayList`, params).then(res => res.data); };
/* 获取通道类型 */
export const getChotbotType = params => { return axios.post(`${basePath}rcsPassageway/getChotbotType`, params).then(res => res.data); };

/* 通讯录管理 */
/* 根据父编码查询群组列表信息 */
export const getGroupListByParent = params => { return axios.post(`${basePath}contact/getGroupListByParent`, params).then(res => res.data); };
/* 保存群组 */
export const saveGroup = params => { return axios.post(`${basePath}contact/saveGroup`, params).then(res => res.data); };
/* 删除群组 */
export const delGroup = params => { return axios.post(`${basePath}contact/delGroup`, params).then(res => res.data); };
/* 查询群组对应联系人列表信息 */
export const getContactPhoneList = params => { return axios.post(`${basePath}contact/getContactPhoneList`, params).then(res => res.data); };
/* 删除联系人 */
export const delContactPhone = params => { return axios.post(`${basePath}contact/delContactPhone`, params).then(res => res.data); };
/* 保存联系人 */
export const saveContactPhone = params => { return axios.post(`${basePath}contact/saveContactPhone`, params).then(res => res.data); };
/* 修改联系人 */
export const updateContactPhone = params => { return axios.post(`${basePath}contact/updateContactPhone`, params).then(res => res.data); };
/* 获取通讯录动态属性 */
export const getDynamicProperty = params => { return axios.post(`${basePath}contact/getDynamicProperty`, params).then(res => res.data); };
/* 保存通讯录动态属性 */
export const saveDynamicProperty = params => { return axios.post(`${basePath}contact/saveDynamicProperty`, params).then(res => res.data); };
/* 置顶联系人排序 */
export const sortTop = params => { return axios.post(`${basePath}contact/sortTop`, params).then(res => res.data); };

/*路由配置*/
/*获取路由配置列表*/
export const getRouteCfgList = params => { return axios.post(`${basePath}rcsRouteCfg/getRouteCfgList`, params).then(res => res.data); };
/*保存路由配置*/
export const saveRouteCfg = params => { return axios.post(`${basePath}rcsRouteCfg/saveRouteCfg`, params).then(res => res.data); };
/*删除路由配置*/
export const delRouteCfg = params => { return axios.post(`${basePath}rcsRouteCfg/delRouteCfg`, params).then(res => res.data); };
/*获取单个路由配置*/
export const getOneRouteCfg = params => { return axios.post(`${basePath}rcsRouteCfg/getOneRouteCfg`, params).then(res => res.data); };

/** 信息管理 **/
/*消息推送*/
export const pushMsg = params => { return axios.post(`${basePath}rcsOutbox/pushMsg`, params).then(res => res.data); };
/*重新发起消息推送*/
export const rePushMsg = params => { return axios.post(`${basePath}rcsOutbox/rePushMsg`, params).then(res => res.data); };
/*获取推送记录列表信息*/
export const getPushList = params => { return axios.post(`${basePath}rcsOutbox/getPushList`, params).then(res => res.data); };
/*删除推送任务*/
export const delPushTask = params => { return axios.post(`${basePath}rcsOutbox/delPushTask`, params).then(res => res.data); };
/*获取推送详情*/
export const getRcsRecordList = params => { return axios.post(`${basePath}rcsOutbox/getRcsRecordList`, params).then(res => res.data); };
/*获取推送详情记录列表*/
export const getRcsPushDetail = params => { return axios.post(`${basePath}rcsOutbox/getRcsPushDetail`, params).then(res => res.data); };


/** 资源管理 **/
/*获取资源列表*/
export const getResourceList = params => { return axios.post(`${basePath}resource/getResourceList`, params).then(res => res.data); };
/*获得资源详情*/
export const getOneResource = params => { return axios.post(`${basePath}resource/getOneResource`, params).then(res => res.data); };
/*新增或编辑资源*/
export const saveResource = params => { return axios.post(`${basePath}resource/saveResource`, params).then(res => res.data); };
/*删除资源*/
export const delResource = params => { return axios.post(`${basePath}resource/delResource`, params).then(res => res.data); };
/*获取资源分组列表*/
export const getResourceCatalogList = params => { return axios.post(`${basePath}resource/getResourceCatalogList`, params).then(res => res.data); };
/*新增或编辑分组*/
export const saveResourceCatalog = params => { return axios.post(`${basePath}resource/saveResourceCatalog`, params).then(res => res.data); };
/*删除分组*/
export const delResourceCatalog = params => { return axios.post(`${basePath}resource/delResourceCatalog`, params).then(res => res.data); };
/*对资源发起审核*/
export const sendVerifyResource = params => { return axios.post(`${basePath}resource/sendVerifyResource`, params).then(res => res.data); };


/** 模版管理 **/
/*保存模版*/
export const saveTemplate = params => { return axios.post(`${basePath}template/saveTemplate`, params).then(res => res.data); };
/*查询模版列表*/
export const getTemplateList = params => { return axios.post(`${basePath}template/getTemplateList`, params).then(res => res.data); };
/*获得模版详情*/
export const getOneTemplate = params => { return axios.post(`${basePath}template/getOneTemplate`, params).then(res => res.data); };
/*获得模版分组*/
export const getTemplateCatalogList = params => { return axios.post(`${basePath}template/getTemplateCatalogList`, params).then(res => res.data); };
/*删除模版分组*/
export const delTemplateCatalog = params => { return axios.post(`${basePath}template/delTemplateCatalog`, params).then(res => res.data); };
/*新增模版分组*/
export const saveTemplateCatalog = params => { return axios.post(`${basePath}template/saveTemplateCatalog`, params).then(res => res.data); };
/*删除媒体*/
export const delTemplate = params => { return axios.post(`${basePath}template/delTemplate`, params).then(res => res.data); };

/**收件箱**/
export const msgBillList = params => { return axios.post(`${basePath}rcsBill/list`, params).then(res => res.data); };
/**分组话单**/
export const pageGroupRcsBill = params => { return axios.post(`${basePath}rcsInbox/pageGroupRcsBill`, params).then(res => res.data); };
/**电话号码查询分组话单**/
export const getListByMobile = params => { return axios.post(`${basePath}rcsInbox/getListByMobile`, params).then(res => res.data); };

export const getUplinkMsgList = params => { return axios.post(`${basePath}rcsInbox/getUplinkMsgList`, params).then(res => res.data); };
export const getOneUplinkMsg = params => { return axios.post(`${basePath}rcsInfoMgr/getOneUplinkMsg`, params).then(res => res.data); };
export const replyUplinkMsg = params => { return axios.post(`${basePath}rcsInfoMgr/replyUplinkMsg`, params).then(res => res.data); };
export const delUplinkMsg = params => { return axios.post(`${basePath}rcsInfoMgr/delUplinkMsg`, params).then(res => res.data); };

export const getChatbotList = params => { return axios.post(`${basePath}rcsApplication/getChatbotList`, params).then(res => res.data); };
export const saveChatbotInfo = params => { return axios.post(`${basePath}rcsApplication/saveChatbotInfo`, params).then(res => res.data); };
export const getOneChatbot = params => { return axios.post(`${basePath}rcsApplication/getOneChatbot`, params).then(res => res.data); };
export const checkChatbot = params => { return axios.post(`${basePath}rcsApplication/checkChatbot`, params).then(res => res.data); };
export const delChatbot = params => { return axios.post(`${basePath}rcsApplication/delChatbot`, params).then(res => res.data); };
export const updateStatusChatbot = params => { return axios.post(`${basePath}rcsApplication/updateRunStatus`, params).then(res => res.data); };

export const getGatewayList = params => { return axios.post(`${basePath}rcsPassageway/getGatewayList`, params).then(res => res.data); };
/*查询内部应用列表*/
export const getChatbotBaseList = params => { return axios.post(`${basePath}rcsApplication/getChatbotBaseList`, params).then(res => res.data); };

/** 数据分析 **/
export const getMessageQueryStatistics = params => { return axios.post(`${basePath}analysis/getMessageQueryStatistics`, params).then(res => res.data); };


/** 分组列表 **/
export const getGroupListAdditionCount = params => { return axios.post(`${basePath}sysGroup/getGroupListAdditionCount`, params).then(res => res.data); };
/** 分组全部数量 **/
export const getGroupItemCount = params => { return axios.post(`${basePath}sysGroup/getGroupItemCount`, params).then(res => res.data); };
/** 新增分组 **/
export const addGroup = params => { return axios.post(`${basePath}sysGroup/addGroup`, params).then(res => res.data); };
/** 编辑分组 **/
export const editGroup = params => { return axios.post(`${basePath}sysGroup/editGroup`, params).then(res => res.data); };
/** 删除分组 **/
export const deleteGroup = params => { return axios.post(`${basePath}sysGroup/delGroup`, params).then(res => res.data); };


/** 资源审批列表 **/
export const getResourceCheckList = params => { return axios.post(`${basePath}commResourceCheck/getResourceCheckList`, params).then(res => res.data); };
/** 新增资源审批列表 **/
export const chooseResourceCheckList = params => { return axios.post(`${basePath}commResourceCheck/chooseResourceCheckList`, params).then(res => res.data); };
/** 新增资源审批 **/
export const addResourceCheck = params => { return axios.post(`${basePath}commResourceCheck/addResourceCheck`, params).then(res => res.data); };
/** 删除资源审批 **/
export const delResourceCheck = params => { return axios.post(`${basePath}commResourceCheck/delResourceCheck`, params).then(res => res.data); };
/** 模板资源列表 **/
export const getResourceCheckListForTemplate = params => { return axios.post(`${basePath}commResourceCheck/getResourceCheckListForTemplate`, params).then(res => res.data); };

/* 获取扩展信息数据 */
export const getPasswayExp = params => { return axios.post(`${basePath}rcsPassageway/getPasswayExp`, params).then(res => res.data); };
/* 新增扩展信息数据 */
export const modPasswayExp = params => { return axios.post(`${basePath}rcsPassageway/modPasswayExp`, params).then(res => res.data); };

/* mms模板列表 */
export const getMmsTemplateList = params => { return axios.post(`${basePath}mmsTemplate/getMmsTemplateList`, params).then(res => res.data); };
/* mms任务管理列表 */
export const getMmsSendTaskList = params => { return axios.post(`${basePath}mmsSendTask/getMmsSendTaskList`, params).then(res => res.data); };

//运营管理
//非直签客户信息列表
export const getNonSignCustList = params => { return axios.post(`${basePath}opmgrNonSignCust/getNonSignCustList`, params).then(res => res.data); };
//添加非直签客户信息
export const addNonSignCust = params => { return axios.post(`${basePath}opmgrNonSignCust/addNonSignCust`, params).then(res => res.data); };
//获取非直签客户信息状态列表
export const getCustStatusList = params => { return axios.post(`${basePath}opmgrNonSignCust/getCustStatusList`, params).then(res => res.data); };

//获取chatbot列表
export const operateGetChatbotList = params => { return axios.post(`${basePath}opmgrChatbot/getChatbotList`, params).then(res => res.data); };
//新增chatbot列表
export const addChatbot = params => { return axios.post(`${basePath}opmgrChatbot/addChatbot`, params).then(res => res.data); };
//注销chatbot
export const cancelChatbot = params => { return axios.post(`${basePath}opmgrChatbot/cancelChatbot`, params).then(res => res.data); };
//获取非直签客户信息状态列表
export const getChatbotStatusList = params => { return axios.post(`${basePath}opmgrChatbot/getChatbotStatusList`, params).then(res => res.data); };
//获取非直签客户信息行业列表
export const getChatbotIndustryList = params => { return axios.post(`${basePath}opmgrChatbot/getChatbotIndustryList`, params).then(res => res.data); };
//上架chatbot
export const putChatbot = params => { return axios.post(`${basePath}opmgrChatbot/putChatbot`, params).then(res => res.data); };
//提交chatbot白名单
export const resubmitChatbotWhite = params => { return axios.post(`${basePath}opmgrChatbot/resubmitChatbotWhite`, params).then(res => res.data); };
//获取chatbot信息，菜单
export const getChatbot = params => { return axios.post(`${basePath}opmgrChatbot/getChatbot`, params).then(res => res.data); };
//设置（保存）chatbot固定菜单
export const setChatbotMenu = params => { return axios.post(`${basePath}opmgrChatbot/setChatbotMenu`, params).then(res => res.data); };
//变更chatbot状态
export const setChatbotStatus = params => { return axios.post(`${basePath}opmgrChatbot/setChatbotStatus`, params).then(res => res.data); };

//获取非直签客户审核信息列表
export const getCustCheckInfoList = params => { return axios.post(`${basePath}opmgrCustCheckInfo/getCustCheckInfoList`, params).then(res => res.data); };
//获取Chatbot审核信息列表
export const getChatbotCheckInfoList = params => { return axios.post(`${basePath}opmgrChatbotCheckInfo/getChatbotCheckInfoList`, params).then(res => res.data); };

//获取非直签客户服务代码列表
export const getServiceCodeList = params => { return axios.post(`${basePath}opmgrCustServiceCode/getServiceCodeList`, params).then(res => res.data); };
//添加代理商分配服务代码
export const addServiceCode = params => { return axios.post(`${basePath}opmgrCustServiceCode/addServiceCode`, params).then(res => res.data); };
//回收非直签客户服务代码
export const cancelServiceCode = params => { return axios.post(`${basePath}opmgrCustServiceCode/cancelServiceCode`, params).then(res => res.data); };

//获取订购信息列表opmgrOrder/getCspList
export const getOrderList = params => { return axios.post(`${basePath}opmgrOrder/getOrderList`, params).then(res => res.data); };
//获取Csp分组列表
export const getCspList = params => { return axios.post(`${basePath}opmgrOrder/getCspList`, params).then(res => res.data); };
//获取地市列表
export const getAreaCityList = params => { return axios.post(`${basePath}opmgrAreaCity/getAreaCityList`, params).then(res => res.data); };
//获取行业列表
export const getIndustryList = params => { return axios.post(`${basePath}opmgrIndustry/getIndustryList`, params).then(res => res.data); };

