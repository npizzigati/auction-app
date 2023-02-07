class User < ApplicationRecord
  has_many :bids, dependent: :destroy
  has_many :autobids, dependent: :destroy
  has_one :autobid_config, dependent: :destroy
end
