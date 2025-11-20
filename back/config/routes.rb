Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      
      devise_for :users,
        path: '',
        path_names: {
          sign_in: 'login',
          sign_out: 'logout',
          registration: 'signup'
        },
        controllers: {
          sessions: 'api/v1/users/sessions',
          registrations: 'api/v1/users/registrations'
        }

      get 'me', to: 'users#me'

      resources :artworks, only: %i[index show create update destroy]
      resources :categories, only: %i[index]
    end
  end

  # Health check Rails
  get "up" => "rails/health#show", as: :rails_health_check
end

