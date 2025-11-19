class CreateArtworkCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :artwork_categories do |t|
      t.references :artwork, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end

    add_index :artwork_categories, [:artwork_id, :category_id], unique: true;
  end
end
