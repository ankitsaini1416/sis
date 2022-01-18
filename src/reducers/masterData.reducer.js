import ActionTypes from './../actions/actionTypes'

const initialState = {
  district_category: [],
  district_type: [],
  enrollment_status: [],
  invoice_item_status: [],
  invoice_status: [],
  school_notes_type: [],
  school_type: [],
  transaction_type: [],
  transcript_layout: [],
  countries: [],
  userPrefixes: ['Mr.', 'Mrs.', 'Dr.'],
  userSuffixes: ['Sr.', 'Jr.', 'Sr', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
  rule_type: [],
  student_notes_type: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MASTER:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}
