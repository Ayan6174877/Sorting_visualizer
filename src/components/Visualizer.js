import React, { Component } from 'react'
import './visualizer.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import * as sortingAlgorithms from '../sortingalgorithms/sortingAlgorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'cyan';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class visualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            arr: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray = () => {
       const arr = [];
        for(let i = 0; i <= NUMBER_OF_ARRAY_BARS ; i++){
            arr.push(randomIntFromInterval(5, 700));
          }

        this.setState({arr});
    }

    // Quicksort(){
    //     const sortedArray = sortingAlgorithms.quickSort(this.state.array);
    //     const bar = document.getElementsByClassName('visualizing-bar');
    //     bar[4].style.backgroundColor = 'red';
    // }

    MergeSort() {
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.arr);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('visualizing-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED);
          }
        }
      }

    render(){
        const {arr} = this.state;

        return (
            <>
             <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#home">Sorting Visualier</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown title="Sorting Algorithms" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => this.InsertionSort()}>Insertion</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.BubbleSort()}>Bubble</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.Quicksort()}>Quick</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.SelectionSort()}>Selection</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.MergeSort()}>Merge</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => this.HeapSort()}>Heap</NavDropdown.Item>
                        </NavDropdown>
                        <Button variant="light" className="reset-btn" onClick={() => this.resetArray()}>Reset the visualizer</Button>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
                 <div className="container flex-container">
                    {arr.map((value, idx) => (
                        <div className="visualizing-bar"
                         key={idx} 
                         style={{height: `${value}px`}}>
                         </div>
                    ))}
                 </div>
            </>
        );
    }
}

    function randomIntFromInterval(min, max){
        return Math.floor( Math.random()*  ( max - min + 1 ) + min );
    }

