class TouristSpot < ApplicationRecord
  has_many :bookmarks, dependent: :destroy

  def bookmarked?(user)
    bookmarks.exists?(user: user)
  end
end