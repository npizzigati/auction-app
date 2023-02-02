class RemoveReservePriceFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :reserve_price, :decimal
  end
end
