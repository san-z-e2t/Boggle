Rails.application.routes.draw do
  root 'boggles#index'
  # match '*path', to:'boggles#index', via: :all
 post 'validate_word'=>'boggles#validate_word'
 get 'gather_alphabets', to: 'boggles#gather_alphabets'
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
