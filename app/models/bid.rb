class Bid < ApplicationRecord
  belongs_to :user
  belongs_to :item

  validate :bidding_still_open

  scope :highest, ->(item_id) {
    where(item_id: item_id)
      .order(amount: :desc)
      .limit(1)
  }

  scope :ordered_active_bids, ->(user_id) {
    where(user_id: user_id)
      .order(amount: :desc)
  }

  def bidding_still_open
    if Item.find(item_id).bidding_close_datetime.past?
      errors.add(:bid, 'is invalid because bidding on this item has closed')
    end
  end

  # Returns the total of all the active (highest for a given
  # item) bids of a user
  def self.total_amount_active_bids(user_id)
    all_user_bids_ordered = self.ordered_active_bids(user_id)
    highest_active_bids = {}
    all_user_bids_ordered.each do |bid|
      unless highest_active_bids.key?(bid.item_id)
        highest_active_bids[bid.item_id] = bid.amount
      end
    end
    highest_active_bids.values.sum
  end

  def self.highest_bid_amount(item_id)
    highest(item_id).pluck(:amount)[0] || 0
  end

  def self.highest_bids_per_item()
    highest_bids = {}
    Item.all.each do |item|
      highest_bids[item.id] = Bid.highest(item.id).pluck(:amount)[0]
    end
    highest_bids
  end
end
