module Api
    module V1
      class CategoriesController < ApplicationController
        def index
          categories = Category.order(:name)
  
          render json: categories.map { |category|
            {
              id: category.id,
              name: category.name
            }
          }
        end
      end
    end
end