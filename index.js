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

    remove(req){
        this.cache.delete(req).then(r => console.log('cache removed'));
    }

    delete() {
        caches.delete(this.name).then(() => console.log('request deleted from cache'));
    }

}

function isCacheAvailable() {
    return 'caches' in self;
}