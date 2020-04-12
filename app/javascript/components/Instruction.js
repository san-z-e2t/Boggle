import React from 'react'

const Instruction=(props)=>{
	const mode= props.difficultyLevel=="easy"?"simple":"complex"
	return(
			
			<div className="innerInstr">
				<div className="instrHeader"><h3>Instructions ({mode} mode)</h3></div>
				<ol className="instrHeader_ul">
					<li> Click on 'Play' to start the game, 'Refresh Alphabets' to refresh alphabets in the grid and 'Switch' to switch from simple to complex and vice versa.</li>
										
					{props.difficultyLevel=="easy"?
					<li>The letters are so chosen the final word must follow horizontal, vertical or diagonal path in any direction.</li>:
					<li>Choose a letter in such a way that it must be a neighbour of previous letter. For your ease, clickable letters are highlighted green.</li>}
					
					<li>After entering a word, press on 'Submit'.Enter as many words as you can within the given time frame.</li>
					<li>For each correct word, you will get score equal to the number of letters in the word.</li>
					<li>Keep in mind, you cannot submit words after timeout.</li>
					<li>Your score shall be displayed below the 'Submit' button.</li>

				</ol>
			</div>

		);
}

export default Instruction;