class ArtworkBlueprint < Blueprinter::Base
    identifier :id

    fields :title, :artist_name, :description

    field :categories do |artwork|
        artwork.categories.pluck(:name)
    end

    field :image_url do |artwork|
        if artwork.image.attached?
            Rails.application.routes.url_helpers.url_for(artwork.image)
        end
    end

    field :created_at do |artwork|
        artwork.created_at&.iso8601
    end
end
  