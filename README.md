# Appcacher
Cache with `create`, `get`, `add`, `delete`, `has` and `remove` methods.

> 

- [Quickstart](#quickstart)
- [API](#api)

## Quickstart

```js
const app = new AppCacher('my-pokemon-cache');
app.create();

const url = 'https://pokeapi.co/api/v2/pokemon/1';
const req = new Request(url);

app.add(req);           

//or 

app.add(url);

async function fetchResponse() {
    const cachedResponse = await app.get(req);
    console.log(cachedResponse.json().then((result) => console.log(result))); // will console result from the cache which came from the pokeApi. 
}

fetchResponse();
```

## API

### Constructor

**Params**

* `name` **{String}**: Name for the cache.
* `ttl` **{Number}**: Time to live for the cache.

**Example**

```js
const app = new AppCacher('my-pokemon-cache');
```

### [.create](index.js#L10)

Creates a cache.

**Params**

* `returns` **{Object}**: A Promise that resolves to the requested Cache object.                            

**Example**

```js
app.create();
```

### [.add](index.js#L16)

Add `request` to cache. You can either use the `url` or the `object` of the request.

**Params**

* `req` **{String|Object}**: The url of the request to be cached, or the request object to be cached. For example: `const req = new Request(url)` 

**Example**

```js
app.add('https://request/to/cache');
// or
const otherRequestParams = {}; // like headers, method etc
const req = new Request('https://request/to/cache', otherRequestParams)
app.add(req);
```

### [.get](index.js#L20)

Return the response of `request` from cache. You can use the `url` or the `object` of the request.

**Params**

* `req` **{String|Object}**: The url of the request to be matched, or the request object.
* `returns` **{Object}**: Returns a Promise that resolves to the Response associated with the first matching request in the Cache object. If no match is found, the Promise resolves to undefined.

**Example**

```js
let cachedResponse; 
cachedResponse = app.get('https://request/to/cache');
// or
const otherRequestParams = {}; // like headers, method etc
const req = new Request('https://request/to/cache', otherRequestParams)
cachedResponse = app.get(req);
console.log(cachedResponse); // API response. 
```

### [.remove](index.js#L24)

Removes a specific request from the cache. You can use the `url` or the `object` of the request.

**Params**

* `req` **{String|Object}**: The url of the request to be removed, or the request object to be removed.
* `returns` **{Object}**: a Promise that resolves to true if the cache entry is removed, or false otherwise.

**Example**

```js
app.remove('https://request/to/cache');
// or
const otherRequestParams = {}; // like headers, method etc
const req = new Request('https://request/to/cache', otherRequestParams)
app.remove(req);
```

### [.delete](index.js#L28)

Deletes the entire cache from the browser. 

**Params**

* `returns` **{Object}**: a Promise that resolves to true if the cache is deleted, or false otherwise.                         

**Example**

```js
app.delete().then(function(response) {
    console.log(response);   // true
});
```

### [.has](index.js#L34)

Check whether your cache is present or not 

**Params**

* `cacheName` **{String}**: The name of the cache to check.
* `returns` **{Boolean}**: returns true if the cache is present, or false otherwise.                         

**Example**

```js
app.has('my-pokemon-cache'); // returns true
```

### [.getAllCacheNames](index.js#L40)

Returns an array with the names of all caches present. This can be useful if you want to iterate over the entries in all caches. 

**Params**

* `returns` **{Array}**: list with the names of all caches present.

**Example**

```js
getAllCacheNames(); // returns ['my-pokemon-cache']
```
