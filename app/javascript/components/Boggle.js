import React, {Component} from 'react'
import ReactDOM from "react-dom";
import {Router,Switch} from 'react-router-dom'
class Boggle extends Component{

	constructor(props){
		super(props)
		this.state={
			 minutes: 1,
        	 seconds: 0,
			 r1c1:'A',
			 r1c2:'B',
			 r1c3:'C',
			 r1c4:'D',
			 r2c1:'E',
			 r2c2:'F',
			 r2c3:'G',
			 r2c4:'H',
			 r3c1:'I',
			 r3c2:'A',
			 r3c3:'K',
			 r3c4:'L',
			 r4c1:'M',
			 r4c2:'N',
			 r4c3:'O',
			 r4c4:'P',
			 word: '',
			 //temp_click_allow_cells:[],
			 //empty_array:[],
			 click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
			 word_and_score: {},
    		 typed_word: "",
    		 score: 0,
    		 total_score:0, 
    		 clickedCell:[]
		}
	}

	handleWord=event=>{
		//alert('onchange');
		this.setState({
			word: event.target.value.toUpperCase(),
			score:event.target.value.length
		})
		//this.state.total_score+=parseInt(this.state.score);
		//alert(this.state.total_score);
	} // end of handle word

	handleKeyPress =event=>{
		let temp_click_allow_cells=[];
		let str="";
		let letter_presence=false;
		// alert('clicked cells:'+this.state.clickedCell);
		// alert('click allow cells:'+this.state.click_allow_cells);	
		for (let i = 1; i <= 4; i++) 
		{	
			for (let j = 1; j <= 4; j++)
			{	
				let str='';
				str='r'+i+'c'+j;
				
				if(this.state[str]==event.key.toUpperCase() && !this.state.clickedCell.includes(str))
				{
					// console.log(str);
					// console.log(this.state.clickedCell);
					// console.log(this.state.click_allow_cells);
					// alert(str+' '+ !this.state.clickedCell.includes(str) +' in clickedcell');
					// alert(str+' '+ this.state.click_allow_cells.includes(str) +' in click_allow_cells');
					// alert(str+' in '+ this.state.click_allow_cells);
					// alert(str +' letter: '+event.key.toUpperCase()+ ' include in '+this.state.click_allow_cells);
					if (this.state.click_allow_cells.includes(str))
					{
						//alert(str+' in '+ this.state.click_allow_cells);
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
					// else
					// {
					// 	alert('not allowed to click this.');
					// 	event.preventDefault();	
					// }
					
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

		   //console.log(temp_click_allow_cells);
		   //console.log(this.state.click_allow_cells);

  			//alert('cac2: '+ this.state.click_allow_cells);
  			// copy ends

  			//clear temp array
  			
  			temp_click_allow_cells=[];			
  		}
  		
		//alert ('allowed cells: '+ this.state.click_allow_cells );
		//alert('last clicked cells:'+this.state.clickedCell);
  		
	} // end of handle keypress

	handleSubmit=event=>{		
		event.preventDefault();
		const { word_and_score, word, score, total_score, click_allow_cells, clickedCell } = this.state;
    	const new_word_score = { [word]: [score] };
	    this.setState(
		      {
		      	click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
		        word_and_score: { ...word_and_score, ...new_word_score },
		        total_score:total_score+score,
		        word: "",
		        score: 0
		      },
		      () => console.log(this.state.word_and_score)
	      );
	    
	    clickedCell.length=0;
	    // alert(this.state.click_allow_cells);
	    // alert(this.state.clickedCell);
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
		const { minutes, seconds } = this.state
		return (
			<div className="container"> 
				<div className="header">
					{ minutes === 0 && seconds === 0
	                    ? <h1>Timeout!&nbsp; &nbsp; &nbsp; &nbsp;<button id="reloadBtn" onClick={() => window.location.reload(false)}>Click to play again!</button></h1>
	                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
	                }
            	</div>
				<form id="boggleForm" onSubmit={this.handleSubmit}>
				<div class="divInClass">
					<table className="table puzzleTable table-bordered" >
						<tr>
							<td>
								<label id="r1c1" className="btn btn-warning">{this.state.r1c1}</label>
							</td>							
							<td>
								<label className="btn btn-success">{this.state.r1c2}</label>
							</td>
							<td>
								<label className="btn btn-info">{this.state.r1c3}</label>
							</td>
							<td>
								<label className="btn btn-secondary">{this.state.r1c4}</label>
							</td>
						</tr>
						<tr>
							<td>
							  	<label className="btn btn-secondary">{this.state.r2c1}</label>
							</td>							
							<td>
								<label className="btn btn-warning">{this.state.r2c2}</label>
							</td>
							<td>
								<label className="btn btn-success">{this.state.r2c3}</label>
							</td>
							<td>
								<label className="btn btn-info">{this.state.r2c4}</label>
							</td>
						</tr>
						<tr>
							<td>
							  	<label className="btn btn-info">{this.state.r3c1}</label>
							</td>							
							<td>
								<label className="btn btn-secondary">{this.state.r3c2}</label>
							</td>
							<td>
								<label className="btn btn-warning">{this.state.r3c3}</label>
							</td>
							<td>
								<label className="btn btn-success">{this.state.r3c4}</label>
							</td>
						</tr>
						<tr>
							<td>
							  	<label className="btn btn-success">{this.state.r4c1}</label>
							</td>							
							<td>
								<label className="btn btn-info">{this.state.r4c2}</label>
							</td>
							<td>
								<label className="btn btn-secondary">{this.state.r4c3}</label>
							</td>
							<td>
								<label className="btn btn-warning">{this.state.r4c4}</label>
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
				</form>
			
        		{this.finalList()}
        	
				
        		
        	</div>
         
		);
	}
}

export default Boggle;