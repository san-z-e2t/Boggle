Rails.application.routes.draw do
  root 'boggles#index'
  # match '*path', to:'boggles#index', via: :all
 get '/validate_word'=>'boggles#validate_word'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
