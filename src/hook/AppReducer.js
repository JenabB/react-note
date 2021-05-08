// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case "USER_ID":
            return {
                ...state,
                id: [action.payload, ...state.id]
            }
        default:
            return state
    }
}