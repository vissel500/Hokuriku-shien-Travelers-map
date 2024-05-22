class TouristSpot < ApplicationRecord
  has_many :bookmarks, dependent: :destroy
end
