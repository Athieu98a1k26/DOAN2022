import {
    HttpError,
    NetworkError,
    DataError
} from './errors';
import request from './request';
var qs = require('qs');

const timeout = 120000;

export default ({
    dispatch,
    getState
}) => {
    return next => {
        return action => {
            if (typeof action === 'object' && action.url && !action.type) {
                return apiCall({
                    action,
                    dispatch,
                    getState
                });
            }
            return next(action);
        }
    }
};

const apiCall = ({
    action,
    dispatch,
    getState
}) => {
    const account = getState().account || {};
    const server = getState().server || {};
    const token = account.token;

    var {
        host,
        url,
        json,
        method,
        types,
        params,
        meta,
        retry,
        body,
        contentType,
        serverId,
        abortController
    } = action;

    host = host || request.host;

    url = host + url;

    method = !method ? "GET" : method.toUpperCase();

    retry = retry == undefined ? (method == "GET" ? 1 : 0) : retry;

    if (types && types.start) {
        dispatch({
            type: types.start,
            params,
            meta
        });
    }

    if (!contentType && !body) {
        contentType = json != false ? 'application/json' : 'application/x-www-form-urlencoded'
    }

    if (params && !body) {
        if (method != 'GET' && method != 'DELETE') {
            if (json !== false) {
                body = JSON.stringify(params);
            } else {
                body = qs.stringify(params);
            }
        } else {
            url += '?' + qs.stringify(params, {
                allowDots: true
            })
        }
    }

    const opts = {
        method: method,
        headers: {},
        body: body
    };

    if (contentType) {
        opts.headers['Content-Type'] = contentType;
    }

    if (token) {
        opts.headers['Authorization'] = 'Bearer ' + token;
    }

    if (serverId) {
        opts.headers['ServerId'] = serverId;
    }
    else if (server.currentId) {
        opts.headers['ServerId'] = server.currentId;
    }

    if (abortController && abortController.signal) {
        opts.signal = abortController.signal;
    }

    //console.log('Call ajax', url);

    return new Promise(function (resolve, reject) {
        var rejected = false;

        var timeoutId = setTimeout(function () {
            console.log('time out', url);

            rejected = true;

            if (retry > 0) {
                console.log('retry call ajax', retry, url);

                action.retry = retry - 1;

                if (types && types.retry) {
                    dispatch({
                        type: types.retry,
                        params,
                        meta,
                        url,
                        error
                    });
                }
                return dispatch(action).then(resolve).catch(reject);
            }

            return onError({
                error: 'Timeout',
                message: 'Hết thời gian kết nối.'
            });

        }, timeout);

        fetch(url, opts)
            .then(res => {
                if (!res.ok) {
                    if (res.status == 401) {
                        console.log('not authenticated...')
                        dispatch({
                            type: 'ACCOUNT_LOGOUT'
                        })
                        //location = location;
                    }
                    var type = res.headers.get('content-type');
                    if (type && type.match('application/json')) {
                        return res.json()
                            .catch(e => ({}))
                            .then(data => {
                                console.log(data, res);
                                throw new HttpError(data, res)
                            });
                    } else {
                        return res.text()
                            .catch(e => null)
                            .then(data => {
                                console.log(data, res);
                                throw new HttpError({
                                    message: data
                                }, res)
                            });
                    }
                }
                return res.json();
            })
            .then(data => {
                clearTimeout(timeoutId);
                return onSuccess(data, resolve, reject);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                onError(error, reject);
            })
    });

    function onError(error, reject) {
        error = (error instanceof HttpError || error instanceof DataError) ? error : new NetworkError(error, url);

        var noConnection = (error instanceof NetworkError) || error.status >= 500;

        if (types && types.error) {
            dispatch({
                type: types.error,
                params,
                meta,
                url,
                error,
                noConnection
            });
        }

        if (reject) {
            return reject(error);
        } else {
            return Promise.reject(error);
        }
    }

    function onSuccess(data, resolve, reject) {
        if (data && data.error) {
            return onError(new DataError(data), reject);
        }
        if (types && types.success) {
            dispatch({
                type: types.success,
                params,
                data,
                meta
            });
        }
        return resolve(data);
    }
};