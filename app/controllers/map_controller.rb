class MapController < ApplicationController
  def index
    @start_loc = get_coordinates(HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{map_params["start"].gsub(/[,]/,'').gsub(/[\s]/, "+")}&key=AIzaSyDdG_VU83NMjKiN5k5HExLIhH3K2XN5wkA"))
    @end_loc = get_coordinates(HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{map_params["end"].gsub(/[,]/,'').gsub(/[\s]/, "+")}&key=#{ENV['GOOGLE_GEOCODER_KEY']}"))
    nearest_bikes = HTTParty.get("https://data.sfgov.org/resource/w969-5mn4.json?$where=within_circle(latitude,#{@end_loc['lat']},#{@end_loc['lng']},300)")
    @start_coor = [@start_loc['lat'], @start_loc['lng']]
    @nearest_bike_coor = find_nearest_bike(nearest_bikes, [@end_loc["lat"].to_f, @end_loc["lng"].to_f])[0]

    if @nearest_bike_coor.nil?
      render :file => 'public/500.html', :status => :not_found, :layout => false
    else
      @bikedata = BikeRack.where(latitude: @nearest_bike_coor.first, longitude: @nearest_bike_coor.last).first
    end
  end

  private

  def find_nearest_bike(nearest_bikes, loc1)
    min_dist = 300
    nearest_coor = nil
    street_name = nil
    nearest_bikes.each do |nearby_bike|
      loc2 = nearby_bike["latitude"]["latitude"].to_f, nearby_bike["latitude"]["longitude"].to_f
    dist_to_dest = distance(loc1,loc2) #distance in meters
    if dist_to_dest < min_dist
      min_dist = dist_to_dest
      nearest_coor = loc2
      street_name = nearby_bike["yr_inst"]
    end
  end
  [nearest_coor, street_name]
end

def distance(loc1, loc2)
    rad_per_deg = Math::PI/180  # PI / 180
    rkm = 6371                  # Earth radius in kilometers
    rm = rkm * 1000             # Radius in meters
    dlat_rad = (loc2[0]-loc1[0]) * rad_per_deg  # Delta, converted to rad
    dlon_rad = (loc2[1]-loc1[1]) * rad_per_deg
    lat1_rad, lon1_rad = loc1.map {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = loc2.map {|i| i * rad_per_deg }
    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
    rm * c # Delta in meters
  end

  def get_coordinates(json_response)
    json_response["results"].first["geometry"]["location"]
  end
  def map_params
    params.require(:location).permit(:start, :end)
  end
end
