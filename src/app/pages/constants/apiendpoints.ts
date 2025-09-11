let baseurl = 'http://localhost:8000/api';

if (process.env.NODE_ENV === 'development') {
    baseurl = 'http://localhost:8000/api';
}

export const apiEndpoints = {
    upload: `${baseurl}form/upload/`,
    login: `${baseurl}/accounts/login/`,
    user: `${baseurl}/accounts/user/`,
}