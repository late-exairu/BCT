/*---------------------------------------------------*/
/* functions for Update styles in Charts */
/*---------------------------------------------------*/

function changeChartStylesOptions(newStyles, oldStyles) {
    var keys = getDeepKeys(newStyles);
    keys.map(function (path) {
        var deepValue = getDeepVal(newStyles, path);
        if (typeof deepValue != 'object') {
            setDeepValue(oldStyles, deepValue, path);
        }
    });
}

function getDeepKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
        if (typeof obj[key] === "object") {
            var subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map(function (subkey) {
                return key + "." + subkey;
            }));
        }
    }
    return keys;
}

function getDeepVal(obj, path) {
    var paths = path.split('.'),
        current = obj,
        i;

    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        } else {
            current = current[paths[i]];
        }
    }
    return current;
}

function setDeepValue(obj, value, path) {
    var i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
}