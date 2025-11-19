Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :artworks, only: %i[index show create update destroy]
      resources :categories, only: %i[index]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
