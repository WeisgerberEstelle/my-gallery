module Api
  module V1
    class ArtworksController < ApplicationController
      before_action :authenticate_api_v1_user!, except: %i[index show]
      before_action :require_gallery_owner!, only: %i[create update destroy]
      before_action :set_artwork, only: %i[show update destroy]

      def index
        artworks = Artwork.includes(:categories, image_attachment: :blob)

        render json: ArtworkBlueprint.render(artworks)

      end

      def show
        render json: ArtworkBlueprint.render(@artwork)
      end

      def create
        artwork = Artwork.new(artwork_params.except(:category_ids))

        assign_categories(artwork)
        attach_image(artwork)

        if artwork.save
          render json: ArtworkBlueprint.render(artwork), status: :created
        else
          render json: { errors: artwork.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        @artwork.assign_attributes(artwork_params.except(:category_ids))

        assign_categories(@artwork)
        attach_image(@artwork) if params[:artwork][:image].present?

        if @artwork.save
          render json: ArtworkBlueprint.render(@artwork)
        else
          render json: { errors: @artwork.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @artwork.destroy
          render json: {
            message: "Artwork successfully deleted",
            id: @artwork.id
          }, status: :ok
        else
          render json: {
            error: "Unable to delete the artwork",
            details: @artwork.errors.full_messages
          }, status: :unprocessable_entity
        end
      end
      

      private

      def artwork_params
        params.require(:artwork).permit(
          :title,
          :artist_name,
          :description,
          :image,
          category_ids: []
        )
      end

      def set_artwork
        @artwork = Artwork.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Artwork not found" }, status: :not_found
      end

      def assign_categories(artwork)
        category_ids = Array(params.dig(:artwork, :category_ids)).reject(&:blank?)
        categories = Category.where(id: category_ids)
        artwork.categories = categories
      end

      def attach_image(artwork)
        return unless params.dig(:artwork, :image).present?

        artwork.image.attach(params[:artwork][:image])
      end

      def require_gallery_owner!
        return if current_api_v1_user&.role.in?(%w[gallery_owner admin])

        render json: { error: "Not allowed" }, status: :forbidden
      end
    end
  end
end
