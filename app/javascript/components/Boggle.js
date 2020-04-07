import React, {Component} from 'react'
import ReactDOM from "react-dom";
import {Router,Switch} from 'react-router-dom'
import Instruction from './Instruction'
import axios from 'axios'
import WordData from './data/words.json'

const obj=require("./data/words.json"); // this assigns content of json to obj


class Boggle extends Component{

	constructor(props){
		super(props)
		this.state={
			 minutes: 1,
        	 seconds: 0,
        	 //encoding of 16 cells in the board (r1c1 through r4c4)
			 r1c1:'',
			 r1c2:'',
			 r1c3:'',
			 r1c4:'',
			 r2c1:'',
			 r2c2:'',
			 r2c3:'',
			 r2c4:'',
			 r3c1:'',
			 r3c2:'',
			 r3c3:'',
			 r3c4:'',
			 r4c1:'',
			 r4c2:'',
			 r4c3:'',
			 r4c4:'',
			 word: '',
			 // array which includes the cell which user are allowed to click
			 click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
			 word_and_score: {}, // array of correct words submitted	 
    		 score: 0,        // score for each correct word
    		 total_score:0, // total points scored by the player
    		 clickedCell:[],
    		 wordList:obj    //this assigns the content of json file to state wordList
		}
	}
	

	handleWord=event=>{
		this.setState({
			word: event.target.value.toUpperCase(),
			score:event.target.value.length
		})		
	} // end of handle word

	handleKeyPress =event=>{
		if(event.key=='Enter')
		{
			//alert('key: '+event.key);
			this.handleSubmit;

		}
		else
		{
		let temp_click_allow_cells=[];
		let str="";
		let letter_presence=false;
		// alert('clicked cells:'+this.state.clickedCell);
		// alert('click allow cells:'+this.state.click_allow_cells);

		//this loop checks whether the key pressed by the user is allowed or not	
		for (let i = 1; i <= 4; i++) 
		{	
			for (let j = 1; j <= 4; j++)
			{	
				let str='';
				str='r'+i+'c'+j;
				
				if(this.state[str]==event.key.toUpperCase() && !this.state.clickedCell.includes(str) && this.state.click_allow_cells.includes(str))
				{
					// console.log(str);
					// console.log(this.state.clickedCell);
					// console.log(this.state.click_allow_cells);
					letter_presence=true;
						
					this.state.clickedCell.push(str); 
						
					const plus_i=i+1;	
					const plus_j=j+1;
					const minus_i=i-1;
					const minus_j=j-1;
					
					const cac1='r'+minus_i+'c'+minus_j;
					const cac2='r'+minus_i+'c'+j;
					const cac3='r'+minus_i+'c'+plus_j;
					const cac4='r'+i+'c'+minus_j;
					const cac5='r'+i+'c'+plus_j;
					const cac6='r'+plus_i+'c'+minus_j;
					const cac7='r'+plus_i+'c'+j;					
					const cac8='r'+plus_i+'c'+plus_j;
						//alert(cac1);
						 //alert (this.state[cac1]); // output is alphabet
						//alert('here '+temp_click_allow_cells);
					if (this.state[cac1] !==undefined && !temp_click_allow_cells.includes(cac1)){temp_click_allow_cells.push(cac1);}
					if (this.state[cac3] !==undefined && !temp_click_allow_cells.includes(cac3)){temp_click_allow_cells.push(cac3);}
					if (this.state[cac2] !==undefined && !temp_click_allow_cells.includes(cac2)){temp_click_allow_cells.push(cac2);}
					if (this.state[cac4] !==undefined && !temp_click_allow_cells.includes(cac4)){temp_click_allow_cells.push(cac4);}
					if (this.state[cac5] !==undefined && !temp_click_allow_cells.includes(cac5)){temp_click_allow_cells.push(cac5);}
					if (this.state[cac6] !==undefined && !temp_click_allow_cells.includes(cac6)){temp_click_allow_cells.push(cac6);}
					if (this.state[cac7] !==undefined && !temp_click_allow_cells.includes(cac7)){temp_click_allow_cells.push(cac7);}
					if (this.state[cac8] !==undefined && !temp_click_allow_cells.includes(cac8)){temp_click_allow_cells.push(cac8);}
						//alert (temp_click_allow_cells);
										
				}
											
			}   
			
  		}

  		if(letter_presence==false)
  		{
  			alert('You are not allowed to enter this letter. Please try again.');
  			event.preventDefault();
  		}
  		else
  		{
  			
  			const {click_allow_cells}=this.state;
  			
  			//clear state array
  			click_allow_cells.length=0;  
  			
  			//copy from temp array  to final click_allow_cells
  			
  			var joined = temp_click_allow_cells;
  			this.setState({
		        	 click_allow_cells: joined
		     	})

  			
  			// copy ends

  			//clear temp array
  			
  			temp_click_allow_cells=[];			
  		}
  		
		//alert ('allowed cells: '+ this.state.click_allow_cells );
		//alert('last clicked cells:'+this.state.clickedCell);
	}
  		
	} // end of handle keypress


