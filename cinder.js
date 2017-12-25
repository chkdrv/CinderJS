/* Execute automatically when the script is loaded to add
 * all the new datatypes to the window object for easy
 * use */

/* Lists are easy to use arrays with helpful functions
 * for working with all of the elements in the array */
window.List = (function(){
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
     * class */
    List.injectPrototypeMethods = function(list){
      for(var method in List.prototype){
        if(List.prototype.hasOwnProperty(method)){
          list[method] = List.prototype[method];
        }
      }
      return list;
    };

    /* Define all the prototype functions */
    List.prototype = {

        /* Execute a function on each of the elements in
         * the, and if the function returns a value, set
         * the value of the element to the returned value
         * in place */
        each: function(callback){
            for(var i=0; i<this.length; i++){
                var temp = callback(this[i], i);
                if(temp !== undefined) this[i] = temp;
            }
        },

        /* Removes an element from the array at the specified
         * index */
        remove: function(index){
            this.splice(index, 1);
        },

        /* Returns a copy of the list */
        clone: function(){
            return new List(this.slice(0));
        }
    };

    return List;
})();

/* Dictionaries are objects with extended prototypes for
 * ease of use, particulary when iterating over them */
window.Dictionary = (function(){
    "use strict";

    /* Constructor which creates a copy of the Object
     * prototype and then injects the custom defined
     * functions into the new object's prototype */
    function Dictionary(base){
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

    /* All of the dictionaries prototype functions */
    Dictionary.prototype = {

        /* Returns all the keys in the object as an array */
        keys: function(){
            var keys = [];
            for(var prop in this){
                if(!Dictionary.prototype.hasOwnProperty(prop)){
                    keys.push(prop);
                }
            }
            return keys;
        },

        /* iterates over all the key: value pairs in the object
         * and executes a callback on them, passing the key,
         * the value and the index to the function. If the
         * callback returns a value, update the value of the
         * pair */
        each: function(callback){
            var keys = this.keys();
            for(var i=0; i<keys.length; i++){
                var temp = callback(keys[i], this[keys[i]], i);
                if(temp !== undefined) this[keys[i]] = temp;
            }
        },

        /* Returns whether or not the dictionary contains a
         * specified key */
        hasKey: function(key){
            if(this[key] !== undefined) return false;
            else return true;
        },

        /* Removes an item from the dictionary */
        delete: function(key){
            delete this[key];
        },

        /* returns a deep copy of the dictionary */
        clone: function(){
          var clone = new Dictionary();
          this.each(function(key, value, index){
            clone[key] = value;
          });
          return clone;
        }
    };

    return Dictionary;
})();
