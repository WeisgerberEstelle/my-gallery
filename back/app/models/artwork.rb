class Artwork < ApplicationRecord
    has_one_attached :image;

    has_many :artwork_categories, dependent: :destroy;
    has_many :categories, through: :artwork_categories;

    validates :title, presence: true;
    validates :artist_name, presence: true;
end
