class RemoveColumnsFromAutobids < ActiveRecord::Migration[7.0]
  def change
    remove_column :autobids, :max, :decimal
    remove_column :autobids, :alert_percentage, :integer
  end
end
