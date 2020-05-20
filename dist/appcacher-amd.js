define(['exports'], function (exports) { 'use strict';

class AppCacher {
    constructor(name, ttl) {
        this.name = name;
        this.ttl = ttl;
        this.cache = null;
        if (!isCacheAvailable()) {
            return console.error('cacheAPI is not supported in your browser.');
        }
    }

    create() {
        caches.open(this.name).then((res) => {
            this.cache = res;
        });
        if(this.ttl) setTimeout(()=> { this.delete(); }, this.ttl);
    }

    add(req) {
        this.cache.add(req).then(r => console.log('Request added to cache.'));
    }

    addAll(req) {
        this.cache.addAll(req).then(r => console.log('Requests added to cache.'));
    }

    async get(req, options = {}) {
        return await this.cache.match(req, options);
    }

    async getAll(req, options = {}) {
        return await this.cache.matchAll(req, options);
    }

    remove(req){
        this.cache.delete(req).then(r => console.log('Request removed.'));
    }

    delete() {
        caches.delete(this.name).then(() => console.log('Cache deleted.'));
    }

    put(req, resp) {
        caches.put(req, resp).then(() => console.log('Request successfully put to cache.'));
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

    getStorageQouta() {
        navigator.storage.estimate().then((estimate) => {
            return estimate;
        });
    }

}

function isCacheAvailable() {
    return 'caches' in self;
}

exports.AppCacher = AppCacher;

Object.defineProperty(exports, '__esModule', { value: true });

});
