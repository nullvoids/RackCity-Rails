class CommentController < ApplicationController
  def create
    curr_rack = BikeRack.find(comment_params["bike_rack_id"].to_i)
    comment = current_user.comments.new(comment_params)
    byebug
    render json: {user: current_user, comment: comment_params}
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :bike_rack_id)
  end
end