	isEmpty=obj=> {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	handleSubmit=event=>{	
		const { word_and_score, word, score, total_score, click_allow_cells, clickedCell } = this.state;
		event.preventDefault();

		//validation
		if(word.length==0) // checks the empty submission
		{
			alert('The box is empty. Please enter a word');
			event.preventDefault();
		}
		else // if there are any letters in the box
		{	

			if(word_and_score.hasOwnProperty(word)) //checks if the word is already submitted
			{	
				alert('You have already entered this word. Please try with other.');
				//event.preventDefault();
				this.setState({
					word:"",
					score:0,
					click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ]
				});				
			}
			else
			{				
   				var isWordValid=false;
   				// this for loop checks if the submitted word is in json file or not
				for (let x = 0; x < this.state.wordList.length; x++) {
				   if(this.state.word==this.state.wordList[x].word.toUpperCase())
				   {
				   		isWordValid=true;
				   }
				}

				alert('isvalid: '+isWordValid);

				if(isWordValid==false)
				{
					alert ('This is not a valid word. Please Try again.');
					//event.preventDefault();
					this.setState({
						word:"",
						score:0,
						click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ]
					});	
				}
				else
				{
			    	const new_word_score = { [word]: [score] };
				    this.setState(
					      {
					      	click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
					        word_and_score: { ...word_and_score, ...new_word_score },
					        total_score:total_score+score,
					        word: "",
					        score: 0
					      }
					      //,() => console.log(this.state.word_and_score)
				      );
				    
				    clickedCell.length=0;
				    // alert(this.state.click_allow_cells);
				    // alert(this.state.clickedCell);
				}
			//}
			}
		}

		
    } // end of handle submit

	finalList = () => {
	    const { word_and_score } = this.state;

	    const list = Object.entries(word_and_score).map(([key, value]) => {	      
	        return (
	        	<tr>
	          <td>
	            {key}
	          </td>
	          <td>
	          	{value}
	          </td>
	          </tr>
	        );
    	});
    	return (
		      <div className="scoreDiv" >
		        {list.length > 0 ? (

		          <table className="scoreTable table table-bordered table-condensed">
		          <caption>Score Board</caption>
		          <tr>
		          	
		          	   <th> Word </th>
		          	   <th> Score </th>
		          	
		          </tr>
		            {list}
		            <tr>
			            <td>
			            	Total Score
			            </td>
			            <td>
		            		{this.state.total_score}
			            </td>
			         </tr>
		          </table>
		        ) : (
		          ""
		        )}
		      </div>
    	);
	}; //end of final list

	 componentDidMount() {
	 	const {r1c1,r1c2,r1c3,r1c4,r2c1,r2c2,r2c3,r2c4,r3c1,r3c2,r3c3,r3c4,r4c1,r4c2,r4c3,r4c4}=this.state;
		
		axios.get('/gather_alphabets.json')		
            .then(response =>{
            	//alert('data: '+response.data.data);
            	//alert('first:'+response.data.data[0]);            	
                this.setState(
					      {
					      	 r1c1:response.data.data[0],
							 r1c2:response.data.data[1],
							 r1c3:response.data.data[2],
							 r1c4:response.data.data[3],
							 r2c1:response.data.data[4],
							 r2c2:response.data.data[5],
							 r2c3:response.data.data[6],
							 r2c4:response.data.data[7],
							 r3c1:response.data.data[8],
							 r3c2:response.data.data[9],
							 r3c3:response.data.data[10],
							 r3c4:response.data.data[11],
							 r4c1:response.data.data[12],
							 r4c2:response.data.data[13],
							 r4c3:response.data.data[14],
							 r4c4:response.data.data[15]
					      })
         })
            .catch(response => {
                console.log(response)
            })
        
            axios.get('data/sample_word.json') // JSON File Path
				   .then( response => {
				     alert('wordList: '+ wordList);
				     console.log(wordList);
				     this.setState({
				     wordList: response.data
				   });
				 })
				 .catch(function (error) {
				   console.log(error);
				 });


        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)

                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)


    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

	render(){
		const { minutes, seconds, error, isLoaded, click_allow_cells } = this.state
				//alert(click_allow_cells);
		return (

			<div className="container"> 
				<div className="header">
					<h1>Welcome to Boggle Game</h1> { minutes === 0 && seconds === 0
	                    ? <h3>Timeout!&nbsp; &nbsp; &nbsp; &nbsp;<button id="reloadBtn" onClick={() => window.location.reload(false)}>Click to play again!</button></h3>
	                    : <h3>Time Remaining- {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>} 	                
	                
            	</div>
				<form id="boggleForm" onSubmit={this.handleSubmit}>
				<div className="divInClass">
				<div class="row">
				<div className="pull-left boardDiv">
					<table className="table puzzleTable table-bordered" >
						<tr>
							<td>
								<label id="r1c1" className={`btn ${click_allow_cells.includes("r1c1") ? "btn-success" : "btn-default"}`}>{this.state.r1c1}</label>
							</td>			 				
							<td>
								<label id="r1c2" className={`btn ${click_allow_cells.includes("r1c2") ? "btn-success" : "btn-default"}`}>{this.state.r1c2}</label>
							</td>
							<td>
								<label id="r1c3" className={`btn ${click_allow_cells.includes("r1c3") ? "btn-success" : "btn-default"}`}>{this.state.r1c3}</label>
							</td>
							<td>
								<label id="r1c4" className={`btn ${click_allow_cells.includes("r1c4") ? "btn-success" : "btn-default"}`}>{this.state.r1c4}</label>
							</td>
						</tr>
						<tr>
							<td>
							  	<label id="r2c1" className={`btn ${click_allow_cells.includes("r2c1") ? "btn-success" : "btn-default"}`}>{this.state.r2c1}</label>
							</td>							
							<td>
								<label id="r2c2" className={`btn ${click_allow_cells.includes("r2c2") ? "btn-success" : "btn-default"}`}>{this.state.r2c2}</label>
							</td>
							<td>
								<label id="r2c3" className={`btn ${click_allow_cells.includes("r2c3") ? "btn-success" : "btn-default"}`}>{this.state.r2c3}</label>
							</td>
							<td>
								<label id="r2c4" className={`btn ${click_allow_cells.includes("r2c4") ? "btn-success" : "btn-default"}`}>{this.state.r2c4}</label>
							</td>
						</tr>
						<tr>
							<td>
							  	<label id="r3c1" className={`btn ${click_allow_cells.includes("r3c1") ? "btn-success" : "btn-default"}`}>{this.state.r3c1}</label>
							</td>							
							<td>
								<label id="r3c2" className={`btn ${click_allow_cells.includes("r3c2") ? "btn-success" : "btn-default"}`}>{this.state.r3c2}</label>
							</td>
							<td>
								<label id="r3c3" className={`btn ${click_allow_cells.includes("r3c3") ? "btn-success" : "btn-default"}`}>{this.state.r3c3}</label>
							</td>
							<td>
								<label id="r3c4" className={`btn ${click_allow_cells.includes("r3c4") ? "btn-success" : "btn-default"}`}>{this.state.r3c4}</label>
							</td>
						</tr>
						<tr>
							<td>
							  	<label id="r4c1" className={`btn ${click_allow_cells.includes("r4c1") ? "btn-success" : "btn-default"}`}>{this.state.r4c1}</label>
							</td>							
							<td>
								<label id="r4c2" className={`btn ${click_allow_cells.includes("r4c2") ? "btn-success" : "btn-default"}`}>{this.state.r4c2}</label>
							</td>
							<td>
								<label id="r4c3" className={`btn ${click_allow_cells.includes("r4c3") ? "btn-success" : "btn-default"}`}>{this.state.r4c3}</label>
							</td>
							<td>
								<label id="r4c4" className={`btn ${click_allow_cells.includes("r4c4") ? "btn-success" : "btn-default"}`}>{this.state.r4c4}</label>
							</td>
						</tr>
					</table>
					<div>
						<p>Type a word as you see in above table  &nbsp;</p>
						<input type="text" className="txtWord" value={this.state.word} onKeyPress ={this.handleKeyPress} onChange={this.handleWord}/>
					</div>
					<div>
						<button type="submit" disabled={minutes === 0 && seconds === 0} className="btn btn-primary">Submit</button>
					</div>
				</div>

				<div  className=" pull-right instrDiv"><Instruction/></div>
				
				</div> 
					
				</div>
				</form>
			
        		{this.finalList()}
        		
        		
        	</div>
         
		);
	}

}

export default Boggle;