import {API} from "../../../shared/api";

const activateAccountApi = ({id}: { id?: number }) => {
    return API.request({
        method: 'GET',
        url: `auth/activate-account/${id}`,
    })
}

export default activateAccountApi