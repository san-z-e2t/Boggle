import React from 'react'

const Instruction=(props)=>{

	return(
			<div className="innerInstr">
				<div className="instrHeader"><h3>Here are the instructions to play Boggle game.</h3></div>
				<ol className="instrHeader_ul">
					<li> Enter a word in the box below.</li>
					<li>The letters are chosen among the letters in box highlighted green.</li>
					<li>After entering a word, press on 'Submit'.</li>
					<li>For each correct word, you will get score equal to the number of letters in the word.</li>
					<li>Keep in mind, you cannot submit words after timeout.</li>
					<li>Your score shall be displayed below the 'Submit' button.</li>

				</ol>
			</div>
		);
}

export default Instruction;