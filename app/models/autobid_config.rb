class AutobidConfig < ApplicationRecord
  belongs_to :user

  validates :user_id, uniqueness: { message: 'already has an auto-bidder configured'}
end
