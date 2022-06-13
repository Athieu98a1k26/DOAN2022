
export const upload = (file, options) => {

    var formData = new FormData();

    formData.append('file', file);
    for (let key in options) {
        formData.append(key, options[key]);
    }

    return {
        url: '/api/attachments',
        method: 'post',
        body: formData
    };
};

export const remove = (id, url) => {
    return {
        url: '/api/attachments/' + (id ? id : ''),
        params: {
            url
        },
        method: 'delete'
    };
}

export const getList = (path, accept = "*", offset = 0, pagesize = 100) => {
    return {
        url: '/api/attachments',
        params: {
            path, accept, offset, pagesize
        }
    }
}