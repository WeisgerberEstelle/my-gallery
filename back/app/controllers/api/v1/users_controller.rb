module Api
    class UsersController < ApplicationController
      before_action :authenticate_user!
  
      def me
        render json: {
          id: current_user.id,
          email: current_user.email,
          role: current_user.role
        }
      end
    end
end
  