import "bootstrap-notify";
import Swal from "sweetalert2";
String.prototype.searchDot = function (value) {
  let arrNUmber = this.split("");
  for (let i = 0; i < arrNUmber.length; i++) {
    const element = arrNUmber[i];
    if (value === element) {
      return i;
    }
  }
  return -1;
};
String.prototype.clearBlank = function () {
  return this.split(" ").join("");
};

String.prototype.contains = function (str, toLower = true) {
  let _this = this;
  if (toLower) {
    _this = _this.toLowerCase();
    str = str.toLowerCase();
  }
  return _this.indexOf(str) !== -1;
};

String.prototype.parseJson = function () {
  if (!this) return {};
  return JSON.parse(this);
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.formatDate = function () { };

Number.prototype.toLocaleString = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

Array.prototype.remove = function (func) {
  if (typeof func == "number") {
    return this.splice(func, 1);
  }
  if (typeof func == "function") {
    var index = this.findIndex(func);
    if (index >= 0) return this.splice(index, 1);
  }
  return this;
};

Array.prototype.sum = function (func) {
  if (typeof func == "function") {
    let sum = 0;
    this.forEach((item) => {
      let value = Number(func.call(this, item));
      if (value) sum += value;
    });
    return sum;
  } else {
    let sum = 0;
    this.forEach((item) => {
      let value = Number(item);
      if (value) sum += value;
    });
    return sum;
  }
};

Array.prototype.toJson = function () {
  if (!this) return {};
  return JSON.stringify(this);
};

Array.prototype.count = function (func) {
  if (typeof func == "function") {
    return this.filter(func).length;
  } else {
    return this.length;
  }
};

Array.prototype.contains = function (item) {
  return this.indexOf(item) !== -1;
};

Array.prototype.distinct = function () {
  return Array.from(new Set(this));
};

Array.prototype.isNotEmpty = function () {
  return this.length > 0;
};

Array.prototype.any = function (func) {
  if (func) return this.find(func) != null;
  return this.length > 0;
};

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

Array.prototype.lastIndex = function () {
  return this.length - 1;
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.first = function () {
  return this[0];
};

/**
 * @description lấy 1 thuộc tính của object nằm trong mảng.
 * @param {string} key = 'key1.key2 || key
 */
Array.prototype.select = function (key) {
  let lst = this;
  const keys = key.split(".");
  keys.map((k) => {
    lst = lst.map((item) => item[k]).filter((item) => item != null);
  });
  return lst;
};

Array.prototype.joinObj = function (key, separator = ",") {
  return this.select(key).join(separator);
};

Array.prototype.uniqueObj = function (objKey) {
  return this.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t[objKey] === item[objKey]),
  );
};

Array.prototype.orderBy = function (func) {
  return this.sort((a, b) => {
    let va = func(a);
    let vb = func(b);
    return va > vb ? 1 : va < vb ? -1 : 0;
  });
};

Array.prototype.orderByDesc = function (func) {
  return this.sort((a, b) => {
    let va = func(a);
    let vb = func(b);
    return va < vb ? 1 : va > vb ? -1 : 0;
  });
};

Array.prototype.groupBy = function (func, toArray = true) {
  let obj = this.reduce(function (rv, x) {
    let key = func(x);
    (rv[key] = rv[key] || []).push(x);
    return rv;
  }, {});

  if (toArray) {
    return Object.entries(obj).map((data) => ({
      key: data[0],
      items: data[1],
    }));
  }
  return obj;
};

