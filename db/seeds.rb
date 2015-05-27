# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

#THE FOLLOWING METHOD ONLY POPULATES DB WITH FIRST 1000 RACKS BC OF API REQUEST LIMIT. AS A RESULT, I AM SEEDING BY PARSING A CSV
# bike_racks = HTTParty.get('https://data.sfgov.org/resource/w969-5mn4.json')

# bike_racks.each do |bike_rack|
#   bikerack = BikeRack.new()
#   bikerack.location_name = bike_rack["addr_num"]
#   bikerack.rack_count = bike_rack["racks"].to_i
#   bikerack.address = bike_rack["yr_inst"] #Street name
#   bikerack.year_installed = bike_rack["yr_installed"].to_i
#   bikerack.longitude = bike_rack["latitude"]["longitude"]
#   bikerack.latitude = bike_rack["latitude"]["latitude"]
#   bikerack.save
# end

racks = CSV.read("Bicycle_Parking_Public.csv", headers: true, header_converters: :symbol, converters: :all)
racks.each do |rack|
  bikerack = BikeRack.new()
  bikerack.location_name = bike_rack[:location_name]
  bikerack.rack_count = bike_rack[:racks]
  bikerack.address = bike_rack[:address] #Street name
  bikerack.year_installed = bike_rack[:yr_installed]
  bikerack.spaces = bike_rack[:spaces]
  bikerack.longitude = rack[:coordinates].match(/[-]\d+[.]\d+/)[0].to_s
  bikerack.latitude = rack[:coordinates].match(/[(]\d+[.]\d+/)[0][1..-1].to_s
end

