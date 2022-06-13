export default {
    required: {
        pattern: /^\s*$/,
        message: 'Không được để trống trường này',
        type: 'danger',
    },
    email: {
        pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: 'Vui lòng nhập đúng định dạng email',
        type: 'danger',
    },
    url: {
        pattern: /^https?:\/\/(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}/i,
        message: 'Vui lòng nhập đúng định dạng url',
        type: 'danger',
    },
    domain: {
        pattern: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/i,
        message: 'Vui lòng nhập đúng định dạng tên miền',
        type: 'danger',
    },
    tel: {
        pattern: /^(\+?\d{1,3}|0\d{1,3}|0)\d{8,10}$/,
        message: 'Vui lòng nhập đúng định dạng điện thoại',
        type: 'danger',
    },
    number: {
        pattern: /^(((?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?)|((?:-?\d+|-?\d{1,3}(?:.\d{3})+)?(?:\,\d+)?))$/,
        message: 'Vui lòng nhập đúng định dạng chữ số',
        type: 'danger',
    }
}