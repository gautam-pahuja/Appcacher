export class AppCacher {
    constructor(name, ttl) {
        this.name = name;
        this.ttl = ttl;
        this.cache = null;
        if (!isCacheAvailable()) {
            return console.error('cacheAPI is not supported in your browser');
        }
    }

    create() {
        caches.open(this.name).then((res) => {
            this.cache = res;
        });
        if(this.ttl) setTimeout(()=> { this.delete() }, this.ttl)
    }

    add(req) {
        this.cache.add(req).then(r => console.log('request added to cache'));
    }

    addAll(req) {
        this.cache.addAll(req).then(r => console.log('requests added to cache'));
    }

    async get(req, options = {}) {
        return await this.cache.match(req, options);
    }

    async getAll(req, options = {}) {
        return await this.cache.matchAll(req, options);
    }

    remove(req){
        this.cache.delete(req).then(r => console.log('cache removed'));
    }

    delete() {
        caches.delete(this.name).then(() => console.log('request deleted from cache'));
    }

    put(req, resp) {
        caches.put(req, resp).then(() => console.log('request successfully put to cache'));
    }

    has(cacheName) {
        caches.has(cacheName).then((boolean) => {
            return boolean;
        });
    }

    getAllCacheNames() {
        caches.keys().then((cacheNames) => {
            return cacheNames
        });
    }

}

function isCacheAvailable() {
    return 'caches' in self;
}