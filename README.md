# Appcacher
Create and manage your cache with Appcacher.

**NOTE:** Appcacher only works for caching GET requests.

> 

- [Quickstart](#quickstart)
- [API](#api)

## Quickstart

```js
const app = new AppCacher('my-pokemon-cache', 60 * 60 * 1000); // keep the cache for 1 hour
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

### [.create](index.js#L11)

Creates a cache.

**Params**

* `returns` **{Object}**: A Promise that resolves to the requested Cache object.                            

**Example**

```js
app.create();
```

### [.add](index.js#L18)

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

### [.addAll](index.js#L22)

Add multiple `requests` to cache. You can either use the `urls` or the `objects` of the request.

**Params**

* `req` **{Array}**: The Array of urls of the request to be cached, or the request objects to be cached. 

**Example**

```js
app.addAll(['https://request/to/cache/1', 'https://request/to/cache/2', 'https://request/to/cache/3']);
// or
const otherRequestParams = {}; // like headers, method etc
const req1 = new Request('https://request/to/cache/1', otherRequestParams)
const req2 = new Request('https://request/to/cache/2', {})
const req3 = new Request('https://request/to/cache/3', {})
app.addAll([req1, req2, req3]);
```

### [.get](index.js#L26)

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

### [.getAll](index.js#L30)

Return all responses of a matching `request` from cache. You can use the `url` or the `object` of the request.

**Params**

* `req` **{Array}**: The url of the request to be matched, or the request object.
* `options` **{Object}**: (Optional params) An options object allowing you to set specific control options for the matching performed. The available options are given below. Default is an empty object.
* `returns` **{Object}**: Returns a Promise that resolves to the array of all matching responses. If no match is found, the Promise resolves to undefined.

**Optional Params**

* `ignoreSearch` **{Boolean}**: A Boolean that specifies whether the matching process should ignore the query string in the url. It defaults to false.
* `ignoreMethod` **{Boolean}**: A Boolean that, when set to true, prevents matching operations from validating the Request http method.
* `ignoreVary` **{Boolean}**: A Boolean that when set to true tells the matching operation not to perform VARY header matching — i.e. if the URL matches you will get a match regardless of the Response object having a VARY header or not. It defaults to false.


**Example**

```js
let cachedResponse; 
cachedResponse = app.getAll('/cache');
// or
const otherRequestParams = {}; // like headers, method etc
const req = new Request('/cache', otherRequestParams)
cachedResponse = app.getAll(req);
console.log(cachedResponse); // API responses Array. 
```

### [.remove](index.js#L34)

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

### [.delete](index.js#L38)

Deletes the entire cache from the browser. 

**Params**

* `returns` **{Object}**: a Promise that resolves to true if the cache is deleted, or false otherwise.                         

**Example**

```js
app.delete().then(function(response) {
    console.log(response);   // true
});
```

### [.put](index.js#L42)

Allows key/value to be added to the current Cache object. Note that `put` will overwrite any key/value pair previously stored in the cache that matches the request.

**Params**

* `req` **{String|Object}**: The url of the request to add, or the request object to be added.
* `resp` **{Object}**: The response of the request to add, for ex: `new Response('{"foo": "bar"}'))`. If you don't want to pass anything in response param, use `add()`.

**Example**

```js
app.put('https://request/to/cache', {foo: 'bar'});
// or
const otherRequestParams = {}; // like headers, method etc
const req = new Request('https://request/to/cache', otherRequestParams)
const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
const resp = new Response({foo: 'bar'}, options);
app.put(req, resp).then(function(response) {
    console.log(response);   // true
});
```


### [.has](index.js#L46)

Check whether your cache is present or not 

**Params**

* `cacheName` **{String}**: The name of the cache to check.
* `returns` **{Boolean}**: returns true if the cache is present, or false otherwise.                         

**Example**

```js
app.has('my-pokemon-cache'); // returns true
```

### [.getAllCacheNames](index.js#L52)

Returns an array with the names of all caches present. This can be useful if you want to iterate over the entries in all caches. 

**Params**

* `returns` **{Array}**: list with the names of all caches present.

**Example**

```js
getAllCacheNames(); // returns ['my-pokemon-cache']
```

### [.getStorageQouta](index.js#L58)[EXPERIMENTAL]

Returns the size, in bytes, the total qouta and the used qouta. 

**Params**

* `returns` **{Object}**: list with the usage and total qouta with details.

**Example**

```js
getStorageQouta(); // returns {quota: 239400581529, usage: 725290, usageDetails: {caches: 721920, indexedDB: 3370}}
```

### License

Copyright © 2020, [Gautam Pahuja](https://github.com/gautam-pahuja).
Released under the [MIT License](LICENSE).