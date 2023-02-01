class AddBiddingCloseDatetimeToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :bidding_close_datetime, :datetime
  end
end
