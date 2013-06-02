# Oar (observable/evented array)

Small module that overwrites all the mutatable array methods and fires the related event.

## Mutable array methods in Javascript

* [`pop`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/pop)
* [`push`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push)
* [`reverse`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reverse)
* [`shift`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/shift)
* [`sort`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort)
* [`splice`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)
* [`unshift`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/unshift)


## Example

```js
var a = oar();
```

or

```js
var a = oar(['one', 'two']);
```

```js
a.push('three');

a.on('push', function (updated_array) {
  console.log(update_array); // ['one', 'two', 'three'];
});
```

## Tests

```sh
mocha specs.js -R should
```
