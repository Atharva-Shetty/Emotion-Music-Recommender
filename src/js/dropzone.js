const dropzone = document.getElementById('dd');
if (dropzone) {


    dropzone.addEventListener('dragenter', event => {
        event.preventDefault();
        dropzone.classList.add('active');
    });
    dropzone.addEventListener('dragleave', event => {
        event.preventDefault();
        dropzone.classList.remove('active');
    });
    dropzone.addEventListener('dragover', event => {
        event.preventDefault();
    });
    dropzone.addEventListener('drop', event => {
        event.preventDefault();
        dropzone.classList.remove('active');

        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
            const img = document.createElement('img');
            img.src = reader.result;
            dropzone.append(img);
        });
    });
}