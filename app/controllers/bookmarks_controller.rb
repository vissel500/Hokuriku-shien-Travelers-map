class BookmarksController < ApplicationController
  before_action :authenticate_user!

  def create
    tourist_spot = TouristSpot.find(params[:tourist_spot_id])
    bookmark = current_user.bookmark(tourist_spot)
    if bookmark.persisted?
      render json: { id: bookmark.id }, status: :created
    else
      render json: { error: bookmark.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def destroy
    bookmark = current_user.bookmarks.find(params[:id])
    if bookmark.destroy
      render json: { message: "ブックマークを削除しました。" }, status: :ok
    else
      render json: { error: "ブックマークの削除に失敗しました。" }, status: :unprocessable_entity
    end
  end
end
