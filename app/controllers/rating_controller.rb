class RatingController < ApplicationController
  def create
    byebug
    this_rating = Rating.find_or_create_by(bike_rack_id: params[:ratingData][:rackID].to_i, user_id: current_user.id)
    this_rating.rating = params[:ratingData][:newRating].to_i
    update_average
  end
  private
  def update_average
    sum = Rating.where(bike_rack_id: params[:ratingData][:rackID].to_i).inject{|sum, x| sum + x.rating}
  end
end
