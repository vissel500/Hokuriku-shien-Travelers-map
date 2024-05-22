class TouristSpotsController < ApplicationController
  def index
    @tourist_spots = TouristSpot.all.map do |spot|
      bookmark = spot.bookmarks.find_by(user: current_user)
      spot.as_json.merge(bookmark_id: bookmark&.id)
    end
    render json: @tourist_spots
  end

  def bookmarks
    @bookmark_tourist_spots = current_user.bookmark_tourist_spots.includes(:user).order(created_at: :desc)
  end
end
