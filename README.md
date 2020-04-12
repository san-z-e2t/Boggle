Boggle based on React and Ruby on Rails

	Boggle is one of the famous word games. This project uses React at the front end while Ruby on Rails at the backend. 
Bootstrap has been used for beautification of UI.

Installation
	This project is developed in Windows OS.

	To download or clone, use the following URL:
	https://github.com/san-z-e2t/Boggle.git

Install various required backend dependicies. For this, copy the following lines to the Gemfile:
	gem 'jquery-rails'
	gem 'font-awesome-sass'
	gem 'bootstrap'
	gem 'rails'
	gem 'webpacker'

Install these gems using following command in the project directory through terminal:
	$ bundle install

Following frontend dependencies are required:
	babel/preset-react
	rails/webpacker
	axios
	bootstrap
	react
	react-dom
	react-router
	react-router-dom
	jest
	enzyme
	enzyme-adapter-react-16
	webpack-dev-server

Install these using yarn command through terminal:
	$ yarn (*****)

Testing

	This project has used default testing defined by rails framework.

	For testing functional and integration testing, use the following command in the terminal:

		$ rake 

	For frontend testing, Jest, Babel and Enzyme are used
	Install them using yarn in the terminal as belows:

	Setup Jest  
		$ yarn add --dev jest

	Setup Babel
		This step is required to have import directives working.
		$ yarn add --dev babel-jest regenerator-runtime

	Enzyme
		Enzyme is a JavaScript testing utility for React. Shallow utility helps us in rendering a component and allowing us access to the class methods/state of the component.
		$ yarn add --dev enzyme enzyme-adapter-react-16

	For frontend testing, use the following command in the terminal:
		$ yarn test

Starting rails server:
	Rails server can be started by using following command in the terminal:
		$ rails s

Instructions to play Boggle game:

This game has been designed in two complexity mode: Simple and Complex. Instructions to play game is displayed dynamically in each mode in UI.

1. The default mode is 'Simple'. Player can change the mode to complex and vice versa as and when required.
2. Player gets one minute of total time to enter word and submit each.
3. Timer starts after clicking on 'Play' menu.
4. Letters in the board can be refreshed to generate new ones by clicking on 'Refresh Alphabets'.
5. In simple mode, words are to be entered in such a way that they lie in grid horizontally or vertically or diagonally.
6. In complex mode, letters are so chosen in a word such that a letter is neighbour to its predecessor and no letter in the same position are repeated in the same word.
7. With the submission of each correct word, player will score the point equal to the length of the word.
8. As the timer stops, no word can be submitted; player can only view the score obtained.

Disclaimer:
	For validation of existence of word, this project has used json file with collection of 263,533 words.
	
Preview:
![Simple mode screenshot](https://github.com/san-z-e2t/Boggle/blob/master/Simple_Mode.JPG)
![Complex mode screenshot](https://github.com/san-z-e2t/Boggle/blob/master/Complex_mode.JPG)
