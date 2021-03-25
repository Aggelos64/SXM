/*'<span class="pip">' +
'<img class="imageThumb border border-primary" src="' +
e.target.result +
'" title="' +
file.name +
'"/>' +
'<br/><span class="remove border border-info">Αφαίρεση</span>' +
"</span>"*/
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
);

FilePond.setOptions({
    labelIdle: 'Σύρε ή <span class="filepond--label-action">Ψάξε τις εικόνες. </span>'
})

FilePond.parse(document.body);