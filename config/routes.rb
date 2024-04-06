Rails.application.routes.draw do
  devise_for :users
  root "top_pages#top"
  resources :tourist_spots, only: %i[index]
end
