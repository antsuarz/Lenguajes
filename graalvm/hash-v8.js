// Función para convertir una cadena a Uint8Array (equivalente a TextEncoder)
function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}

// Implementación simple de MD5
function md5(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// Implementación básica de MurmurHash3 (32-bit)
function murmurHash3(str) {
    var hash = 0;
    var len = str.length;
    for (var i = 0; i < len; i++) {
        var c = str.charCodeAt(i);
        hash ^= c;
        hash *= 0x5bd1e995;
        hash &= 0xFFFFFFFF;
    }
    return hash >>> 0; // Convert to unsigned
}

function fnv1a(str) {
    var hash = 0x811C9DC5; 
    for (var i = 0; i < str.length; i++) {
        var byte = str.charCodeAt(i);
        hash ^= byte;
        hash *= 0x01000193; // FNV prime
        hash &= 0xFFFFFFFF;
    }
    return hash >>> 0;
}

function execute() { 
    var arr = [];
    for (var i = 0; i < 25000; i++) { 
        arr.push(stringToUint8Array(i.toString())); 
    }

    var sarr = [];
    for (var i = 0; i < arr.length; i++) {
        sarr.push(i.toString());
    }
 
    for (var i = 0; i < arr.length; i++) {
        md5(arr[i].toString());
    }
     
    for (var i = 0; i < sarr.length; i++) {
        murmurHash3(sarr[i]);
    }
 
    for (var i = 0; i < sarr.length; i++) {
        fnv1a(sarr[i]);
    }

    var joined = new Uint8Array(arr.reduce((acc, curr) => acc.concat(Array.from(curr)), []));
    var sjoined = sarr.join('');

    stringToUint8Array(sjoined); 
 
    md5(joined.toString());
    murmurHash3(sjoined);
    fnv1a(sjoined);
}

module.exports = {
    execute
};