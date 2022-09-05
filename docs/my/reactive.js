class Dep {
    constructor() {
        this.subs = [];
    }
    static target;
    depend() {
        if (!Dep.target) {
            return;
        }
        if (!this.subs.includes(Dep.target)) {
            this.subs.push(Dep.target)
        }
    }
    notify() {
        this.subs.forEach(item => {
            if (item) {
                item()
            }
        })
    }
}

// 给普通对象 添加响应式
function addGetterAndSetter(val = {}) {
    if (!val || typeof val !== 'object') { return }
    for (let [k, v] of Object.entries(val)) {
        if (typeof v === 'object') {
            addGetterAndSetter(v);
            continue;
        }
        const dep = new Dep()
        Object.defineProperty(val, k, {
            get() {
                dep.depend()
                return v;
            },
            set(vv) {
                v = vv;
                dep.notify()
            },
            configurable: true,
            enumerable: true
        })
    }
}

const o = { a: 1, b: 2 };
addGetterAndSetter(o);
function calc() {
    o.c = o.a + o.b;
}

const observer = func => {
    Dep.target = func;
    func();
    Dep.target = null;
}

observer(calc)