export const openLoading = (): { type: string; payload: boolean } => {
    return {
        type: 'toggleLoading',
        payload: true,
    }
}

export const closeLoading = (): { type: string; payload: boolean } => {
    return {
        type: 'toggleLoading',
        payload: false,
    }
}
