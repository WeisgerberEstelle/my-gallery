# app/controllers/api/v1/users/sessions_controller.rb
module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        respond_to :json

        def create
          # On récupère l'utilisateur par email
          user = User.find_for_database_authentication(email: params.dig(:user, :email))
          
          if user&.valid_password?(params.dig(:user, :password))
            sign_in(user) # déclenche le JWT via devise-jwt
            render json: {
              user: {
                id: user.id,
                email: user.email,
                role: user.role
              }
            }, status: :ok
          else
            render json: { error: "Email ou mot de passe invalide" }, status: :unauthorized
          end
        end

        def destroy
          if current_api_v1_user
            sign_out(current_api_v1_user)
            render json: { message: 'Déconnexion réussie' }, status: :ok
          else
            render json: { error: 'Aucun utilisateur connecté' }, status: :unauthorized
          end
        end
      end
    end
  end
end