(function( Simples ){   
	
	// Test to determine whether the toString call is faster than the typeof and checks
	// Browser 	| typeof:toString per 50000 calls average ms
	// Safari 	| 62:92                      
    var test = perfTester.test;


	var toString = (function(){
		var toString = Object.prototype.toString;
                                                
  		return function( obj, klass ){
			return toString.call( obj ) === klass;
		};
	})();

	function isString( obj ){
		return typeof obj === 'string';
	}
		
	function isStringChar( obj ){
		return obj && !!obj.charAt;
	}

	function isDomNode( obj ){ 
		return typeof obj === 'object' && ( obj.nodeType === 1 || obj.nodeType === 9 );
	}
	
	function isNodeList( obj ){ 
		return typeof obj === 'object' && obj.item;
	}
	
	function isFunction( obj ){ 
		return typeof obj === 'function';
	}                                   
	
	function isArray( obj ){ 
		return typeof obj === 'object'  && obj.length && obj.push;
	} 
	
	function isObject( obj ){ 
		return typeof obj === 'object' && obj !== null && !obj.length;
	}
	
	function isWindow( obj ){
		return ( obj.setInterval ) ? true : false;
	}
	
	var count = 50000, 
	ArrayClass = '[object Array]',
	ObjectClass = '[object Object]',
	NodeListClass = '[object NodeList]', 
	StringClass = "[object String]", 
	NumberClass = "[object Number]",
	FunctionClass = "[object Function]",
	BooleanClass = "[object Boolean]",
	HTMLCollectionClass = "[object HTMLCollection]",
	WindowClass = "[object Window]";
	
	perfTester.log( '<strong>Testing typeOf and toString - <em>'+count+'</em> times</strong>' );
	test( isObject, count, 'isObject', window, [{ham:'sandwich'}] );
	test( toString, count, 'toString - Object', window, [{ham:'sandwich'}, ObjectClass ] );
	test( isArray, count, 'isArray', window, [[1,2,3]] );
	test( toString, count, 'toString - Array', window, [[1,2,3], ArrayClass ] );
	test( isNodeList, count, 'isNodeList', window, [document.getElementsByTagName('p')] );
	test( toString, count, 'toString - NodeList', window, [document.getElementsByTagName('p'), NodeListClass] );
	test( isDomNode, count, 'isDomNode', window, [document.createElement('p')] );
	test( toString, count, 'toString - DomNode', window, [document.createElement('p'), NodeListClass] ); 
	test( isFunction, count, 'isFunction', window, [function(){}] );
	test( toString, count, 'toString - Function', window, [function(){}, FunctionClass] );		   	
	test( isWindow, count, 'isWindow', window, [window] );
	test( toString, count, 'toString - Window', window, [window, WindowClass] );
	test( isString, count, 'isString', window, ["I am a string"] ); 
	test( isStringChar, count, 'isStringChar', window, ["I am a string"] ); 
	test( toString, count, 'toString - isString', window, ["I am a string", StringClass] );
	
})( Simples );