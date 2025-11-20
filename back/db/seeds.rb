User.find_or_create_by!(email: "gallery_owner@example.com") do |user|
    user.password = "password123"
    user.password_confirmation = "password123"
    user.role = "gallery_owner"
end

User.find_or_create_by!(email: "visitor@example.com") do |user|
    user.password = "password456"
    user.password_confirmation = "password456"
    user.role = "visitor"
end
  
category_names = %w[
    painting
    sculpture
    photography
    illustration
    drawing
]
  
categories = category_names.map do |name|
    Category.find_or_create_by!(name: name)
end
  
painting = Category.find_by(name: "painting")
photo = Category.find_by(name: "photography")

Artwork.find_or_create_by!(title: "Impression, Sunrise") do |a|
    a.artist_name = "Claude Monet"
    a.description = "Iconic impressionist painting."
    a.categories = [painting].compact
end

Artwork.find_or_create_by!(title: "City Night Street") do |a|
    a.artist_name = "Unknown photographer"
    a.description = "Night-time urban scene."
    a.categories = [photo].compact
end
  