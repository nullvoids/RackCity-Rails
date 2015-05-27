class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.belongs_to :user
      t.belongs_to :bike_rack
      t.integer :rating
      t.timestamps null: false
    end
  end
end
