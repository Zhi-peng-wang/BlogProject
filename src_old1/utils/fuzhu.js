// import Fly from "flyio/dist/npm/wx";
import fly from '../utils/fly'

/** 
 *  
 * 小程序扫描支付收款
 *
**/
export function getMemberScanPay (data) {
  return new Promise((resolve, reject) => {
      fly.post('/merchant/memberScanPay', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** memberScanPay
 *  
 *@params code
 *@params vcode
 *@params mobile
 *@params merchantno
 *
**/

export function getMemberItemPay (data) {
  return new Promise((resolve, reject) => {
      fly.post('/merchant/memberItemPay', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 小程序现金支付收款
 *  
 *@params type
 *@params mobile
 *
**/

export function getMemberCashPay (data) {
  return new Promise((resolve, reject) => {
      fly.post('/merchant/memberCashPay', data.params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 小程序会员卡支付收款
 *  
 *@params memberId
 *@params cardNumber
 *@params totalMoney
 *@params receivableMoney
 *@params merchantEmployeeId
 *@params sellCouponUserIds
 *@params sellCouponIds
 *@params terminalDescribe
 *@params terminalNo
**/

export function getMemberCardPay (data) {
  return new Promise((resolve, reject) => {
      fly.post('/merchant/memberCardPay', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 小程序获取商户支付业务（其他支付）
 *  
 *@params type
 *@params mobile
 *
**/

export function getPayItems (data) {
  return new Promise((resolve, reject) => {
      fly.get('/merchant/getPayItems', data.params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 小程序获取会员优惠券列表
 *  
 *@params  userId
 *@params useAmount 
 *
**/

export function getMemberCoupon (data) {
  return new Promise((resolve, reject) => {
      fly.get('/merchant/memberCoupon', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 小程序获取会员xinxi
 *  
 *@params type
 *@params mobile
 *
**/

export function getMemberCard (data) {
  return new Promise((resolve, reject) => {
      fly.get('/merchant/memberCard', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 收款分析
 *  
 *@params type
 *@params mobile
 *
**/

export function getTodayPayData (data) {
  return new Promise((resolve, reject) => {
      fly.get('/merchant/getTodayPayData', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/** 交易查询
 *  
 *@params type
 *@params mobile
 *
**/

export function getTradeRecord (data) {
  return new Promise((resolve, reject) => {
      fly.get('/merchant/getTradeRecord', data.params)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}