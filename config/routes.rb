Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :items
      resources :bids
      resources :autobids
      resources :autobid_configs
      post '/sessions' => 'sessions#create'
      get '/bid/was-saved' => 'bids#saved?'
      get '/autobid/percentages' => 'autobids#get_percentages'
      get '/sessions/get-role' => 'sessions#get_role'
      get '/sessions/get-username' => 'sessions#get_username'
      get '/sessions/get-user-info' => 'sessions#get_user_info'
    end
  end
end
