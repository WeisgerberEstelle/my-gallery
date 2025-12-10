module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        categories = Category.order(:name)
        render json: CategoryBlueprint.render(categories)
      end
    end
  end
end