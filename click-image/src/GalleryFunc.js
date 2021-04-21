import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';

const GalleryFunc = () => {
    // let buttonList
    const [iButtonLabels, setIButtonLabels] = useState([])
    const [tButtonLabels, setTButtonLabels] = useState([])
    const [imgList, setImgList] = useState([])
    const [imgDir, setImgDir] = useState([])
    const [textList, setTextList] = useState([])
    const [textDir, setTextDir] = useState([])
    const [imgElab, setImgElab] = useState([])
    const [textElab, setTextElab] = useState([])
    const [imgIndex, setImgIndex] = useState(0)
    const [textIndex, setTextIndex] = useState(0)
    const [imgOrText, setImgOrText] = useState(false) //False = Image, True = Text
    useEffect(() => {
        axios.post(`http://localhost:5000/get_data`, {}).then(res => {
            // console.log(res.data.image_labels)

            setIButtonLabels(res.data.image_labels.map(imgLabelObj => imgLabelObj.labelname))
            setTButtonLabels(res.data.text_labels.map(textLabelObj => textLabelObj.labelname))
            setImgList(res.data.image_files)
            setImgDir(res.data.image_dir)
            setTextList(res.data.text_files)
            setTextDir(res.data.text_dir)
            setImgElab(res.data.image_labels)
            setTextElab(res.data.text_labels)
        })

    }, []);

    function buttonClickHandler(name) {
        if (imgOrText) {
            axios.post(`http://localhost:5000/grab_data`, {
                'filename': textDir[textIndex],
                'label': name
            }).then()
            let nextVal = (textIndex + 1) % textList.length
            setTextIndex(nextVal)
            console.log(textDir[textIndex])
            console.log(name)
        }
        else {
            axios.post(`http://localhost:5000/grab_data`, {
                'filename': imgDir[imgIndex],
                'label': name
            }).then()
            let nextVal = (imgIndex + 1) % imgList.length
            setImgIndex(nextVal)
            console.log(imgDir[imgIndex])
            console.log(name)
        }

    }
    function imgOrTextHandler() {

        setImgOrText(!imgOrText)
    }

    const iButtonList = iButtonLabels.map(name => <Button variant='outlined' style={{ margin: '0 1vw' }} onClick={() => buttonClickHandler(name)}>{name}</Button>)
    const tButtonList = tButtonLabels.map(name => <Button variant='outlined' style={{ margin: '0 1vw' }} onClick={() => buttonClickHandler(name)}>{name}</Button>)

    const elabList = imgOrText ? textElab : imgElab
    const elabListHTML = elabList.map((item) =>
        <li key={item.labelname}><b>{item.labelname}: </b> {item.description}</li>
    );

    return (
        <div>
            <Grid container spacing={2} justify='center' style={{ width: '100%' }}>
                <Grid item xs={12} container justify='center'>
                    <Button variant='outlined' onClick={imgOrTextHandler}>{imgOrText ? "Switch to Image" : "Switch to Text"}</Button>
                </Grid>
                <Grid item xs={12} lg={6} container justify='center'>
                    {imgOrText ? textList[textIndex] : <img style={{ border: '1px solid black' }} src={`data:image/jpeg;base64,${imgList[imgIndex]}`} />}
                </Grid>
                <Grid container item xs={12} lg={6} justify='center' alignItems='center'>
                    {imgOrText ? tButtonList : iButtonList}
                    <ul>{elabListHTML}</ul>
                </Grid>
            </Grid>
            {/* <img src={white} /> */}


        </div>
    )
}

export default GalleryFunc