module MapHelper
  def display_rating
    count = @bikedata.ratings.count
    count == 1 ? "#{count} Rating" : "#{count} Ratings"
  end
end
