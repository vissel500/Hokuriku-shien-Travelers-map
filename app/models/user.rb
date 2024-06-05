class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[google_oauth2]
  validates :name, presence: true, length: { minimum: 2 }
  validates :profile, length: { maximum: 200 }
  has_many :sns_credential, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmark_tourist_spots, through: :bookmarks, source: :tourist_spot

  class << self
    def without_sns_data(auth)
      user = User.where(email: auth.info.email).first

      if user.present?
        sns = SnsCredential.create(
          uid: auth.uid,
          provider: auth.provider,
          user_id: user.id
        )
      else
        user = User.create(
          name: auth.info.name,   
          email: auth.info.email,
          password: Devise.friendly_token(10)
        )
        sns = SnsCredential.create(
          user_id: user.id,
          uid: auth.uid,
          provider: auth.provider
        )
      end
      { user:, sns: }
    end

    def with_sns_data(auth, snscredential)
      user = User.where(id: snscredential.user_id).first
      if user.blank?
        user = User.create(
          name: auth.info.name,
          email: auth.info.email,
          password: Devise.friendly_token(10)
        )
      end
      { user: }
    end

    def find_oauth(auth)
      uid = auth.uid
      provider = auth.provider
      snscredential = SnsCredential.where(uid:, provider:).first
      if snscredential.present?
        user = with_sns_data(auth, snscredential)[:user]
        sns = snscredential
      else
        user = without_sns_data(auth)[:user]
        sns = without_sns_data(auth)[:sns]
      end
      { user:, sns: }
    end
  end

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
