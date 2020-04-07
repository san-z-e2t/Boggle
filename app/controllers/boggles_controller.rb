
class BogglesController < ApplicationController
	#protect_from_forgery with: :null_session
	skip_before_action :verify_authenticity_token
	
  def index
  	
       # flash[:alert] = "User not found."
  end

  def  gather_alphabets
  	alphabets = helpers.gather_alphabets

    render json: {
      data: alphabets
    }
  	
  end

  def validate_word
  	require 'json'
      #result = helpers.validate_word
     

		result = {
		  'a' => 1,
		  'b' => [2,3]
		}
      render json: {
        data: result
    }
     
  end

  # def validate_word
  # 		file=File.read(File.join(Rails.root, 'app','javascript','components','data', 'words.json'))
  # 		#file = File.read('./javascript/components/data/words.json')
  # 		dic_words = JSON.parse(file)
  # 		 render json: {
  #     data: dic_words
  #   }
  # end
  
end
