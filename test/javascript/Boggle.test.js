import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Boggle from '../../app/javascript/components/Boggle';



describe('<Boggle />', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Boggle />, div);
	});

	it('renders a button', () => {
	    const component = shallow(<Boggle />);
	    expect(component.find('button').length).toEqual(1);
	  });
	//loginComponent.setState({ error: true });
	it('renders a button', () => {
		const obj=require("../../app/javascript/components/data/words.json");
	    const component = shallow(<Boggle />);
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
	    component.instance().startGame(fakeEvent);
	    expect(component.state('game_status')).toEqual('on');	   
	    component.find('input').text("OF");
	     const input = component.find('input');
	    input.simulate("change", { target: { value: "OF" } });
	    component.instance().handleSubmit(fakeEvent);	
	    const scoreDiv = component.find('div.scoreDiv');
   		expect(scoreDiv).toHaveLength(1);   
   		const scoreTable = scoreDiv.find('table');
   		expect(scoreTable).toHaveLength(1); 
   		const row = scoreTable.find('tr');
   		expect(row).toHaveLength(3); 
   		const lastRowColumn = row.last().find('td').map(column => column.text())
   		expect(lastRowColumn.length).toBe(2)// since we have 2 td
     	
	  });

});
