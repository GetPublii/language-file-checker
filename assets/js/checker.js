window.appState = {
    fileToCompare: null,
    fileOriginal: null
};

document.querySelector('#compare-files').addEventListener('click', e => {
    e.preventDefault();
    let fileToCompare = document.querySelector('#file-to-check');
    let fileOriginal = document.querySelector('#file-to-compare');

    if (!fileToCompare.value) {
        alert('Please select file to check');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) =>  {
        if (!validateJSON(event.target.result)) {
            alert('Uploaded file is not a valid JSON file. Please try again');
            return;
        }

        window.appState.fileToCompare = JSON.parse(event.target.result);
        window.appState.fileOriginal = window[fileOriginal.value];
        compareFiles();
    };
    reader.readAsText(fileToCompare.files[0]);
}, false);