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
			 minutes: 0,
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
    		 wordList:obj,    //this assigns the content of json file to state wordList
			 game_difficulty:"easy",
			 game_status:"off",
			 show_time_info:"no"
		}
	}
	
	//this function switches game complexity 
	changeDifficulty=(event)=>{
		event.preventDefault();	
		if(this.state.game_difficulty=="easy")
		{
			this.setState({

				game_difficulty:"difficult",
				click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ]
			})
		}
		else
		{
			this.setState({
				game_difficulty:"easy"
			})
		}
		this.setState({
			show_time_info:"no",
			game_status:"off",
			minutes:0,
			seconds:0,
			word:"",
			word_and_score: {}, // array of correct words submitted	 
			score: 0,        // score for each correct word
			total_score:0, // total points scored by the player
			clickedCell:[]		
		})
	}

// this function ends game 
	endGame=(event)=>{
		event.preventDefault();
		this.setState({
			show_time_info:"no",
			game_status:"off",
			minutes:0,
			seconds:0
		})
	}

// this function starts game
	startGame=(event)=>{
		event.preventDefault();
		this.setState({
			show_time_info:"yes",
			game_status:"on",
			minutes:1,
			seconds:0,
			word:"",
			click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
			 word_and_score: {}, // array of correct words submitted	 
    		 score: 0,        // score for each correct word
    		 total_score:0, // total points scored by the player
    		 clickedCell:[],
    		 wordList:obj
		})
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
	

// this function handles word submitted
	handleWord=event=>{
		this.setState({
			word: event.target.value.toUpperCase(),
			score:event.target.value.length
		})		
	} // end of handle word

//this function is triggered on each keypress
	handleKeyPress =event=>{
		if(event.key=='Enter')
		{
			//alert('key: '+event.key);
			this.handleSubmit(event);
			//event.preventDefault();

		}
		else
		{
			if(this.state.game_difficulty=="difficult")
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
			} // end of grid word validation in difficult level
		}   // end of else, if pressed key is not 'Enter'
  		
	} // end of handle keypress

