// compare uploaded file with selected version
function compareFiles () {
    renderResults();
}

// render results of comparision
function renderResults () {
    renderMissingTranslations();
    renderUnnecessaryTranslations();
}

// render missing translations lists
function renderMissingTranslations () {
    let missingTranslations = findMissingKeys(window.appState.fileToCompare, window.appState.fileOriginal);
    let outputHTML = '<header class="result-header"><h2>Missing translations (' + missingTranslations.length + ')</h2><div>Key</div><div>Original translation</div></header>';
    let resultsWrapper = document.querySelector('.results-ui-missing-translations');

    if (!missingTranslations.length) {
        outputHTML += '<p class="is-ok">Uploaded file contains all necessary translation keys 👍</p>';
        resultsWrapper.innerHTML = outputHTML;
        return;
    }

    resultsWrapper.innerHTML = outputHTML;

    for (let i = 0; i < missingTranslations.length; i++) {
        let resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = '';
        let resultItemKey = document.createElement('div');
        resultItemKey.classList.add('result-item-row');
        resultItemKey.innerText = missingTranslations[i].key;
        let resultItemValue = document.createElement('div');
        resultItemValue.classList.add('result-item-row');
        resultItemValue.innerText = missingTranslations[i].value;
        resultItem.appendChild(resultItemKey);
        resultItem.appendChild(resultItemValue);
        resultsWrapper.appendChild(resultItem);
    }
}

// render unnecessary translations list
function renderUnnecessaryTranslations () {
    let unnecessaryTranslations = findUnnecessaryKeys(window.appState.fileToCompare, window.appState.fileOriginal);
    let outputHTML = '<header class="result-header"><h2>Unnecessary translations (' + unnecessaryTranslations.length + ')</h2><div>Key</div><div >Uploaded translation</div></header>';
    let resultsWrapper = document.querySelector('.results-ui-unnecessary-translations');

    if (!unnecessaryTranslations.length) {
        outputHTML += '<p class="is-ok">Uploaded file does not contain unnecessary translation keys 👍</p>';
        resultsWrapper.innerHTML = outputHTML;
        return;
    }

    resultsWrapper.innerHTML = outputHTML;

    for (let i = 0; i < unnecessaryTranslations.length; i++) {
        let resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = '';
        let resultItemKey = document.createElement('div');
        resultItemKey.classList.add('result-item-row');
        resultItemKey.innerText = unnecessaryTranslations[i].key;
        let resultItemValue = document.createElement('div');
        resultItemValue.classList.add('result-item-row');
        resultItemValue.innerText = unnecessaryTranslations[i].value;
        resultItem.appendChild(resultItemKey);
        resultItem.appendChild(resultItemValue);
        resultsWrapper.appendChild(resultItem);
    }
}
