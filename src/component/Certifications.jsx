import React from 'react';
import { Component } from 'react';
import { Paper, Grid, FormControlLabel, Button, List, ListItem, Collapse, RadioGroup, ListItemText, Radio, Container } from '@material-ui/core/';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CertifyService from '../api/CertifyService';
import quizes from './certs';

class Certifications extends Component {
    constructor() {
        super();
        this.state = {
            userObj: null,
            certificates: null,
            quizes: []
        }
    }

    async componentDidMount(){
        let qs = []
        for(let i = 0; i < quizes.length; i++){
            qs.push(<Certificate quiz={quizes[i]}/>)
        }
        const certificates = await CertifyService
            .executeGetCertifications(sessionStorage.getItem('authenticatedUserId'))
            .then(result => result.data);
        console.log('loading data ...');
        this.setState({
            certificates: certificates,
            quizes: qs
        })
    }

    render(){
        const style = {
            Paper : {
                padding:20, 
                marginTop:10, 
                marginBottom:10
            }
        };
        return(
            <div className="container">
                <div className="background-container"/>
                <Container maxWidth="md" style={{margin: '50px 0'}}>
                    <Paper style={style.paper}>
                        <Grid container direction="row" alignItems="flex-start" spacing={3} >
                            <Grid item sm>
                                <List>
                                    {this.state.quizes}
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div>
        )
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#77ccfd',
            dark: '#406ab3',
            contrastText: '#fff'
        }
    },
});

class Certificate extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            certId: '',
            qCount: 0,
            quetions: [],
            userAnswers: [],
            open: false,
            submitted: false,
            result: 0
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        let qs = []
        let us = []
        for(let j = 1; j <= this.props.quiz[0].qCount; j++){
            qs.push(<Question question={this.props.quiz[j]} select={this.handleChange} complete={this.state.submitted} index={j - 1}/>)
            us.push(0)
        }
        this.setState({
            title: this.props.quiz[0].title,
            certId: this.props.quiz[0].certId,
            qCount: this.props.quiz[0].qCount,
            questions: qs,
            userAnswers: us
        })
    }

    componentDidUpdate(oldProps){
        if(oldProps !== this.props){
            this.componentDidMount()
        }
    }

    handleClick(){
        this.setState({
            open: !this.state.open
        })
    }

    handleChange(index, result){
        let results = this.state.userAnswers
        results[index] = result
        this.setState({
            userAnswers: results
        })
    }

    async handleSubmit(){
        let score = 0
        for(let i = 0; i < this.state.qCount; i++){
            console.log(score)
            score = score + this.state.userAnswers[i]
        }
        score = score / this.state.qCount * 100
        const certification = {
            userId: sessionStorage.getItem('authenticatedUserId'),
            certificate: this.state.certId,
            score: score
        }
        console.log(certification)
        const res = await CertifyService
            .executeAddCertification(certification)
            .then(result => result.data);
        console.log(res)
    }

    render(){
        return(
            <>
                <ListItem button onClick={this.handleClick}>
                    {/* <ListItemIcon title={hoverText}></ListItemIcon> */}
                    <ListItemText primary={this.state.title} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        {
                            this.state.questions && this.state.questions.map( function(question, index) {
                                return(
                                <ListItem key={index} style={{borderBottom: "grey 1px solid"}}>
                                    {question}
                                </ListItem>
                                );
                            }, this)
                        }
                        <ListItem style={{justifyContent: "center", paddingTop: 30}}>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" 
                                        color="primary" 
                                        size="large"
                                        onClick={this.handleSubmit}
                                        style={{width: 'fit-content', 
                                                fontWeight: 600, 
                                                letterSpacing: 2}}>
                                    Submit
                                </Button>
                            </ThemeProvider>
                        </ListItem>
                    </List>
                </Collapse>
            </>
        )
    }
}

class Question extends Component{
    constructor(){
        super();
        this.state = {
            index: null,
            question: '',
            options: [],
            answer: null,
            userAnswer: null,
            complete: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        this.setState({
            index: this.props.index,
            question: this.props.question.question,
            options: this.props.question.options,
            answer: this.props.question.answer,
            complete: this.props.complete
        })
    }

    componentDidUpdate(oldProps){
        if(oldProps.complete !== this.props.complete){
            this.componentDidMount()
        }
    }

    handleClick(event){
        let result = parseInt(event.target.value) === this.state.answer? 1: 0
        this.props.select(this.state.index, result)
        this.setState({userAnswer: event.target.value})
    }

    render(){
        const style = {
            list: {
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',

            },
            item: {
                width: 'fit-content',
                flexDirection: 'column'
            }
        }
        return(
            <List direction="column" style={style.list}>
                <ListItem>
                    <h4>{this.state.question}</h4>
                </ListItem>
                <ListItem>
                    <RadioGroup aria-label="gender" name="gender1" value={this.state.userAnswer} onChange={this.handleClick} style={style.item} >
                        <FormControlLabel value={'0'} control={<Radio />} label={this.state.options[0]} />
                        <FormControlLabel value={'1'} control={<Radio />} label={this.state.options[1]} />
                        <FormControlLabel value={'2'} control={<Radio />} label={this.state.options[2]} />
                        <FormControlLabel value={'3'} control={<Radio />} label={this.state.options[3]} />
                    </RadioGroup>
                </ListItem>
            </List>
        )
    }

}

export default Certifications