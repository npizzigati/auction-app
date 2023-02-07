class Item < ApplicationRecord
  has_many :bids, dependent: :destroy
  has_many :autobids, dependent: :destroy

  validates :name, :description, :bidding_close_datetime, :filename, presence: true

  validate :date_not_in_past

  def date_not_in_past
    if bidding_close_datetime.past?
      errors.add(:item, 'bidding close date must be in the future')
    end
  end
end
