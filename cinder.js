/* Execute automatically when the script is loaded to add
 * all the new datatypes to the window object for easy
 * use */

/* Lists are easy to use arrays with helpful functions
 * for working with all of the elements in the array */
var List = (function(){
    "use strict";

    /* Constructor funcion, which creates a copy of the
     * array prototype, then injects the custom functions
     * into the new prototype */
    function List(){
        var list = Object.create(Array.prototype);
        list = Array.apply(list, arguments);
        List.injectPrototypeMethods(list);
        return list;
    }

    /* Injects the defined prototype methods into the new
     * object */
    List.injectPrototypeMethods = function (list) {
      for(var method in List.prototype){
        if(List.prototype.hasOwnProperty(method)){
          list[method] = List.prototype[method];
        }
      }
      return list;
    };

    /**
     * Iterates over each item in the list and calls a function on it, passing
     * the value and index to the function. If the function returns a value, 
     * this value is inserted at the index the iteration is currently on.
     * @param {Function} callback the function to call
     */
    function each (callback) {
        for(var i=0; i<this.length; i++){
            var temp = callback(this[i], i);
            if(temp !== undefined) this[i] = temp;
        }
        return this;
    }

    /**
     * Removes the element at the given index
     * @param {Number} index the index of the element to remove 
     */
    function remove (index) {
        this.splice(index, 1);
        return this;
    }

    /**
     * Returns a clone of the array
     * @returns {List} a copy of the array
     */
    function clone () {
        return new List(this.slice(0));
    }

    List.prototype = {
        each: each,
        remove: remove,
        clone: clone
    };

    return List;
})();

/* Dictionaries are objects with extended prototypes for
 * ease of use, particulary when iterating over them */
var Dictionary = (function(){
    "use strict";

    /* Constructor which creates a copy of the Object
     * prototype and then injects the custom defined
     * functions into the new object's prototype */
    function Dictionary (base) {
        var dictionary = Object.create(Dictionary.prototype);
        if(base !== undefined){
            for(var prop in base){
                if(base.hasOwnProperty(prop)){
                    dictionary[prop] = base[prop];
                }
            }
        }
        return dictionary;
    }

    /**
     * Returns an array of all the keys in the object as an array
     * @returns {Array} the keys in the object
     */
    function keys () {
        var keys = [];
        for(var prop in this){
            if(!Dictionary.prototype.hasOwnProperty(prop)){
                keys.push(prop);
            }
        }
        return keys;
    }

    /**
     * Iterates over all the keys in the object and calls a function on them,
     * passing the key, value and index of the key to the function. If the
     * function returns a value, this value replaces the existing value.
     * @param {Function} callback the function to call 
     */
    function each (callback) {
        var keys = this.keys();
        for(var i=0; i<keys.length; i++){
            var temp = callback(keys[i], this[keys[i]], i);
            if(temp !== undefined) this[keys[i]] = temp;
        }
        return this;
    }

    /**
     * Returns true if an object has a key, or false if it does not.
     * @param {String} key the key to test for 
     */
    function hasKey (key) {
        if(this[key] !== undefined) return false;
        else return true;
    }

    /**
     * Removes a key/value pair from the dictionary
     * @param {String} key the key to remove 
     */
    function del (key) {
        delete this[key];
        return this;
    }

    /**
     * Returns a copy of the dictionary
     * @returns {Dictionary} the new Dictionary object
     */
    function clone () {
        var clone = new Dictionary();
        this.each(function(key, value, index){
          clone[key] = value;
        });
        return clone;
    }

    Dictionary.prototype = {
        keys: keys,
        each: each,
        hasKey: hasKey,
        delete: del,
        clone: clone
    };

    return Dictionary;
})();
