import i18n from '../i18n'

/**
 * @return {string}
 */

export default function SuccessErrorCodes(code) {
  let message = code.split(':').pop()
  if (message.includes('ERR_SIZE_RANGE')) {
    let temp = message.split('_')
    let max = temp.pop()
    let min = temp.pop()
    return i18n.t('message:ERR_SIZE_RANGE').replace('{1}', min).replace('{2}', max)
  }

  if (message.includes('ERR_STRING_MAX')) {
    let temp = message.split('_')
    let max = temp.pop()
    return i18n.t('message:ERR_STRING_MAX').replace('{1}', max)
  }

  if (message.includes('ERR_STRING_MIN')) {
    let temp = message.split('_')
    let min = temp.pop()
    return i18n.t('message:ERR_STRING_MIN').replace('{1}', min)
  }

  return i18n.t('message:' + message)
}
