# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


bike_racks = HTTParty.get('https://data.sfgov.org/resource/w969-5mn4.json')

bike_racks.each do |bike_rack|
  bikerack = BikeRack.new()
  bikerack.location_name = bike_rack["addr_num"]
  bikerack.rack_count = bike_rack["racks"].to_i
  bikerack.address = bike_rack["yr_inst"] #Street name
  bikerack.year_installed = bike_rack["yr_installed"].to_i
  bikerack.longitude = bike_rack["latitude"]["longitude"]
  bikerack.latitude = bike_rack["latitude"]["latitude"]
  bikerack.save
end