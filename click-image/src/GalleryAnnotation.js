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
        NState: [1,2,3],
        RState: [1,2,3],
        CState: [1,2,3],
        caption: 'this is a test caption',
        firstimg: 'orange.jpg',
        dfganimg: 'orange.jpg',
        dfganbaselineimg: 'orange.jpg',
        secondimg: 'orange.jpg',
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
        //this.state.fulldata = response.data['data']

        this.setState({fulldata: response.data['data']});
        this.setState({caption: this.state.fulldata[this.state.index]['caption']});
        this.setState({firstimg: this.state.fulldata[this.state.index]['firstimg']});
        this.setState({dfganimg: this.state.fulldata[this.state.index]['dfganimg']});
        this.setState({dfganbaselineimg: this.state.fulldata[this.state.index]['dfganbaselineimg']});
        this.setState({secondimg: this.state.fulldata[this.state.index]['secondimg']});

        //this.state.caption = this.state.fulldata[this.state.index]['caption']
        // this.state.firstimg = this.state.fulldata[this.state.index]['firstimg']
        // this.state.dfganimg = this.state.fulldata[this.state.index]['dfganimg']
        // this.state.dfganbaselineimg = this.state.fulldata[this.state.index]['dfganbaselineimg']
        // this.state.secondimg = this.state.fulldata[this.state.index]['secondimg']

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

    async buttonClickHandler() {
        let dataToSend = {};
        dataToSend['NState'] = this.state.NState;
        dataToSend['RState'] = this.state.RState;
        dataToSend['CState'] = this.state.CState;
        dataToSend['caption'] = this.state.caption;
        dataToSend['firstimg'] = this.state.firstimg;
        dataToSend['dfganimg'] = this.state.dfganimg;
        dataToSend['dfganbaselineimg'] = this.state.dfganbaselineimg;
        dataToSend['secondimg'] = this.state.secondimg;
        dataToSend['yeschecked'] = this.state.yeschecked;
        dataToSend['nochecked'] = this.state.nochecked;

        const response = await axios.post('http://localhost:5000/send_data', dataToSend)
        this.setState({index: this.state.index + 1});

        if (this.state.index == this.state.fulldata.length) {
            this.setState({endData: true})
            // alert('That\'s all there is! Thank you for helping!')
        }
        else {
            this.setState({caption: this.state.fulldata[this.state.index]['caption']});
            this.setState({firstimg: this.state.fulldata[this.state.index]['firstimg']});
            this.setState({dfganimg: this.state.fulldata[this.state.index]['dfganimg']});
            this.setState({dfganbaselineimg: this.state.fulldata[this.state.index]['dfganbaselineimg']});
            this.setState({secondimg: this.state.fulldata[this.state.index]['secondimg']});
            this.setState({yeschecked: false});
            this.setState({nochecked: false});

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
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.secondimg} /></TableCell>
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.dfganimg} /></TableCell>
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.dfganbaselineimg} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Naturalness: </b>How natural is the image?</TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleN1Change} name={'1'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleN1Change} name={'2'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleN1Change} name={'3'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>                           
                                        </TableRow>      
                                        <TableRow>
                                            <TableCell><b>Relevance: </b>How relevant is the image?</TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleR1Change} name={'1'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleR1Change} name={'2'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleR1Change} name={'3'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>                           
                                        </TableRow>  
                                        <TableRow>
                                            <TableCell><b>Correctness: </b>How correct is the image?</TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleC1Change} name={'1'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleC1Change} name={'2'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
                                            </TableCell>
                                            <TableCell> 
                                                <Select native onChange={this.handleC1Change} name={'3'}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option></Select>
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