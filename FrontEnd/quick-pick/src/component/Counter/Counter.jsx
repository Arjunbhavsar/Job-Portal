import React, {Component} from 'react';
import './Counter.css'

class Counter extends Component {

    constructor(){
        super();
        this.state = {
            counter : 0 
        }
        this.increment  = this.increment.bind(this);
    }

    render(){
        return(
        <div className='counter'>
          <CounterButton incrementMethod={this.increment}/>
          <CounterButton by={5} incrementMethod={this.increment}/>
          <CounterButton by={10} incrementMethod={this.increment}/>

          <span className='count' style= {{padding:"10px 20px"}}>{this.state.counter}</span>
        </div>
        )
    }

    increment(by){
        this.setState(
            (prevState)=>{
                return {counter: prevState.counter + by}
            }
        )
    }
}

class CounterButton extends Component{

    constructor(){
        super();
        // this.state = {
        //     counter : 0 
        // }

        // this.increment = this.increment.bind(this);
    }

    render(){
        return(

            <div className='Counter'>
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                {/* <span className='count' style= {{padding:"10px 20px"}}>{this.state.counter}</span> */}
            </div>
        )
    }
    // increment(){
    //     // this.setState({
    //     //     counter: this.state.counter + this.props.by
    //     // }
    //     // )

    //     this.props.incrementMethod(this.props.by)
    // }
    
}

CounterButton.defaultProps = {
    by:1
}

export default Counter