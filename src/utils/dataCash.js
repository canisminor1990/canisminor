import _ from 'lodash';

export default class DataCash {
  constructor(namespace, timeout = $isDev ? 5000 : 60000) {
    this.namespace = namespace;
    this.timeout = timeout;
  }

  get() {
    const local = JSON.parse(localStorage.getItem(this.namespace));
    if (local && _.size(local.data) > 0 && local.time && Date.now() - local.time < this.timeout) {
      return local.data;
    }
    return false;
  }

  set(data) {
    localStorage.setItem(this.namespace, JSON.stringify({ time: Date.now(), data }));
  }
}
