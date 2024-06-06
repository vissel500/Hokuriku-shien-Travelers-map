Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  root "static_pages#top"
  get "map", to: "map_pages#map"
  resources :tourist_spots, only: %i[index] do
    collection do
      get :bookmarks
    end
  end
  resources :bookmarks, only: %i[create destroy]
  resources :movement_methods, only: %i[index]
  resources :inquiries, only: %i[new create] do
    collection do
      match :confirm, via: %i[get post]
      match :back, via: %i[get post]
    end
  end
  get "thank_you", to: "inquiries#thank_you", as: "thank_you"
end
