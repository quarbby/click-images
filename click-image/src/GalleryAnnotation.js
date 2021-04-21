import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import { Button, Grid, Table, TableRow, TableBody, TableCell, Select, Tab } from '@material-ui/core';


class GalleryAnnotation extends Component {
    // N1 R1 C1 are secondimg
    // N2 R2 C2 are xlxmert
    // N3 R3 C3 are attngan

    state = {
        index: 0,
        NState: [1,2,3],
        RState: [1,2,3],
        CState: [1,2,3],
        caption: 'this is a test caption',
        firstimg: 'orange.jpg',
        xlxmertimg: 'orange.jpg',
        attnganimg: 'orange.jpg',
        secondimg: 'orange.jpg',
        fulldata: []
    }

    renderPage() {
        this.setState(state => ({ ...this.state}));
    }

    async componentDidMount(){
        const response = await axios.post('http://localhost:5000/get_data')
        this.state.fulldata = response.data['data']

        this.state.caption = this.state.fulldata[this.state.index]['caption']
        this.state.firstimg = this.state.fulldata[this.state.index]['firstimg']
        this.state.xlxmertimg = this.state.fulldata[this.state.index]['xlxmertimg']
        this.state.attnganimg = this.state.fulldata[this.state.index]['attnganimg']
        this.state.secondimg = this.state.fulldata[this.state.index]['secondimg']

        console.log(this.state)
        this.renderPage();
    }

    handleN1Change = (event) => {
        this.state.NState[parseInt(event.target.name)] = event.target.value;
    };

    handleR1Change = (event) => {
        this.state.RState[parseInt(event.target.name)] = event.target.value;
    };

    handleC1Change = (event) => {
        this.state.CState[parseInt(event.target.name)] = event.target.value;
    };

    buttonClickHandler = () => {
        let dataToSend = this.state;
        delete dataToSend['fulldata'];
        delete dataToSend['index']
        console.log(dataToSend)
        axios.post('http://localhost:5000/send_data', dataToSend).then(res => {
            console.log(res.data);
            this.state.index += 1;

            this.state.caption = this.state.fulldata[this.state.index]['caption']
            this.state.firstimg = this.state.fulldata[this.state.index]['firstimg']
            this.state.xlxmertimg = this.state.fulldata[this.state.index]['xlxmertimg']
            this.state.attnganimg = this.state.fulldata[this.state.index]['attnganimg']
            this.state.secondimg = this.state.fulldata[this.state.index]['secondimg']
        });
    }

    render(){
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
                                    <TableCell>{this.state.caption}</TableCell>
                                    <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.firstimg}/> </TableCell>
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
                                    <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.secondimg} /></TableCell>
                                    <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.xlxmertimg} /></TableCell>
                                    <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.attnganimg} /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Naturalness: </b>How natural is the image?</TableCell>
                                    <TableCell> 
                                        <Select native value={1} onChange={this.handleN1Change} name={'1'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>
                                    <TableCell> 
                                        <Select native value={2} onChange={this.handleN1Change} name={'2'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>
                                    <TableCell> 
                                        <Select native value={3} onChange={this.handleN1Change} name={'3'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>                           
                                </TableRow>      
                                <TableRow>
                                    <TableCell><b>Relevance: </b>How relevant is the image?</TableCell>
                                    <TableCell> 
                                        <Select native value={1} onChange={this.handleR1Change} name={'1'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>
                                    <TableCell> 
                                        <Select native value={2} onChange={this.handleR1Change} name={'2'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>
                                    <TableCell> 
                                        <Select native value={3} onChange={this.handleR1Change} name={'3'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>                           
                                </TableRow>  
                                <TableRow>
                                    <TableCell><b>Relevance: </b>How correct is the image?</TableCell>
                                    <TableCell> 
                                        <Select native value={1} onChange={this.handleC1Change} name={'1'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>
                                    <TableCell> 
                                        <Select native value={2} onChange={this.handleC1Change} name={'2'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>
                                    <TableCell> 
                                        <Select native value={3} onChange={this.handleC1Change} name={'3'}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option></Select>
                                    </TableCell>                           
                                </TableRow>  
                            </TableBody>
                        </Table>
                    </Grid>
    
                    <Grid container item xs={12} justify='center' alignItems='center'>
                        <Button variant='outlined' style={{ margin: '0 1vw' }} onClick={() => this.buttonClickHandler()}>Submit</Button>
                    </Grid>
                </Grid>
    
    
            </div>
        )
    }

}

export default GalleryAnnotation