class CreateTouristSpots < ActiveRecord::Migration[7.1]
  def change
    create_table :tourist_spots do |t|
      t.string :name
      t.string :category
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
