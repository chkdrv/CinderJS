# CinderJ# CinderJS

CinderJS aims to bring a lot of the comforable features we see in languages like Python and Ruby into Javascript, to make rapid iteration and ease of production the reality for Javascript development. It does so by adding new types of objects for handling data, `Lists` and `Dictionaries`.

## Lists
Lists are like arrays, but slightly extended from their Javascript brethren. They inherit the array prototype, so swapping to using lists in your code should not cause any incompatability. Creating lists is easy:

``` javascript
/* create an empty list */
var newlist = new List();

/* create a list with some numbers */
var numlist = new List(1, 2, 3, 4, 5);
```

#### Functions:
`List.each(callback)`: this function iterates over all the items in the list and performs the given function on each of them. It passes the callback the value of the current element, and its index. If the callback returns a value, the value of the current element is set to its return value;

``` javascript
var numlist = new List(1, 2, 3, 4, 5);
numlist.each(function(val, index){
	console.log("Doubling element at index " + index);
    return val * 2;
});
```

## Dictionaries
Dictionaries are like Javascript objects, but better. They contain loads of useful functions that you used to use polyfills for. Creating a new Dictionary is easy:

``` javascript
/* create an empty dictionary */
var newdict = new Dictionary();

/* create a dictionary from an existing object */
var somedict = new Dictionary({name: "Mr McGee", age: 43});
```

#### Functions
`Dictionary.keys()`: this will return an array with all the keys in the dictionary.

``` javascript
var somedict = new Dictionary({name: "Zara", age: 13, favourite_food: "ice-cream"});
var keys = somedict.keys();
/* keys now is an array of ["name", "age", "favourite_food"] */
```

`Dictionary.each(callback)`: this will iterate over all the key value pairs in the Dictionary, and execute the callback on each of them, passing the key, the value and the index in the object. If the callback returns a value, the value of the current pair is set to that value.

``` javascript
var somedict = new Dictionary({name: "Zara", age: 13, favourite_food: "ice-cream"});
somedict.each(function(key, val, index){
	if(key === "age"){
   		return 14;
    }
});
/* now somedict is {name: "Zara", age: 14, favourite_food: "ice-cream"} */
```

`Dictionary.hasKey(key)`: returns true if the dictionary has the specified key, and false otherwise.

``` javascript
var somedict = new Dictionary({name: "Zara", age: 13, favourite_food: "ice-cream"});
somedict.hasKey("name"); // true
somedict.hasKey("likes"); // false
```

`Dictionary.delete(key)`: deletes a key value pair from the dictionary.

``` javascript
var somedict = new Dictionary({name: "Zara", age: 13, favourite_food: "ice-cream"});
somedict.delete("name");
/* somedict now is {age: 13, favourite_food: "ice-cream"} */
```S

CinderJS aims to bring a lot of the comforable features we see in languages like Python and Ruby into Javascript, to make rapid iteration and ease of production the reality for Javascript development. It does so by adding new types of objects for handling data, `Lists` and `Dictionaries`.

