Rails.application.routes.draw do
  resources :autobids
  resources :bids
  namespace :api do
    namespace :v1 do
      resources :users
      resources :items
    end
  end
end
