const filter = ''

const reducer = (state = filter, action) => {
  switch (action.type) {
    case 'NEW_FILTER':
      return action
    default:
      return state
  }
}
export const setNewFilter = filter => {
  return {
    type: 'NEW_FILTER',
    filter: filter
  }
}

export default reducer