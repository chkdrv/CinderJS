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
        }
    };

    return List;
})();
