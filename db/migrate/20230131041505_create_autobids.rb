class CreateAutobids < ActiveRecord::Migration[7.0]
  def change
    create_table :autobids do |t|
      t.decimal :max
      t.integer :alert_percentage
      t.references :user, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
