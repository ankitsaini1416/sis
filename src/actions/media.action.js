import { API } from '../api/api'
import { post } from '../api/httpClient'
import { MESSAGE_SEVERITIES } from '../helpers/constants'
import { messageAction } from './app.action'

export const uploadMediaCall =
  (relativeUrl, file, successCallback, failureCallback) => async (dispatch) => {
    const mediaUrl = `${API.MEDIA}default/files/-/${relativeUrl}`
    let fd = new FormData()
    fd.append('file', file)
    try {
      const { data } = await post(mediaUrl, fd)
      if (typeof successCallback === 'function') {
        successCallback(data)
      }
      return { data }
    } catch (err) {
      if (typeof errorCallback === 'function') {
        failureCallback(err)
      }
      dispatch(
        messageAction({
          subTitle: 'error:errorMediaUploadGeneral',
          severity: MESSAGE_SEVERITIES.ERROR,
        })
      )
    }
  }
