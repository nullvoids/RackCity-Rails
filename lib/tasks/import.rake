require 'csv'
desc "Imports Bike Rack CSV data and seeds DB with rack data."
task :import, [:filename] => :environment do

  racks = CSV.read("#{Rails.root}/public/Bicycle_Parking_Public.csv", headers: true, header_converters: :symbol, converters: :all)
  racks.each do |rack|
    bikerack = BikeRack.new()
    bikerack.location_name = rack[:location_name]
    bikerack.rack_count = rack[:racks]
    bikerack.address = rack[:address] #Street name
    bikerack.year_installed = rack[:yr_installed]
    bikerack.spaces = rack[:spaces]
    bikerack.longitude = rack[:coordinates].match(/[-]\d+[.]\d+/)[0].to_s
    bikerack.latitude = rack[:coordinates].match(/[(]\d+[.]\d+/)[0][1..-1].to_s
      bikerack.save
    end


  end