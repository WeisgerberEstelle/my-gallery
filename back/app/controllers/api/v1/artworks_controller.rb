module Api
  module V1
    class ArtworksController < ApplicationController
      before_action :authenticate_user!, except: %i[index show]
      before_action :require_galleriste!, only: %i[create update destroy]
      before_action :set_artwork, only: %i[show update destroy]

      def index
        artworks = Artwork.includes(:categories, image_attachment: :blob)

        render json: artworks.map { |artwork| serialize_artwork(artwork) }
      end

      def show
        render json: serialize_artwork(@artwork)
      end

      def create
        artwork = Artwork.new(artwork_params.except(:category_ids))

        assign_categories(artwork)
        attach_image(artwork)

        if artwork.save
          render json: serialize_artwork(artwork), status: :created
        else
          render json: { errors: artwork.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        @artwork.assign_attributes(artwork_params.except(:category_ids))

        assign_categories(@artwork)
        attach_image(@artwork) if params[:artwork][:image].present?

        if @artwork.save
          render json: serialize_artwork(@artwork)
        else
          render json: { errors: @artwork.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @artwork.destroy
        head :no_content
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

      def require_galleriste!
        return if current_user&.role.in?(%w[galleriste admin])

        render json: { error: "Non autorisé" }, status: :forbidden
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
