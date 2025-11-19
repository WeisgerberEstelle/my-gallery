module Api
    module V1
      class ArtworksController < ApplicationController
  
        def index
          artworks = Artwork.includes(:categories, image_attachment: :blob)
  
          render json: artworks.map { |artwork| serialize_artwork(artwork) }
        end
  
        def show
          artwork = Artwork.find(params[:id])
          render json: serialize_artwork(artwork)
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Artwork not found" }, status: :not_found
        end
  
        def create
          artwork = Artwork.new(artwork_params.except(:categories))
  
          category_names = (artwork_params[:categories] || []).reject(&:blank?)
          categories = Category.where(name: category_names)
          artwork.categories = categories
  
          if params[:artwork][:image].present?
            artwork.image.attach(params[:artwork][:image])
          end
  
          if artwork.save
            render json: serialize_artwork(artwork), status: :created
          else
            render json: { errors: artwork.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        private
  
        def artwork_params
          params.require(:artwork).permit(
            :title,
            :artist_name,
            :description,
            :image,
            categories: []
          )
        end
  
        def serialize_artwork(artwork)
          {
            id: artwork.id,
            title: artwork.title,
            artist_name: artwork.artist_name,
            description: artwork.description,
            categories: artwork.categories.pluck(:name),
            image_url: artwork.image.attached? ? url_for(artwork.image) : nil,
            created_at: artwork.created_at&.iso8601
          }
        end
      end
    end
end
  