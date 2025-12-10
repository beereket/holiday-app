export interface AuthState {
    user: any | null
    loading: boolean
    error: string | null
}

export const initialAuthState: AuthState = {
    user: null,
    loading: false,
    error: null
}