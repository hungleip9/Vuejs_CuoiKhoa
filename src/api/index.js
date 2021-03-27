import axios from 'axios'
import store from "../store";
import router from "../router";

// Lấy ra các biến cần thiết: base url, token
const baseUrl = process.env.VUE_APP_BASE_URL;
const token = localStorage.getItem('access_token');
// Tạo instance của axios
export const apiAxios = axios.create({
    baseURL:`${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json'
        },
        common: {
            'Authorization': `Bearer ${token}`
        }
    }
})
// Xử lý logout khi response 401
apiAxios.interceptors.response.use(undefined, (error) => {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
            store.commit('auth/updateLoginStatus', false)
            store.commit('auth/updateAuthUser', {})
            localStorage.removeItem('access_token')
            return router.push({name: 'Login'})
        }
    }
})
apiAxios.interceptors.request.use(config => {
    let token = store.state.auth.token
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})
// Khai báo các request sử dụng trong hệ thống
export default {
    getAuthUser () {
        return apiAxios({
            method: 'get',
            url: '/auth/me'
        })
    },
    register (data) {
        return apiAxios({
            method: 'post',
            url: 'auth/register',
            data: data
        })
    },
    login (data) {
        return apiAxios({
            method: 'post',
            url: 'auth/login',
            data: data
        })
    },
    getDirectories() {
        return apiAxios({
            method: 'get',
            url: '/directories'
        })
    },
    createDirectory(data) {
        return apiAxios({
            method: 'post',
            url: 'directories',
            data: data
        })
    },
    deleteDirectory(id) {
        return apiAxios({
            method: 'delete',
            url: '/directories/' + id
        })
    },
    editDirectoryName(id, data) {
        return apiAxios({
            method: 'put',
            url: '/directories/' + id,
            data: data
        })
    },
    createCard(data) {
        return apiAxios({
            method: 'post',
            url: '/cards',
            data: data
        })
    },
    editCard(id, data) {
        return apiAxios({
            method: 'put',
            url: '/cards/' + id,
            data: data
        })
    },
    detailCard(id) {
        return apiAxios({
            method: 'get',
            url: '/cards/' + id,
        })
    },
    search(data) {
        return apiAxios({
          method: 'get',
          url: '/labels?q=' + data,
        })
    },
    getLabels() {
        return apiAxios({
            method: 'get',
            url: '/labels'
        })
    },
    createLabel(id, data) {
        return apiAxios({
            method: 'post',
            url: '/cards/' + id + '/label',
            data: data
        })
    },
    addLabel(id, data) {
        return apiAxios({
            method: 'post',
            url: '/cards/' + id + '/attach-labels',
            data: data
        })
    },
    removeLabelFromCard(id, data) {
        return apiAxios({
            method: 'delete',
            url: 'cards/'+ id +'/detach-labels',
            data: data
        })
    },
    deleteLabel(id) {
        return apiAxios({
            method: 'delete',
            url: '/labels/' + id,
        })
    },
    createChecklist(data) {
        return apiAxios({
            method: 'post',
            url: '/check-lists',
            data: data
        })
    },
    editChecklist(id, data) {
        return apiAxios({
            method: 'put',
            url: '/check-lists/' + id,
            data: data
        })
    },
    createSubCheckList(data) {
        return apiAxios({
            method: 'post',
            url: '/check-list-childs',
            data: data
        })
    },
    editSubCheckList(id, data) {
        return apiAxios({
            method: 'put',
            url: '/check-list-childs/' +id,
            data: data
        })
    },
    deleteSubCheckList(id) {
        return apiAxios({
            method: 'delete',
            url: '/check-list-childs/' +id,
        })
    },
    deleteCheckList(id) {
        return apiAxios({
            method: 'delete',
            url: '/check-lists/' + id,
        })
    },
    updateStatusCheckListChild(id, data) {
        return apiAxios({
            method: 'put',
            url: '/check-list-childs/'+ id +'/change-status',
            data: data
        })
    },
    updateUser(data) {
        return apiAxios({
            method: 'post',
            url: '/users',
            data: data
        })
    },
    cardDeadline(id, data) {
        return apiAxios({
            method: 'put',
            url: '/cards/'+ id +'/change-status-deadline',
            data: data
        })
    },
    changePassword(data) {
        return apiAxios({
            method: 'put',
            url: '/users/password',
            data: data
        })
    },
    updateCardStatus(id, data) {
        return apiAxios({
            method: 'put',
            url: '/cards/'+ id +'/change-status',
            data: data
        })
    },
    uploadFile(id, data) {
        return apiAxios({
            method: 'post',
            url: '/cards/'+ id +'/upload-file',
            data: data
        })
    },
    changeFileName(id, data) {
        return apiAxios({
            method: 'put',
            url: '/files/' + id,
            data: data
        })
    },
    changeIndexDirectory(id, data) {
        return apiAxios({
            method: 'put',
            url: '/directories/' + id + '/index',
            data: data
        })
    },
    changeCardDirectory(id, data) {
        return apiAxios({
            method: 'put',
            url: '/cards/' + id + '/directory',
            data: data
        })
    },
    changeCardIndex(id, data) {
        return apiAxios({
            method: 'put',
            url: '/cards/' + id + '/index',
            data: data
        })
    },
    deleteCard(id) {
        return apiAxios({
            method: 'delete',
            url: '/cards/' + id,
        })
    },
    deleteFile(id) {
        return apiAxios({
            method: 'delete',
            url: '/files/' + id,
        })
    }
}