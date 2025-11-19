class CreateArtworks < ActiveRecord::Migration[8.1]
  def change
    create_table :artworks do |t|
      t.string :title
      t.string :artist_name
      t.text :description

      t.timestamps
    end
  end
end