String.prototype.toMoney = function () {
  if (!this) return 0;
  return this.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
String.prototype.toJson = function () {
  if (!this) return {};
  return JSON.parse(this);
};

Number.prototype.toMoney = function () {
  if (!this) return 0;
  return this.toString().toMoney();
};

Array.prototype.max = function (func) {
  if (typeof func == "function") {
    let max = 0;
    this.forEach((item) => {
      let value = Number(func.call(this, item));
      if (value && max < value) max = value;
    });
    return max;
  } else {
    let max = 0;
    this.forEach((item) => {
      let value = Number(item);
      if (value && max < value) max = value;
    });
    return max;
  }
};

Array.prototype.min = function (func) {
  if (typeof func == "function") {
    let min = 0;
    this.forEach((item) => {
      let value = Number(func.call(this, item));
      if (value && min > value) min = value;
    });
    return min;
  } else {
    let min = 0;
    this.forEach((item) => {
      let value = Number(item);
      if (value && min > value) min = value;
    });
    return min;
  }
};

Array.prototype.chunk = function (groupsize) {
  var sets = [],
    chunks,
    i = 0;
  var clone = Array.from(this);
  chunks = this.length / groupsize;

  while (i < chunks) {
    sets[i] = clone.splice(0, groupsize);
    i++;
  }

  return sets;
};

/**
 * enum
 */

window.getEnumLabel = (value, enumList) => {
  const found = (enumList || []).find((item) => item.value == value);
  return found ? found.label : value;
};

window.getEnumName = (value, enumList) => {
  const found = (enumList || []).find((item) => item.value == value);
  return found ? found.name : value;
};

window.getEnumValue = (name, enumList) => {
  name = name.toLowerCase();
  const found = (enumList || []).find(
    (item) => item.name.toLowerCase() == name,
  );
  return found ? found.value : 0;
};

window.homeUrl = location.protocol + "//" + location.host;

window.getUrl = (path = "/") => {
  return homeUrl + path;
};

/**
 * notify - alert - confirm
 *
 * form: ['top', 'bottom']
 * align: ['center', 'left', 'right']
 * type: ['inverse', 'info', 'success', 'warning', 'danger']
 */

window.notify = function (message, type = "info", options = {}) {
  options = {
    icon: "",
    from: "bottom",
    align: "right",
    timer: 1000,
    delay: 2500,
    allow_dismiss: true,
    ...options,
  };

  $.notify(
    {
      icon: options.icon,
      message: message,
    },
    {
      element: "body",
      type: type || "info",
      allow_dismiss: options.allow_dismiss,
      placement: {
        from: options.from,
        align: options.align,
      },
      offset: {
        x: 20,
        y: 20,
      },
      spacing: 10,
      z_index: 1100,
      delay: options.delay,
      timer: options.timer,
      url_target: "_blank",
      mouse_over: false,
      template:
        '<div data-notify="container" class="alert alert-dismissible alert-{0} alert--notify" role="alert">' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        "</div>" +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '<button type="button" aria-hidden="true" data-notify="dismiss" class="alert--notify__close">Close</button>' +
        "</div>",
    },
  );
};

window.is = (el, selector) => {
  return (
    el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    el.oMatchesSelector
  ).call(el, selector);
};

window.range = (start, end) => {
  return Array.from({ length: end }, (v, k) => k + start);
};

window.parseBool = (value) => {
  return value === true || value === "true";
};

window._setOptions = (k, v) => {
  let options = (localStorage.getItem("ecrm:options") || "").parseJson();
  options[k] = v;
  localStorage.setItem("ecrm:options", JSON.stringify(options));
  return options;
};

window._getOptions = (k, defaultVal = null) => {
  let options = (localStorage.getItem("ecrm:options") || "").parseJson();
  return options[k] ? options[k] : defaultVal;
};

window._removeOptions = (k) => {
  let options = (localStorage.getItem("ecrm:options") || "").parseJson();
  if (options[k]) {
    delete options[k];
  }
  localStorage.setItem("ecrm:options", JSON.stringify(options));
  return options;
};
window.alert = function (title, message, type = null, options = {}) {
  if (message) {
    title = title + "";
    message = message + "";
  } else {
    message = title + "";
    title = "";
  }

  if (type == "danger") type = "warning";

  options = {
    //   icon: 'error',
    type,
    timer: null, //auto close
    confirmButtonClass: "swal2-btn",
    confirmButtonText: "Ok",
    buttonsStyling: false,
    //width: null,
    padding: null,
    animation: true,
    customClass: null,
    ...options,
  };

  if (title.length < 20 && message.length < 20) {
    options.width = 250;
  }

  return Swal.fire({
    title: title,
    text: message,
    ...options,
  });
}

window.confirm = function (title, question, options = {}) {
  if (question) {
    title = title + "";
    question = question + "";
  } else {
    question = title + "";
    title = "";
  }

  options = {
    type: 'question',
    timer: null, //auto close
    buttonsStyling: false,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    showCancelButton: true,
    confirmButtonClass: 'button-confirm  btn-red',
    cancelButtonClass: 'button-cancel btn-outline',
    ...options
  };
  if (!options.width) {
    options.width = "60.69%";
  }
  return Swal.fire({
    title: title,
    text: question,
    ...options
  }).then(res => {
    return !!res.value;
  })
}
window.__ = window.__F = window.__L = window.__U = window.__S = (x) => x;
