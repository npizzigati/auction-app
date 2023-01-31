Rails.application.routes.draw do
  resources :autobids
  resources :bids
  resources :items
  namespace :api do
    namespace :v1 do
      resources :users
    end
  end
end
