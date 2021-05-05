import React, { Component } from 'react';
import axios from 'axios';
import { Button, Grid, Table, TableRow, TableBody, TableCell, Select, Checkbox } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

class GalleryAnnotation extends Component {
    // N1 R1 C1 are secondimg
    // N2 R2 C2 are dfgangenerated
    // N3 R3 C3 are dfganbaseline

    state = {
        index: 0,
        NStateyes: false,
        NStateno: false,
        RStateyes: false,
        RStateno: false,
        CStateyes: false,
        CStateno: false,
        caption: 'this is a test caption',
        imgname: 'test',
        imgtype: 'dfganimg',
        fulldata: [],
        yeschecked: false,
        nochecked: false,
        endData: false
    }

    renderPage() {
        this.setState(state => ({ ...this.state}));
    }

    async componentDidMount(){
        const response = await axios.post('http://localhost:5000/get_data')
        this.setState({fulldata: response.data['data']});

        this.setState({caption: this.state.fulldata[this.state.index]['caption']});
        this.setState({firstimg: this.state.fulldata[this.state.index]['firstimg']});
        this.setState({imgtype: this.state.fulldata[this.state.index]['imgtype']})
        this.setState({imgname: this.state.fulldata[this.state.index]['imgname']})

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

    handleyescheckChange = (event) => {
        this.setState({yeschecked: event.target.checked});
        this.setState({nochecked: !event.target.checked});
    }

    handlenocheckChange = (event) => {
        this.setState({nochecked: event.target.checked});
        this.setState({yeschecked: !event.target.checked});
    }

    handlenstateyescheckChange = (event) => {
        this.setState({NStateyes: event.target.checked});
        this.setState({NStateno: !event.target.checked});
    }

    handlenstatenocheckChange = (event) => {
        this.setState({NStateno: event.target.checked});
        this.setState({NStateyes: !event.target.checked});  
    }

    handlerstateyescheckChange = (event) => {
        this.setState({RStateyes: event.target.checked});
        this.setState({RStateno: !event.target.checked});  
    }

    handlerstatenocheckChange = (event) => {
        this.setState({RStateno: event.target.checked});
        this.setState({RStateyes: !event.target.checked});     
    }

    handlecstateyescheckChange = (event) => {
        this.setState({CStateyes: event.target.checked});
        this.setState({CStateno: !event.target.checked});  
    }

    handlecstatenocheckChange = (event) => {
        this.setState({CStateno: event.target.checked});
        this.setState({CStateyes: !event.target.checked});    
    }

    async buttonClickHandler() {
        let dataToSend = {};
        dataToSend['NState'] = this.state.NStateyes;
        dataToSend['RState'] = this.state.RStateyes;
        dataToSend['CState'] = this.state.CStateyes;
        dataToSend['caption'] = this.state.caption;
        dataToSend['imgname'] = this.state.imgname;
        dataToSend['imgtype'] = this.state.imgtype;
        dataToSend['firstimg'] = this.state.firstimg
        dataToSend['yeschecked'] = this.state.yeschecked;

        const response = await axios.post('http://localhost:5000/send_data', dataToSend)
        this.setState({index: this.state.index + 1});

        if (this.state.index == this.state.fulldata.length) {
            this.setState({endData: true})
            // alert('That\'s all there is! Thank you for helping!')
        }
        else {
            this.setState({caption: this.state.fulldata[this.state.index]['caption']});
            this.setState({firstimg: this.state.fulldata[this.state.index]['firstimg']});
            this.setState({imgtype: this.state.fulldata[this.state.index]['imgtype']});
            this.setState({imgname: this.state.fulldata[this.state.index]['imgname']});
            this.setState({yeschecked: false});
            this.setState({nochecked: false});

            const newitems = false
            this.setState({NStateyes: newitems});
            this.setState({NStateno: newitems});
            this.setState({RStateyes: newitems});
            this.setState({RStateno: newitems});
            this.setState({CStateyes: newitems});
            this.setState({CStateno: newitems});

            this.renderPage();
        }

    }

    render(){
        return (
            <div>
                {
                this.state.endData == true? (
                    <Grid item xs={12} container justify='center'>
                        <Alert name='alert' display='none'>That's All! Thank you for helping evaluate the images</Alert>
                    </Grid>
                ) : (
                <div>
                    <Grid item xs={12} container justify='center'>
                        <b>Evaluation Task:</b> 
                        Please rate how much each image satisfies the caption from 1 to 3 on the metric provided, where 3 is the best and 1 is worst.
                    </Grid> 
        
                    <Grid container spacing={2} justify='center' style={{ width: '100%' }}>
                        <Grid item xs={12} container justify='center'>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><b>Caption</b></TableCell>
                                        <TableCell><b>First Image/ Left Image</b></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{this.state.caption}</TableCell>
                                        <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.firstimg}/> </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Does the First Image statisfy the caption? </TableCell>
                                        <TableCell>YES<Checkbox checked={this.state.yeschecked} onChange={this.handleyescheckChange} checked={this.state.yeschecked} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                        NO<Checkbox checked={this.state.nochecked} onChange={this.handlenocheckChange} checked={this.state.nochecked} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid name='generatedimg-grid'>
                        {
                            this.state.nochecked == true? (
                                <div>
                                    <Grid item xs={12} container justify='center'>
                                        <b>Generated Images/ Right Images</b>
                                    </Grid>
                                    <Grid item xs={12} container justify='center'>
                                        <Table>
                                            <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.imgname} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Naturalness: </b>Is this image Natural?</TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.NStateyes[0]} onChange={(e) => this.handlenstateyescheckChange(e)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.NStateno[0]} onChange={(e) => this.handlenstatenocheckChange(e)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>                      
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Relevance: </b>Is the image Relevant to the caption?</TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.RStateyes[0]} onChange={(e) => this.handlerstateyescheckChange(e)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.RStateno[0]} onChange={(e) => this.handlerstatenocheckChange(e)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>                 
                                        </TableRow>  
                                        <TableRow>
                                            <TableCell><b>Correctness: </b>Is the image Correct?</TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.CStateyes[0]} onChange={(e) => this.handlecstateyescheckChange(e)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.CStateno[0]} onChange={(e) => this.handlecstatenocheckChange(e)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>                   
                                        </TableRow>  
                                    </TableBody>
                                </Table>
                                    </Grid>
                                </div>


                            ) : (<Grid item xs={12} container justify='center'> </Grid>)
                        }

                        </Grid>
        
                        <Grid container item xs={12} justify='center' alignItems='center'>
                            <Button variant='outlined' style={{ margin: '0 1vw' }} onClick={() => this.buttonClickHandler()}>Submit</Button>
                        </Grid>
                    </Grid>
                </div>
                )
                }
    
            </div>
        )
    }

}

export default GalleryAnnotation