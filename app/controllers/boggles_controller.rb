
class BogglesController < ApplicationController
	#protect_from_forgery with: :null_session
	skip_before_action :verify_authenticity_token
	
  def index  	
      
  end

#this method gathers 16 alphabets for the grid by using helper 'gather_alphabets'
  def  gather_alphabets
  	alphabets = helpers.gather_alphabets

    render json: {
      data: alphabets
    }
  	
  end 
  
end
