# app/controllers/api/v1/users_controller.rb
module Api
    module V1
      class UsersController < BaseController
        def me
          render json: {
            id: current_api_v1_user.id,
            email: current_api_v1_user.email,
            role: current_api_v1_user.role
          }
        end
      end
    end
  end