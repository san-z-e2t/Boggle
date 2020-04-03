import React, {Component} from 'react'
import ReactDOM from "react-dom";

class Boggle extends Component{

	constructor(props){
		super(props)
		this.state={
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
			 click_allow_cells:[],
			 word_and_score: {},
    		 word: "",
    		 score: 0,
    		 total_score:0
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
	}
	handleKeyPress =event=>{
		//alert('on key press');
		this.setState({
			word: event.target.value.toUpperCase()
		})
		const clickedCell=[];
		const letter_presence=false;	
		for (let i = 1; i <= 4; i++) 
		{			
			for (let j = 1; j <= 4; j++)
			{
				const str='r'+i+'c'+j;

				if(this.state[str]==event.key.toUpperCase())
				{
					this.setState({
						click_allow_cells: []			
						})
					clickedCell.push(str); 
					letter_presence=true;
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
						alert (this.state[cac1]); // output is alphabet
					if (this.state[cac1] !==undefined && !this.state.click_allow_cells.includes(cac1)){this.state.click_allow_cells.push(cac1);}
					if (this.state[cac2] !==undefined && !this.state.click_allow_cells.includes(cac2)){this.state.click_allow_cells.push(cac2);}
					if (this.state[cac3] !==undefined && !this.state.click_allow_cells.includes(cac3)){this.state.click_allow_cells.push(cac3);}
					if (this.state[cac4] !==undefined && !this.state.click_allow_cells.includes(cac4)){this.state.click_allow_cells.push(cac4);}
					if (this.state[cac5] !==undefined && !this.state.click_allow_cells.includes(cac5)){this.state.click_allow_cells.push(cac5);}
					if (this.state[cac6] !==undefined && !this.state.click_allow_cells.includes(cac6)){this.state.click_allow_cells.push(cac6);}
					if (this.state[cac7] !==undefined && !this.state.click_allow_cells.includes(cac7)){this.state.click_allow_cells.push(cac7);}
					if (this.state[cac8] !==undefined && !this.state.click_allow_cells.includes(cac8)){this.state.click_allow_cells.push(cac8);}
					
				}
											
			}   
			
  		}
  		alert(this.state.click_allow_cells);
  		if(letter_presence==false)
  		{
  			alert('The letter you just typed does not exist. Please try again.');
  			event.preventDefault();
  		}
	}

	handleSubmit=event=>{
		//alert (this.state.total_score);
		
		event.preventDefault();
		const { word_and_score, word, score, total_score } = this.state;
    	const new_word_score = { [word]: [score] };
	    this.setState(
		      {
		        word_and_score: { ...word_and_score, ...new_word_score },
		        total_score:total_score+score,
		        word: "",
		        score: 0
		      },
		      () => console.log(this.state.word_and_score)
	      );
    }

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

		          <table className=" table-bordered table-condensed">
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
	};


	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<table className="table-bordered" >
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
						<label>Type a word as you see in above table : &nbsp;</label>
						<input type="text" value={this.state.word} onKeyPress ={this.handleKeyPress} onChange={this.handleWord}/>
					</div>
					<div>
						<button type="submit"  className="btn btn-primary">Submit</button>
					</div>
				</form>
			
        		{this.finalList()}
        	
				
        		
        	</div>
         
		);
	}
}

export default Boggle;