const initialState = {
  headerData: {
    pageTitle: '',
    sideBar: false,
    listItems: [],
    activeMenuItem: '',
    activeParent: '',
    sidebarOpen: true,
    heading: '',
  },
}

function header(state = initialState, action) {
  const temp = Object.assign({}, state.headerData)
  switch (action.type) {
    case 'HEADER':
      Object.keys(action.payload).map((item) => {
        temp[item] = action.payload[item]
      })
      return {
        ...state,
        headerData: temp,
      }
    default:
      return state
  }
}

export default header
