class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :name, presence: true, length: { minimum: 2 }
  validates :profile, length: { maximum: 200 }
  has_many :bookmarks, dependent: :destroy
  has_many :bookmark_tourist_spots, through: :bookmarks, source: :tourist_spot

  def bookmark(tourist_spot)
    bookmarks.create(tourist_spot: tourist_spot)
  end

  def unbookmark(tourist_spot)
    bookmark_tourist_spots.destroy(tourist_spot)
  end

  def bookmark?(tourist_spot)
    bookmark_tourist_spots.include?(tourist_spot)
  end
end
