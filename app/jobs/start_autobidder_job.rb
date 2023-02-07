class StartAutobidderJob < ApplicationJob
  queue_as :default

  def perform()
    Autobid.all.each_with_index do |autobid, idx|
      stagger = idx.to_f / 4
      execute_autobid(autobid, stagger)
    end
    StartAutobidderJob.set(wait: 10.second).perform_later()
  end

  def execute_autobid(autobid, stagger)
    Thread.new do
      sleep stagger
      # Send bid to queue while autobid remains in database
      # and autobid configuration max is not reached
      # Get new bid amount (one higher than current bid)
      # amount = Bid.highest_bid_amount(autobid.item_id) + 1
      current_bid = Bid.highest(autobid.item_id);
      current_bid_amount = (current_bid && current_bid.pluck(:amount)[0]) || 0
      current_bid_user_id = current_bid && current_bid.pluck(:user_id)[0]

      # Only bid if most recent bid is not from this user
      unless autobid.user_id == current_bid_user_id
        new_bid_amount = current_bid_amount + 1

        puts 'sum_placed:', Autobid.sum_placed(autobid.user_id)
        puts 'max', AutobidConfig.find_by(user_id: autobid.user_id).max
        float_delta = 0.001
        if (Autobid.sum_placed(autobid.user_id)) + float_delta >= AutobidConfig.find_by(user_id: autobid.user_id).max
          # Do nothing if total bids placed by all this user's
          # autobids plus the amount of the new bid are greater
          # than the max they've indicated in the autobid config
        else
          new_bid_data = {
            amount: new_bid_amount,
            user_id: autobid.user_id,
            item_id: autobid.item_id }
          AttemptBidJob.perform_later(new_bid_data, autobid.id);
        end
      end
    end
  end
end
