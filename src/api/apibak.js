import gRequest from '@/utils/gRequest'

// ==================Auth===================
// getCurrent
// requestSmsCodeForReset
// resetPassword
// signin
// signout
export function Auth(type, params) {
  return gRequest({
    url: '/Auth.' + type,
    method: 'post',
    data: params
  })
}

// ==================FundTransferRequest========
// approveRequest
// find
// get
// panelFind
// rejectRequest
export function FundTransferRequest(type, params) {
  return gRequest({
    url: '/FundTransferRequest.' + type,
    method: 'post',
    data: params
  })
}

// ==================Order===================
// find
// get
// panelFind
export function Order(type, params) {
  return gRequest({
    url: '/Order.' + type,
    method: 'post',
    data: params
  })
}

// ==================OrderReport===================
// create
// find
// get
export function OrderReport(type, params) {
  return gRequest({
    url: '/OrderReport.' + type,
    method: 'post',
    data: params
  })
}
// ==================PageBlock===================
// create
// remove
// update
// PageLayout
export function PageBlock(type, params) {
  return gRequest({
    url: '/PageBlock.' + type,
    method: 'post',
    data: params
  })
}
// ==================PageLayout===================
// create
// find
// get
// remove
// update
export function PageLayout(type, params) {
  return gRequest({
    url: '/PageLayout.' + type,
    method: 'post',
    data: params
  })
}

// ==================Product===================
// find
// get
export function Product(type, params) {
  return gRequest({
    url: '/Product.' + type,
    method: 'post',
    data: params
  })
}
// ==================Store===================
// find
// get
// panelFind
// searchByName
// update
export function Store(type, params) {
  return gRequest({
    url: '/Store.' + type,
    method: 'post',
    data: params
  })
}
// ==================StoreMedia===================
// find
// get
export function StoreMedia(type, params) {
  return gRequest({
    url: '/StoreMedia.' + type,
    method: 'post',
    data: params
  })
}

// ==================SystemAnnouncement=============
// create
// find
// get
// remove
// update
export function SystemAnnouncement(type, params) {
  return gRequest({
    url: '/SystemAnnouncement.' + type,
    method: 'post',
    data: params
  })
}

// ==================Transaction===================
// find
// findByOrder
// get
export function Transaction(type, params) {
  return gRequest({
    url: '/Transaction.' + type,
    method: 'post',
    data: params
  })
}

// ==================TransferFund===================
// calculate
// transfer
export function TransferFund(type, params) {
  return gRequest({
    url: '/TransferFund.' + type,
    method: 'post',
    data: params
  })
}

// ==================User===================
// changeAvatar
// find
// get
// resetPassword
// searchByName
export function User(type, params) {
  return gRequest({
    url: '/User.' + type,
    method: 'post',
    data: params
  })
}
