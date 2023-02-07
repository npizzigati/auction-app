class AttemptBidJob < ApplicationJob
  queue_as :default

  def perform(bid_data, autobid_id=nil)
    # check if bid is still higher than current bid
    if (bid_data[:amount]) >= Bid.highest_bid_amount(bid_data[:item_id])
      Bid.new(bid_data).save!

      # If this is from an autobid, record bid amount there, for
      # purposes of checking this against the max configured for autobids
      if autobid_id
        Autobid.find(autobid_id).update!(amount_bid: bid_data[:amount])
      end
    end
  end
end
