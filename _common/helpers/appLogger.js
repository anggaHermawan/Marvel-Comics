// Credits: borrowed code from fcomb/redux-logger

import { deepCopy } from './util'

export function appLogger (subject, object) {
  const isDebug = process.env.NODE_ENV !== 'production'
  if (typeof console === 'undefined' || isDebug === false) {
    return
  }
  const collapsed = true
  let objDesc = ''
  if (object != null) {
    objDesc = deepCopy(object)
  }
  const time = new Date()
  const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`
  const message = `Log${formattedTime} @ ${subject}`
  const startMessage = collapsed
    ? console.groupCollapsed
    : console.group
  // render
  try {
    startMessage.call(console, message)
  } catch (e) {
    console.log(message)
  }
  console.log('%c object', 'color: #9E9E9E; font-weight: bold', objDesc)
  try {
    console.groupEnd()
  } catch (e) {
    console.log('—— log end ——')
  }
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}
