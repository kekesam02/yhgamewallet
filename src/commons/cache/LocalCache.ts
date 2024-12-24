const {EventEmitter} = require("node:events");
const clone = require("clone");
import {Yallist} from 'yallist'

class LocalCache extends EventEmitter {
    private options: {
        checkperiod: number;
        useClones: boolean;
        lengthCalculator: (value: any, key: string) => number;
        stdTTL: number;
        maxLength: number
    };
    private _lruList: any;
    private _length: number;
    private _cache: Map<string, any>;

    constructor(options = {}) {
        super();
        this.options = Object.assign(
            {
                stdTTL: 0, // 缓存有效期，单位为s
                checkperiod: 600, // 定时检查过期缓存，单位为s
                useClones: true, // 是否使用clone
                lengthCalculator: () => 1, // 计算长度
                maxLength: 1000,
            },
            options
        );
        this._length = 0;
        this._lruList = new Yallist();
        this._cache = new Map();
        this._checkData();
    }

    get length() {
        return this._length;
    }

    get data() {
        return Array.from(this._cache).reduce((obj, [key, node]) => {
            return {...obj, [key]: node.value.v};
        }, {});
    }

    get = (key: string) => {
        const node = this._cache.get(key);
        if (node && this._check(node)) {
            this._lruList.unshiftNode(node); // 移动到队首
            return this._unwrap(node.value);
        } else {
            return void 0;
        }
    };

    set = (key: string, value: any, ttl: number = 0) => {
        const {lengthCalculator, maxLength} = this.options;
        const len = lengthCalculator(value, key);
        // 元素本身超过最大长度，设置失败
        if (len > maxLength) {
            return false;
        }

        if (this._cache.has(key)) {
            const node = this._cache.get(key);
            const item = node.value;

            item.v = value;
            this._length += len - item.l;
            item.l = len;

            this.get(node); // 更新lru
        } else {
            const item = this._wrap(key, value, ttl, len);
            this._lruList.unshift(item); // 插入到队首
            this._cache.set(key, this._lruList.head);
            this._length += len;
        }

        this._trim();
        this.emit("set", key, value);
        return true;
    };

    del = (key: string) => {
        if (!this._cache.has(key)) {
            return false;
        }
        const node = this._cache.get(key);
        this._del(node);
    };

    _del = (node: any) => {
        const item = node.value;
        this._length -= item.l;
        this._cache.delete(item.k);
        this._lruList.removeNode(node);

        this.emit("del", item.k, item.v);
    };

    // 检查是否过期，过期则删除
    _check = (node: any) => {
        const item = node.value;
        if (item.t !== 0 && item.t < Date.now()) {
            this.emit("expired", item.k, item.v);

            this._del(node);
            return false;
        }

        return true;
    };

    _checkData = () => {
        for (const node of this._cache) {
            this._check(node);
        }

        if (this.options.checkperiod > 0) {
            const timeout = setTimeout(
                this._checkData,
                this.options.checkperiod * 1000
            );

            if (timeout.unref != null) {
                timeout.unref();
            }
        }
    };

    _unwrap = (item: any) => {
        return this.options.useClones ? clone(item.v) : item.v;
    };

    _wrap = (key: string, value: any, ttl: number, length: number) => {
        ttl = ttl ?? this.options.stdTTL;
        return {
            k: key,
            v: this.options.useClones ? clone(value) : value,
            t: ttl === 0 ? 0 : Date.now() + ttl * 1000,
            l: length,
        };
    };

    _trim = () => {
        const {maxLength} = this.options;

        let walker = this._lruList.tail;
        while (this._length > maxLength && walker !== null) {
            // 删除队尾元素
            const prev = walker.prev;
            this._del(walker);
            walker = prev;
        }
    };
}

export default LocalCache