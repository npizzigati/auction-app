class CreateAutobidConfigs < ActiveRecord::Migration[7.0]
  def change
    create_table :autobid_configs do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :max, default: 0, null: false
      t.integer :alert_percentage

      t.timestamps
    end
  end
end
