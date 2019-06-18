/*
 * JavaScript Utils
 * @Author: xiaoming.bai
 * @Date: 2019-06-15 13:21:52
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-06-15 13:24:35
 */

/**
 * 时间日期格式化
 */
export const formatDate = time => {
  if (!time) return ''

  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return str
}
