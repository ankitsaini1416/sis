export default {
  setToken: function (cells) {
    localStorage.setItem('auth_data', JSON.stringify(cells))
  },
  getAccessToken: function () {
    return JSON.parse(localStorage.getItem('auth_data')) || {}
  },
  clearToken: function () {
    localStorage.removeItem('auth_data')
  },
  setDistrictSchool: function (cells) {
    localStorage.setItem('ds_info', JSON.stringify(cells))
  },
  getDistrictSchool: function () {
    return JSON.parse(localStorage.getItem('ds_info'))
  },
  clearDistrictSchool: function () {
    localStorage.removeItem('ds_info')
  },
  setHeadCellsDistricts: function (cells) {
    localStorage.setItem('cells_districts', JSON.stringify(cells))
  },
  getHeadCellsDistricts: function () {
    return JSON.parse(localStorage.getItem('cells_districts'))
  },
  setHeadCellsSchools: function (cells) {
    localStorage.setItem('cells_schools', JSON.stringify(cells))
  },
  getHeadCellsSchools: function () {
    return JSON.parse(localStorage.getItem('cells_schools'))
  },
  setHeadCellsPrograms: function (cells) {
    localStorage.setItem('cells_programs', JSON.stringify(cells))
  },
  getHeadCellsPrograms: function () {
    return JSON.parse(localStorage.getItem('cells_programs'))
  },
  setHeadCellsApplication: function (cells) {
    localStorage.setItem('cells_registration', JSON.stringify(cells))
  },
  getHeadCellsApplication: function () {
    return JSON.parse(localStorage.getItem('cells_registration'))
  },
  setHeadCellsUsers: function (cells) {
    localStorage.setItem('cells_users', JSON.stringify(cells))
  },
  getHeadCellsUsers: function () {
    return JSON.parse(localStorage.getItem('cells_users'))
  },
  setHeadCellsAudit: function (cells) {
    localStorage.setItem('cells_audit', JSON.stringify(cells))
  },
  getHeadCellsAudit: function () {
    return JSON.parse(localStorage.getItem('cells_audit'))
  },
  setHeadCellsCourses: function (cells) {
    localStorage.setItem('cells_courses', JSON.stringify(cells))
  },
  getHeadCellsCourses: function () {
    return JSON.parse(localStorage.getItem('cells_courses'))
  },
  setLmsObject: function (cells) {
    localStorage.setItem('lmsObject', JSON.stringify(cells))
  },
  getLmsObject: function () {
    return JSON.parse(localStorage.getItem('lmsObject')) || {}
  },
  clearLmsObject: function () {
    localStorage.removeItem('lmsObject')
  },
  setAppState: function (state) {
    localStorage.setItem('appState', JSON.stringify({ ...this.getAppState(), ...state }))
  },
  getAppState: function () {
    return JSON.parse(localStorage.getItem('appState')) || {}
  },
}
