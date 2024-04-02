class TouristSpotsController < ApplicationController
  def index
    @tourist_spots = TouristSpot.all
    render json: @tourist_spots
  end
end
