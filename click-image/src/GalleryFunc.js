import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Table, TableRow, TableBody, TableCell, Select, Tab } from '@material-ui/core';

const GalleryFunc = () => {
    const [imgList, setImgList] = useState([])
    const [imgDir, setImgDir] = useState([])
    const [imgElab, setImgElab] = useState([])
    const [imgIndex, setImgIndex] = useState(0)

    const [NStates, setNStates] = useState([])
    const [RStates, setRStates] = useState([])
    const [CStates, setCStates] = useState([])

    useEffect(() => {
        axios.post(`http://localhost:5000/get_data`, {}).then(res => {
            // console.log(res.data.image_labels)

            setImgList(res.data.image_files)
            setImgDir(res.data.image_dir)
            setImgElab(res.data.image_labels)
        })

    }, []);

    function buttonClickHandler(name) {
        axios.post(`http://localhost:5000/grab_data`, {
            'filename': imgDir[imgIndex],
            'label': name
        }).then()
        let nextVal = (imgIndex + 1) % imgList.length
        setImgIndex(nextVal)
        console.log(imgDir[imgIndex])
        console.log(name)
    }

    const handleN1Change = (event) => {
        setNStates[event.target.name] = event.target.value;
    };

    const handleR1Change = (event) => {
        setRStates[event.target.name] = event.target.value;
    };

    const handleC1Change = (event) => {
        setCStates[event.target.name] = event.target.value;
    };

    return (
        <div>
            <Grid item xs={12} container justify='center'>
                <b>Evaluation Task: </b> <br></br>
                Please rate each image from 1 to 3 on the metric provided, where 3 is the best and 1 is worst.
            </Grid>

            <Grid container spacing={2} justify='center' style={{ width: '100%' }}>
                <Grid item xs={12} container justify='center'>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><b>Caption</b></TableCell>
                                <TableCell><b>First Image</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Caption Test</TableCell>
                                <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={`data:image/jpeg;base64,${imgList[0]}`}/> </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} container justify='center'>
                    <b>Generated Images</b>
                </Grid>

                <Grid item xs={12} container justify='center'>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={`data:image/jpeg;base64,${imgList[0]}`} /></TableCell>
                                <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={`data:image/jpeg;base64,${imgList[0]}`} /></TableCell>
                                <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={`data:image/jpeg;base64,${imgList[0]}`} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Naturalness: </b>How natural is the image?</TableCell>
                                <TableCell> 
                                    <Select native value={1} onChange={handleN1Change} name={1}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>
                                <TableCell> 
                                    <Select native value={2} onChange={handleN1Change} name={2}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>
                                <TableCell> 
                                    <Select native value={3} onChange={handleN1Change} name={3}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>                           
                            </TableRow>      
                            <TableRow>
                                <TableCell><b>Relevance: </b>How relevant is the image?</TableCell>
                                <TableCell> 
                                    <Select native value={1} onChange={handleR1Change} name={1}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>
                                <TableCell> 
                                    <Select native value={2} onChange={handleR1Change} name={2}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>
                                <TableCell> 
                                    <Select native value={3} onChange={handleR1Change} name={3}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>                           
                            </TableRow>  
                            <TableRow>
                                <TableCell><b>Relevance: </b>How correct is the image?</TableCell>
                                <TableCell> 
                                    <Select native value={1} onChange={handleC1Change} name={1}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>
                                <TableCell> 
                                    <Select native value={3} onChange={handleC1Change} name={2}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>
                                <TableCell> 
                                    <Select native value={3} onChange={handleC1Change} name={3}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option></Select>
                                </TableCell>                           
                            </TableRow>  
                        </TableBody>
                    </Table>
                </Grid>

                <Grid container item xs={12} justify='center' alignItems='center'>
                    <Button variant='outlined' style={{ margin: '0 1vw' }} onClick={() => buttonClickHandler()}>Submit</Button>
                </Grid>
            </Grid>


        </div>
    )
}

export default GalleryFunc