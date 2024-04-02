Rails.application.routes.draw do
  root "top_pages#top"
  resources :tourist_spots, only: %i[index]
end
