module BogglesHelper
	def gather_alphabets
	    available_alphabets = %w[A B C D E F G H I J K L M N O P Q R S T U V W X Y Z]   
	    alphabets = []
	    # generate random number from 0 to 25 
	    # and generate 16 alphabets from the array available_alphabets and push each to the array alphabets
	    
		    i = 0
			loop do			  
				  alphabets.push(available_alphabets[rand(26)])
				  i+=1
				  if i == 16
				    break       # this will cause execution to exit the loop
				  end
			end
			  alphabets   
 	end

 	def validate_word
 		require 'json'
 		# byebug
	    # word = params[:word]
	    # url = 'https://api.datamuse.com/words?ml="+'+word+'+"&max=3'	    
	    # request = HTTParty.get(url)
	    # request.success? ? word : ''

	    file = File.read(File.join(Rails.root, 'app','javascript','components','data', 'words.json'))
	    json_content=JSON.parse(file)
	    json_content
  	end

end