// this function is triggered on submission of word
	handleSubmit=event=>{	
		const { word_and_score, word, score, total_score, click_allow_cells, clickedCell } = this.state;
		event.preventDefault();
		//alert(this.state.minutes+':'+this.state.seconds);

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
			{	// word in grid validation in easy mode
				let master_possible_words=[];
				if(this.state.game_difficulty=="easy")
				{
				//another way, master_possible_words array holds all the possible of words based 
				//on the first letter
				var first_letter=this.state.word.charAt(0);
				//alert('first letter: '+first_letter);	
				
				let temp_possible_words=[];

				for (let i = 1; i <= 4; i++) 
				{	
					for (let j = 1; j <= 4; j++)
					{	
						let str='';
						str='r'+i+'c'+j;
						
						if(this.state[str]==first_letter)
						{
							
							//alert('hi');
							let x = parseInt(str.charAt(1));
							let y= parseInt(str.charAt(3));
							
							//hori+
							let possible_allowed_words=[];
							for(let hp=y; hp<=4; hp++)
							{
								let cal_index='r'+x+'c'+hp;
								if(possible_allowed_words.length==0)
									possible_allowed_words.push(this.state[cal_index]);
								else
									possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
							}
							temp_possible_words.push(possible_allowed_words);
							

							//hori-
							possible_allowed_words=[];
							for(let hp=y; hp>=1; hp--)
							{
								let cal_index='r'+x+'c'+hp;								
								if(possible_allowed_words.length==0)
									possible_allowed_words.push(this.state[cal_index]);
								else
									possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
							}
							temp_possible_words.push(possible_allowed_words);


							//ver+
							possible_allowed_words=[];
							for(let hp=x; hp<=4; hp++)
							{
								let cal_index='r'+hp+'c'+y;
								//alert('cal_index: '+cal_index);
								//alert('possible_allowed_words length: '+ possible_allowed_words.length);
								if(possible_allowed_words.length==0)
									possible_allowed_words.push(this.state[cal_index]);
								else
									possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
							}
							temp_possible_words.push(possible_allowed_words);
							

							//ver-
							possible_allowed_words=[];
							for(let hp=x; hp>=1; hp--)
							{
								let cal_index='r'+hp+'c'+y;
								//alert('cal_index: '+cal_index);
								//alert('possible_allowed_words length: '+ possible_allowed_words.length);
								if(possible_allowed_words.length==0)
									possible_allowed_words.push(this.state[cal_index]);
								else
									possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
							}
							temp_possible_words.push(possible_allowed_words);

							//diag right up(row decreases, column increases)
							possible_allowed_words=[];
							let dru_x=x;
							let dru_y=y;
							while(dru_x>=1 && dru_y<=4)
							{
								let cal_index='r'+dru_x+'c'+dru_y;
									//alert('cal_index: '+cal_index);
									//alert('possible_allowed_words length: '+ possible_allowed_words.length);
									if(possible_allowed_words.length==0)
										possible_allowed_words.push(this.state[cal_index]);
									else
										possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
								dru_x-=1;
								dru_y+=1;	
							}
							temp_possible_words.push(possible_allowed_words);
					
					
							//diag right down(row increases, column increases)
							possible_allowed_words=[];
							dru_x=x;
							dru_y=y;
							while(dru_x<=4 && dru_y<=4)
							{
								let cal_index='r'+dru_x+'c'+dru_y;
									if(possible_allowed_words.length==0)
										possible_allowed_words.push(this.state[cal_index]);
									else
										possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
								dru_x+=1;
								dru_y+=1;	
							}
							temp_possible_words.push(possible_allowed_words);
							
							//diag left up(row decreases, column decreases)
							possible_allowed_words=[];
							dru_x=x;
							dru_y=y;
							while(dru_x>=1 && dru_y>=1)
							{
								let cal_index='r'+dru_x+'c'+dru_y;
									//alert('cal_index: '+cal_index);
									//alert('possible_allowed_words length: '+ possible_allowed_words.length);
									if(possible_allowed_words.length==0)
										possible_allowed_words.push(this.state[cal_index]);
									else
										possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
								dru_x-=1;
								dru_y-=1;	
							}
							temp_possible_words.push(possible_allowed_words);

						

							//diag left down(row increases, column decreases)
							possible_allowed_words=[];
							dru_x=x;
							dru_y=y;
							while(dru_x<=4 && dru_y>=1)
							{
								let cal_index='r'+dru_x+'c'+dru_y;
									//alert('cal_index: '+cal_index);
									//alert('possible_allowed_words length: '+ possible_allowed_words.length);
									if(possible_allowed_words.length==0)
										possible_allowed_words.push(this.state[cal_index]);
									else
										possible_allowed_words.push(possible_allowed_words[possible_allowed_words.length-1]+this.state[cal_index]);
								dru_x+=1;
								dru_y-=1;	
							}
							temp_possible_words.push(possible_allowed_words);
							
						} // if loop closes
					} // second for loop closes
				} //first for loop closes
				//console.log(temp_possible_words);
				
				//There may be duplicate words in temp_possible_words, so select only unique strings and copy to master_possible_words  
				for(let wrd=0; wrd<temp_possible_words.length; wrd++)
				{
					for(let wrdInner=0; wrdInner<temp_possible_words[wrd].length; wrdInner++)
					{
						//alert('wrd: '+wrd+' wrdInner: '+wrdInner);
						if(!master_possible_words.includes(temp_possible_words[wrd][wrdInner]))
						{
							//alert('master:');							
							master_possible_words.push(temp_possible_words[wrd][wrdInner]);
						}
					}
				}	
			

				if(!master_possible_words.includes(this.state.word))
				{
					alert('The word is not in grid in horizontal, vertical and diagonal manner. Please try with other word.');	
					this.setState({
						word:"",
						socre:0
					});		
				}
				// another way ends
			} // word in grid validation for difficulty level- easy

			if((this.state.game_difficulty=="easy" && master_possible_words.includes(this.state.word))|| this.state.game_difficulty=="difficult")
			{
				var isWordValid=false;
   				// this for loop checks if the submitted word is in json file or not (dictionary)
				for (let x = 0; x < this.state.wordList.length; x++) {
				   if(this.state.word==this.state.wordList[x].word.toUpperCase())
				   {
				   		isWordValid=true;
				   }
				}

				//alert('isvalid: '+isWordValid);

				if(isWordValid==false)
				{
					alert ('This is not a valid word. Please Try again.');
					//event.preventDefault();
					this.setState({
						word:"",
						score:0
					});	
					if(this.state.game_difficulty=="difficult")
					{
						this.setState({
							click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ]
						});
					}
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
				    if(this.state.game_difficulty=="difficult")
					{
						this.setState({
							click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ]
						});
						clickedCell.length=0;
					}
				    
				    
				    // alert(this.state.click_allow_cells);
				    // alert(this.state.clickedCell);
				}
			}
			//}
			}
		}

		
    } // end of handle submit

