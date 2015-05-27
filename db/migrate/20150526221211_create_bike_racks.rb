class CreateBikeRacks < ActiveRecord::Migration
  def change
    create_table :bike_racks do |t|
      t.integer :rating, :rack_count, :year_installed, :spaces, default: 0
      t.string :longitude, :latitude, :address, :location_name
      t.timestamps null: false
    end
  end
end
