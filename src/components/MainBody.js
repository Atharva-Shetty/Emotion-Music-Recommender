import React, { useRef, useState, useEffect } from 'react'
import NET from 'vanta/dist/vanta.waves.min'
import * as THREE from 'three'
import '../css/style.css'
import '../css/app.css'
import LoaderTask from './LoaderTask'
import { useDropzone } from 'react-dropzone'
import MyDropzone from './DropZone'
import Table from './Table'

function MainBody() {
    const [Data, setData] = useState({ 'song_name': { '0': 'Skechers', '1': 'Dior', '2': 'El Efecto', '3': 'Tell Me U Luv Me (with Trippie Redd)', '4': 'Level of Concern', '5': 'ROXANNE', '6': 'bad guy', '7': 'I,m Ready (with Demi Lovato)', '8': 'Robbery', '9': 'PORFA' }, 'artists': { '0': "['DripReport']", '1': "['Pop Smoke']", '2': "['Rauw Alejandro', 'Chencho Corleone']", '3': "['Juice WRLD', 'Trippie Redd']", '4': "['Twenty One Pilots']", '5': "['Arizona Zervas']", '6': "['Billie Eilish']", '7': "['Sam Smith', 'Demi Lovato']", '8': "['Juice WRLD']", '9': "['Feid', 'Justin Quiles']" }, 'label': 'Happy' })

    const [vantaEffect, setVantaEffect] = useState(null)
    const [TaskLoader, setTaskLoader] = useState(false)
    const [urlimg, setUrlimg] = useState(null)
    const [tableLoaded, settableLoaded] = useState(false)
    const [acceptedFile, setacceptedFile] = useState(null)

    var ref = useRef(null);

    const setREF = (ee) => {
        ref = ee
    }

    const showTaskLoader = () => {
        setTaskLoader(true)
        settableLoaded(false)
    }
    var url = "http://127.0.0.1:5000"
    const imgSetterTest = () => {
        var accepFile = require('../Music-Backend/emotion_image/test.jpg')
        var drpzone = document.getElementById('sd');
        drpzone.classList.remove('active');

        //const reader = new FileReader();
        //reader.readAsDataURL(accepFile);
        //console.log(reader);

        //reader.addEventListener('loadend', () => {

        const img = document.createElement('img');
        // var preview = URL.createObjectURL(accepFile)
        img.src = accepFile;
        img.id = 'newimg';
        // var width = document.getElementById('dd').getAttribute.width
        //img.setAttribute('style', 'width: 19vw; , height: 29vh')
        while (drpzone.firstChild) {
            drpzone.firstChild.remove()
        }
        drpzone.append(img);
        //});
    }
    const fseturl = (url) => {

        var doc = document.getElementsByTagName('Input')
        console.log("my  file");
        console.log(doc);
        setacceptedFile(url)
        setUrlimg(url);
    }
    const predictHandle = async () => {
        showTaskLoader()
        await SendData();
    }
    const SendData = async () => {

        var formData = new FormData();
        formData.append('imagefile', acceptedFile)

        console.log(formData['imagefile']);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        // var js = {"imagefile":acceptedFile.result}
        console.log(acceptedFile);

        try {


            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: acceptedFile.result,
            });

            console.log(response);

            const uploadedImage = await response.json();

            console.log(uploadedImage);
            if (uploadedImage) {
                console.log("Successfully uploaded image");
                setData(uploadedImage);
               
                setTimeout(() => {

                    setTaskLoader(false);
                    settableLoaded(true);
                    imgSetterTest();
                }, 1500 );

            } else {
                console.log("Error Found");
            }

        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log('There was a SyntaxError', error);
            } else {
                console.log('There was an error', error);
            }
        }
    }


    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                THREE, el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x030505,
                shininess: 58.00,
                waveSpeed: 0.80,
                zoom: 1.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return (
        <>
            <div ref={myRef} id="MainBack">
                <div className="container">
                    <MyDropzone SetUrl={fseturl} refer={setREF} />
                    <div className="btn"><input type='button' onClick={predictHandle} className="a" value="Start Prediction" /></div>
                    <div id="sd">
                        <h2>Matched Image</h2>
                    </div></div>
                <div>
                    {tableLoaded && <h1 className='cnt'>{Data.label}</h1>}
                    {tableLoaded && <Table key={tableLoaded} data={Data} state={tableLoaded} />}
                </div>
            </div>
            {TaskLoader && <LoaderTask />}
        </>
    )
}

export default MainBody