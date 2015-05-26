class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :user
      t.belongs_to :bike_rack
      t.text :content
      t.timestamps null: false
    end
  end
end
