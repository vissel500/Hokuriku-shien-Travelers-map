Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#top'
  get 'map', to: 'map_pages#map'
  resources :tourist_spots, only: %i[index] do
    collection do
      get :bookmarks
    end
  end
  resources :bookmarks, only: %i[create destroy]
end
