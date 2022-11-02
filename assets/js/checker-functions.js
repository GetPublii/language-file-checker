// Check if given JSON is valid
function validateJSON (fileContent) {
    try {
        JSON.parse(fileContent);
    } catch (e) {
        return false;
    }

    return true;
}

// Get array of all keys from given JSON
function getAllKeysFromFile (parsedContent) {
    let keys = [];
    let currentKeys = Object.keys(parsedContent);
    
    for (let i = 0; i < currentKeys.length; i++) {
        let key = currentKeys[i];
        
        if (typeof parsedContent[key] === 'string') {
            keys.push(key);
        }

        if (typeof parsedContent[key] === 'object') {
            let nestedKeys = getNestedKeysFromObject(parsedContent[key], key);

            for (let j = 0; j < nestedKeys.length; j++) {
                keys.push(nestedKeys[j]);
            }
        }
    }

    return keys;
}

// Get array of keys from given JSON object, prefixed by key
function getNestedKeysFromObject (objectToCheck, prefixKey) {
    let keys = [];
    let objectKeys = Object.keys(objectToCheck);

    for (let i = 0; i < objectKeys.length; i++) {
        let key = objectKeys[i];

        if (typeof objectToCheck[key] === 'string') {
            keys.push([prefixKey, key].join('.'));
        }

        if (typeof objectToCheck[key] === 'object') {
            let keysToAdd = getNestedKeysFromObject(objectToCheck[key], [prefixKey, key].join('.'));

            for (let j = 0; j < keysToAdd.length; j++) {
                keys.push(keysToAdd[j]);
            }
        }
    }

    return keys;
}

// Compare language files for finding missing translations
function findMissingKeys (fileToCompare, originalFile) {
    let results = [];
    let keysOriginal = getAllKeysFromFile(originalFile);
    let keysToCompare = getAllKeysFromFile(fileToCompare);

    for (let i = 0; i < keysOriginal.length; i++) {
        let keyToCheck = keysOriginal[i];
        
        if (keysToCompare.indexOf(keyToCheck) === -1) {
            results.push({
                key: keyToCheck,
                value: findTranslation(originalFile, keyToCheck)
            });
        }
    }

    return results;
}

// Compare language files for translations which does not exist in the original file
function findUnnecessaryKeys (fileToCompare, originalFile) {
    let results = [];
    let keysOriginal = getAllKeysFromFile(originalFile);
    let keysToCompare = getAllKeysFromFile(fileToCompare);

    for (let i = 0; i < keysToCompare.length; i++) {
        let keyToCheck = keysToCompare[i];
        
        if (keysOriginal.indexOf(keyToCheck) === -1) {
            results.push({
                key: keyToCheck,
                value: findTranslation(fileToCompare, keyToCheck)
            });
        }
    }

    return results;
}

// Return translation or object for given key
function findTranslation (fileObject, keyToFind) {
    let keys = keyToFind.split('.');
    let result = fileObject[keys[0]];

    for (let i = 1; i < keys.length; i++) {
        result = result[keys[i]];
    }

    return result;
}

