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
        NStateyes: [false,false,false],
        NStateno: [false,false,false],
        RStateyes: [false,false,false],
        RStateno: [false,false,false],
        CStateyes: [false,false,false],
        CStateno: [false,false,false],
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
        this.setState({fulldata: response.data['data']});

        this.setState({caption: this.state.fulldata[this.state.index]['caption']});
        this.setState({firstimg: this.state.fulldata[this.state.index]['firstimg']});
        this.setState({dfganimg: this.state.fulldata[this.state.index]['dfganimg']});
        this.setState({dfganbaselineimg: this.state.fulldata[this.state.index]['dfganbaselineimg']});
        this.setState({secondimg: this.state.fulldata[this.state.index]['secondimg']});

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

    handlenstateyescheckChange = (e, val) => {
        const yesItems = [...this.state.NStateyes];
        yesItems[val] = e.target.checked;
        this.setState({ NStateyes: yesItems });

        const noItems = [...this.state.NStateno];
        noItems[val] = !e.target.checked;
        this.setState({ NStateno: noItems });
    }

    handlenstatenocheckChange = (e, val) => {
        const yesItems = [...this.state.NStateyes];
        yesItems[val] = !e.target.checked;
        this.setState({ NStateyes: yesItems });

        const noItems = [...this.state.NStateno];
        noItems[val] = e.target.checked;
        this.setState({ NStateno: noItems });    
    }

    handlerstateyescheckChange = (e, val) => {
        const yesItems = [...this.state.RStateyes];
        yesItems[val] = e.target.checked;
        this.setState({ RStateyes: yesItems });

        const noItems = [...this.state.RStateno];
        noItems[val] = !e.target.checked;
        this.setState({ RStateno: noItems });
    }

    handlerstatenocheckChange = (e, val) => {
        const yesItems = [...this.state.RStateyes];
        yesItems[val] = !e.target.checked;
        this.setState({ RStateyes: yesItems });

        const noItems = [...this.state.RStateno];
        noItems[val] = e.target.checked;
        this.setState({ RStateno: noItems });    
    }

    handlecstateyescheckChange = (e, val) => {
        const yesItems = [...this.state.CStateyes];
        yesItems[val] = e.target.checked;
        this.setState({ CStateyes: yesItems });

        const noItems = [...this.state.CStateno];
        noItems[val] = !e.target.checked;
        this.setState({ CStateno: noItems });
    }

    handlecstatenocheckChange = (e, val) => {
        const yesItems = [...this.state.CStateyes];
        yesItems[val] = !e.target.checked;
        this.setState({ CStateyes: yesItems });

        const noItems = [...this.state.CStateno];
        noItems[val] = e.target.checked;
        this.setState({ CStateno: noItems });    
    }

    async buttonClickHandler() {
        let dataToSend = {};
        dataToSend['NState'] = this.state.NStateyes;
        dataToSend['RState'] = this.state.RStateyes;
        dataToSend['CState'] = this.state.CStateyes;
        dataToSend['caption'] = this.state.caption;
        dataToSend['firstimg'] = this.state.firstimg;
        dataToSend['dfganimg'] = this.state.dfganimg;
        dataToSend['dfganbaselineimg'] = this.state.dfganbaselineimg;
        dataToSend['secondimg'] = this.state.secondimg;
        dataToSend['yeschecked'] = this.state.yeschecked;
        // dataToSend['nochecked'] = this.state.nochecked;

        console.log(dataToSend)

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

            const newitems = [false, false, false]
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
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.secondimg} /></TableCell>
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.dfganimg} /></TableCell>
                                            <TableCell><img style={{border: '1px solid black', width:200, height:200}} src={'http://localhost:8000/' + this.state.dfganbaselineimg} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Naturalness: </b>Is this image Natural?</TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.NStateyes[0]} onChange={(e,val) => this.handlenstateyescheckChange(e,0)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.NStateno[0]} onChange={(e,val) => this.handlenstatenocheckChange(e,0)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.NStateyes[1]} onChange={(e,val) => this.handlenstateyescheckChange(e,1)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.NStateno[1]} onChange={(e,val) => this.handlenstatenocheckChange(e,1)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.NStateyes[2]} onChange={(e,val) => this.handlenstateyescheckChange(e,2)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.NStateno[2]} onChange={(e,val) => this.handlenstatenocheckChange(e,2)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>                       
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Relevance: </b>Is the image Relevant to the caption?</TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.RStateyes[0]} onChange={(e,val) => this.handlerstateyescheckChange(e,0)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.RStateno[0]} onChange={(e,val) => this.handlerstatenocheckChange(e,0)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.RStateyes[1]} onChange={(e,val) => this.handlerstateyescheckChange(e,1)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.RStateno[1]} onChange={(e,val) => this.handlerstatenocheckChange(e,1)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.RStateyes[2]} onChange={(e,val) => this.handlerstateyescheckChange(e,2)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.RStateno[2]} onChange={(e,val) => this.handlerstatenocheckChange(e,2)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>                   
                                        </TableRow>  
                                        <TableRow>
                                            <TableCell><b>Correctness: </b>Is the image Correct?</TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.CStateyes[0]} onChange={(e,val) => this.handlecstateyescheckChange(e,0)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.CStateno[0]} onChange={(e,val) => this.handlecstatenocheckChange(e,0)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.CStateyes[1]} onChange={(e,val) => this.handlecstateyescheckChange(e,1)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.CStateno[1]} onChange={(e,val) => this.handlecstatenocheckChange(e,1)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            </TableCell>
                                            <TableCell>YES<Checkbox checked={this.state.CStateyes[2]} onChange={(e,val) => this.handlecstateyescheckChange(e,2)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
                                            NO<Checkbox checked={this.state.CStateno[2]} onChange={(e,val) => this.handlecstatenocheckChange(e,2)} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}></Checkbox>
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