//this function generates final list of correct words, individual score for each word and total score 
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
		          <thead className="thead-dark">
		          <tr>
		          	
		          	   <th> Word </th>
		          	   <th> Score </th>
		          	
		          </tr>
		          </thead>
		          <tbody>
		            {list}
		            <tr>
			            <td>
			            	Total Score
			            </td>
			            <td>
		            		{this.state.total_score}
			            </td>
			         </tr>
			         </tbody>
		          </table>
		        ) : (
		          ""
		        )}
		      </div>
    	);
	}; //end of final list

//this function is triggered on clicking 'refresh alphabets'
	refreshAlphabets=(event)=>{
		this.setState({
			show_time_info:"no"
		});
		event.preventDefault();
		const {r1c1,r1c2,r1c3,r1c4,r2c1,r2c2,r2c3,r2c4,r3c1,r3c2,r3c3,r3c4,r4c1,r4c2,r4c3,r4c4}=this.state;
		
		// here axios has been used for fetching letters in the game board 
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
							 r4c4:response.data.data[15],
							 word:"",
							 click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
			 				 word_and_score: {}, // array of correct words submitted	 
				    		 score: 0,        // score for each correct word
				    		 total_score:0, // total points scored by the player
				    		 clickedCell:[],
				    		 minutes:0,
				    		 seconds:0,
				    		 game_status:"off"
					      })
         })
            .catch(response => {
                console.log(response)
            })
	}

//this method is called automatically after all the elements of the page are rendered
	 componentDidMount() {
	 	const {r1c1,r1c2,r1c3,r1c4,r2c1,r2c2,r2c3,r2c4,r3c1,r3c2,r3c3,r3c4,r4c1,r4c2,r4c3,r4c4}=this.state;


		// here axios has been used for fetching letters in the game board initially
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
            

     }

   
// render function displays the HTML markup or JSX syntax.
	render(){
		const { minutes, seconds, error, isLoaded, click_allow_cells, show_time_info } = this.state
				//alert(click_allow_cells);
		return (

			<div className="container"> 
				<div className="header">
					<h1>Welcome to Boggle World</h1> 
            	</div>
            		                
				<form id="boggleForm" onSubmit={this.handleSubmit}>
				<div className="divInClass">
				<div className="row reloadBtn" >
						{this.state.game_status=="off"?			
						<a href="" id="lblPlay" className="px-5" onClick={this.startGame}>Play</a>
						:<a  href="" id="lblEnd" className="px-5" onClick={this.endGame}>End</a> }						
						<a  href=""id="lblRefresh" className="px-5 " onClick={this.refreshAlphabets}>Refresh Letters</a>
					<label>Mode: {this.state.game_difficulty=="easy"?"simple":"complex"} </label>
					
					<a id="switchMode" href="" className="px-2 " onClick={this.changeDifficulty}>(Switch)</a>	
					{show_time_info=="yes" && minutes === 0 && seconds === 0
		                    ? <label className="px-5 ">Timeout!</label>:""}
		            {show_time_info=="yes" && (minutes != 0 || seconds != 0)
		                   ?<label className="px-5 ">Time Remaining- {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</label>
		                   :""} 
				</div>
				
				<div className="row">
				<div className="pull-left boardDiv">

					<table className=" table table-condensed puzzleTable table-bordered" >
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
					
				</div>
				<div className="txtDiv">
					<div>
						<p>Type a word as you see in above table  &nbsp;</p>
						<input type="text" disabled={minutes === 0 && seconds === 0} className="txtWord" value={this.state.word} onKeyPress ={this.handleKeyPress} onChange={this.handleWord}/>
					</div>
					<div>
						<button type="submit" disabled={minutes === 0 && seconds === 0} className="btn btn-primary">Submit</button>
					</div>
					{this.finalList()}
				</div>

				<div  className="pull-right instrDiv"><Instruction difficultyLevel={this.state.game_difficulty}/></div>
				
				</div> 
					
				</div>
				</form>
			      		
        		
        		
        	</div>
         	
		);
	}

}

export default Boggle;