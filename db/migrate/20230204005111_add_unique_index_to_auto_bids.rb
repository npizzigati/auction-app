class AddUniqueIndexToAutoBids < ActiveRecord::Migration[7.0]
  def change
    add_index :autobids, [:user_id, :item_id], unique: true
  end
end
