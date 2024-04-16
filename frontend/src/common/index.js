
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
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: 'get',
    },
    UpdateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'POST',
    },
}


export default SummaryApi