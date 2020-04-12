import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Boggle from '../../app/javascript/components/Boggle';



describe('<Boggle />', () => {
	//this tests whether Boggle component is rendered within div without crashing
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Boggle />, div);
	});

	//this checks whether a button from Boggle component is successfully rendered
	it('renders a button', () => {
	    const component = shallow(<Boggle />);
	    expect(component.find('button').length).toEqual(1);
	  });
	
	//this checks whether an input is submitted successfully
	it('should submit successfully', () => {
		const obj=require("../../app/javascript/components/data/words.json");
	    const component = shallow(<Boggle />);
	    //setting all the required states for the component
	    component.setState({
	    	minutes: 0,
        	seconds: 0,
        	r1c1:'A',
			 r1c2:'B',
			 r1c3:'C',
			 r1c4:'D',
			 r2c1:'N',
			 r2c2:'O',
			 r2c3:'F',
			 r2c4:'F',
			 r3c1:'O',
			 r3c2:'N',
			 r3c3:'A',
			 r3c4:'P',
			 r4c1:'B',
			 r4c2:'A',
			 r4c3:'T',
			 r4c4:'M',
			 word: '',
			 // array which includes the cell which user are allowed to click
			 click_allow_cells:['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r2c2', 'r2c3', 'r2c4','r3c1', 'r3c2', 'r3c3', 'r3c4', 'r4c1', 'r4c2', 'r4c3', 'r4c4' ],
			 word_and_score: {}, // array of correct words submitted	 
    		 score: 0,        // score for each correct word
    		 total_score:0, // total points scored by the player
    		 clickedCell:[],
    		 wordList:obj,    //this assigns the content of json file to state wordList
			 game_difficulty:"easy",
			 game_status:"off"
	    });
	    const fakeEvent = { preventDefault: () => console.log('preventDefault') }; 
	    component.instance().startGame(fakeEvent);    // this simulates the 'play' button in the component
	    expect(component.state('game_status')).toEqual('on');	//this checks the game status after play button is clicked  
	    //component.find('input').text("OF");
	     const input = component.find('input'); // this finds the input tag
	    input.simulate("change", { target: { value: "OF" } });  //this enters value 'OF' to the input box
	    component.instance().handleSubmit(fakeEvent);	// this simulates the 'Submit' button 
	    const scoreDiv = component.find('div.scoreDiv');  // this finds the 'scoreDiv' div
   		expect(scoreDiv).toHaveLength(1);    //this ensures that there should be one div with className scoreDiv
   		const scoreTable = scoreDiv.find('table'); // this finds the table within scoreDiv
   		expect(scoreTable).toHaveLength(1);  //this ensures that there should be one table within scoreDiv
   		const row = scoreTable.find('tr'); //this finds the tr in the table
   		expect(row).toHaveLength(3); //this ensures there should be three tr within the scoreTable
   		const lastRowColumn = row.last().find('td').map(column => column.text())
   		expect(lastRowColumn.length).toBe(2)  // this ensures there are two td in the last tr of scoreTable
     	//expected output
     	// <table>
     	//	<tr>
     	//		<td></td>
     	//		<td></td>
     	//	</tr>
     	//	<tr>
     	//		<td></td>
     	//		<td></td>
     	//	</tr>
     	//	<tr>
     	//		<td></td>
     	//		<td></td>
     	//	</tr>
     	// </table>


	  });

});
