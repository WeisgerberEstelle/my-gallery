# app/controllers/api/v1/base_controller.rb
module Api
    module V1
      class BaseController < ApplicationController
        before_action :authenticate_api_v1_user!
        
        private
        
        def authenticate_api_v1_user!
          unless current_api_v1_user
            render json: { error: 'Unauthorized' }, status: :unauthorized
          end
        end
      end
    end
  end