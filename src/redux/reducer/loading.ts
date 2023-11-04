export default (state = false, action: { type: string; payload: boolean }) => {
    switch (action.type) {
        case 'toggleLoading':
            return (state = action.payload)
        default:
            return state
    }
}
