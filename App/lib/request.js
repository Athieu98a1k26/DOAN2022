class Request {
    host = null;

    constructor() {
        this.host = location.protocol + '//' + location.host;
    }

    url = path => {
        if (path && !path.match(/^\s*\//)) {
            path = '/' + path;
        }
        return this.host + (path || "");
    }

    decode = path => {
        return decodeURIComponent(path);
    }

    encode = path => {
        return encodeURIComponent(path);
    }
}

export default new Request();