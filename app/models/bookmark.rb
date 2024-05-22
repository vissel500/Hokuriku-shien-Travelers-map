class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :tourist_spot

  validates :user_id, uniqueness: { scope: :tourist_spot_id }
end
