class Autobid < ApplicationRecord
  belongs_to :user
  belongs_to :item
end
