class CreateBookmarks < ActiveRecord::Migration[7.1]
  def change
    create_table :bookmarks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tourist_spot, null: false, foreign_key: true

      t.timestamps
    end
    add_index :bookmarks, [:user_id, :tourist_spot_id], unique: true
  end
end
