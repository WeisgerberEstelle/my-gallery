# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
User.find_or_create_by!(email: "galleriste@example.com") do |user|
    user.password = "password123"
    user.password_confirmation = "password123"
    user.role = "galleriste"
end

category_names = %w[
    peinture
    sculpture
    photographie
    illustration
    dessin
]

categories = category_names.map do |name|
    Category.find_or_create_by!(name: name);
end

painting = Category.find_by(name: "peinture");
photo    = Category.find_by(name: "photographie");

# Œuvres de démo
Artwork.find_or_create_by!(title: "Impression, soleil levant") do |a|
    a.artist_name = "Claude Monet";
    a.description = "Peinture emblématique.";
    a.categories = [painting].compact;
end

Artwork.find_or_create_by!(title: "Rue de nuit") do |a|
    a.artist_name = "Photographe inconnu";
    a.description = "Scène urbaine nocturne.";
    a.categories = [photo].compact;
end

  