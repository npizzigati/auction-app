class Autobid < ApplicationRecord
  belongs_to :user
  belongs_to :item

  validates :item_id, uniqueness: { scope: :user_id, message: 'already has an auto-bidder' }

  validate :config_exists?

  def config_exists?
    if !AutobidConfig.find_by(user_id: user_id)
      errors.add(:user_id, "must have an auto-bidder configured (Settings -> Configure Auto-Bidder)")
    end
  end

  ## Returns the sum of all bids placed through active autobids
  def self.sum_placed(user_id)
    user_placed_autobids = self.where(user_id: user_id).pluck(:amount_bid)
    return user_placed_autobids && user_placed_autobids.compact.sum
  end
end
