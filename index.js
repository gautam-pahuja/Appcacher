export class AppCacher {
    constructor(name) {
        this.name = name;
        this.cache = null;
        if (!isCacheAvailable()) {
            return console.error('cacheAPI is not supported in your browser');
        }
    }

    create() {
        caches.open(this.name).then((res) => {
            this.cache = res;
        });
    }

    add(req) {
        this.cache.add(req).then(r => console.log('request added to cache'));
    }

    async get(req) {
        return await this.cache.match(req);
    }

    delete(req) {
        this.cache.delete(req).then(r => console.log('request deleted from cache'));
    }

    remove(){
        caches.delete(this.name).then(() => console.log('cache deleted'));
    }
}

function isCacheAvailable() {
    return 'caches' in self;
}