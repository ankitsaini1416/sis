import ActionTypes from './../actions/actionTypes'

const initialState = {
  isMobile: detectMob(),
}

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ]

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })
}

function device(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.DEVICE:
      return action.data
    default:
      return state
  }
}

export default device
