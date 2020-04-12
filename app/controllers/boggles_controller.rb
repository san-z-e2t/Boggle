
class BogglesController < ApplicationController
	#protect_from_forgery with: :null_session
	skip_before_action :verify_authenticity_token
	
  def index
  	
      
  end

  def  gather_alphabets
  	alphabets = helpers.gather_alphabets

    render json: {
      data: alphabets
    }
  	
  end

  # def validate_word
  # 	require 'json'
  #     #result = helpers.validate_word
     

		# result = {
		#   'a' => 1,
		#   'b' => [2,3]
		# }
  #     render json: {
  #       data: result
  #   }
     
  # end 
  
end
