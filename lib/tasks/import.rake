require 'csv'
desc "Imports Bike Rack CSV data and seeds DB with rack data."
task :import, [:filename] => :environment do

  racks = CSV.read("#{Rails.root}/public/Bicycle_Parking_Public.csv", headers: true, header_converters: :symbol, converters: :all)
  racks.each do |rack|
    bikerack = BikeRack.new()
    bikerack.location_name = rack[:location_name]
    bikerack.rack_count = rack[:racks]
    bikerack.address = rack[:address]
    bikerack.year_installed = rack[:yr_installed]
    bikerack.spaces = rack[:spaces]
    #The following lines of regex are required only because DataSF has a horrible CSV that returns more data than coordinates when strictly asking for coordinates.
    bikerack.longitude = rack[:coordinates].match(/[-]\d+[.]\d+/)[0].to_f
    bikerack.latitude = rack[:coordinates].match(/[(]\d+[.]\d+/)[0][1..-1].to_f
      bikerack.save
    end


  end