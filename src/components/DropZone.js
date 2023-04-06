import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone(props) {
    const onDrop = useCallback(acceptedFiles => {
        var acceptedFile = acceptedFiles[0]
        var drpzone = document.getElementById('dd');
        drpzone.classList.remove('active');

        const reader = new FileReader();
        reader.readAsDataURL(acceptedFile);

        reader.addEventListener('loadend', () => {

            const img = document.createElement('img');
            var preview = URL.createObjectURL(acceptedFile)
            img.src = preview;
            img.id = 'newimg';
            // var width = document.getElementById('dd').getAttribute.width
            //img.setAttribute('style', 'width: 19vw; , height: 29vh')
            while (drpzone.firstChild) {
                drpzone.firstChild.remove()
            }
            drpzone.append(img);

            props.SetUrl(reader)
        });

    }, [])
    const onDragEnter = () => {
        var doc = document.getElementById('dd');
        doc.classList.add('active');
    }
    const onDragOver = () => {
        var doc = document.getElementById('dd');
        doc.classList.add('active');
    }

    const onDragLeave = () => {
        var doc = document.getElementById('dd');
        doc.classList.remove('active');
    }

    const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({ accept: { 'image/*': [] }, onDrop, onDragEnter, onDragLeave, onDragOver })
    return (
        <div {...getRootProps()}>
            <input name='imagefile' id='drpzne' {...getInputProps()} />
            {
                <div id="dd">
                <div className='text-div'>

                    {isDragActive ? <h1>Drop Here</h1> :
                        <p>Drag 'n' drop some files here, or click to select files</p>}
                </div>
            </div>
            }
        </div >
    )
}
export default MyDropzone

