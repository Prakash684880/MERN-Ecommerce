
const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: 'POST',
    },
    Login: {
        url: `${backendDomain}/api/login`,
        method: 'POST',
    },
    Current_User: {
        url: `${backendDomain}/api/userDetails`,
        method: 'GET',
    },
    Logout: {
        url: `${backendDomain}/api/logout`,
        method: 'get',
    },
}


export default SummaryApi