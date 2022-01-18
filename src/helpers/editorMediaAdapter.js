import { uploadMediaCall } from './../actions/media.action'
import { API } from './../api/api'
import localStorageService from './../api/localStorageService'
import STORE from './../store'

export default class EditorMediaAdapter {
  constructor(loader, spaceID, baseUrl) {
    // The file loader instance to use during the upload.
    this.loader = loader
    this.spaceID = spaceID
    this.baseUrl = baseUrl
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(async (file) => {
      try {
        const { data } = await uploadMediaCall(`${this.spaceID}/transcript`, file)(STORE.dispatch)
        const { accountId } = localStorageService.getAccessToken()
        const imageUrl = `${this.baseUrl}${API.MEDIARESPONSE}${accountId}/default`
        return Promise.resolve({
          default: `${imageUrl}${data[0]}`,
        })
      } catch (err) {
        return Promise.reject()
      }
    })
  }

  // Aborts the upload process.
  abort() {}
}
