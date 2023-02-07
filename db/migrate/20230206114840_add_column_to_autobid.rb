class AddColumnToAutobid < ActiveRecord::Migration[7.0]
  def change
    add_column :autobids, :amount_bid, :decimal, default: 0, null: false
  end
end
