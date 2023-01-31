class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.decimal :reserve_price
      t.decimal :sold_price
      t.boolean :sold

      t.timestamps
    end
  end
end
