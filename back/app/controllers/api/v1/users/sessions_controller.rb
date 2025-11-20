module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        respond_to :json
        
        def create
          user = User.find_for_database_authentication(email: params.dig(:user, :email))
          
          if user&.valid_password?(params.dig(:user, :password))
            sign_in(user)
            render json: {
              user: {
                id: user.id,
                email: user.email,
                role: user.role
              }
            }, status: :ok
          else
            render json: { error: "Invalid mail or password." }, status: :unauthorized
          end
        end
        
        private
        
        def respond_with(resource, _opts = {})
          render json: {
            user: {
              id: resource.id,
              email: resource.email,
              role: resource.role
            }
          }, status: :ok
        end
        
        def respond_to_on_destroy
          render json: { message: 'Déconnexion réussie' }, status: :ok
        end
      end
    end
  end
end