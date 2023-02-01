class AddFilenameToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :filename, :string
  end
end
