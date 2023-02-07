class RemoveColumnsFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :selling_price, :decimal
    remove_column :items, :sold_price, :decimal
    remove_column :items, :sold, :boolean
  end
end
