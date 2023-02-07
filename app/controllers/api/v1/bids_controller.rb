require 'bigdecimal'

module Api::V1
  class BidsController < ApplicationController
    def index
      if params[:get_one] == 'highest' && params[:item_id]
        render json: highest_bid(params[:item_id])
      elsif params[:get_all] == 'highest'
        render json: Bid.highest_bids_per_item()
      elsif params[:with] == 'usernames' && params[:item_id]
        render json: User.select('bids.id, users.name, bids.amount, bids.created_at').joins(:bids).where(bids: {item_id: params[:item_id]})
      else
        bids = Bid.all
        render json: bids
      end
    end

    def saved?
      amount = params[:amount]
      item_id = params[:item_id]
      user_id = retrieve_user_id
      record = User.find(user_id).bids.find_by(amount: amount, item_id: item_id)
      # Bid was definitively saved if it is in the db
      if record
        render json: { status: 'final', saved: true }
      elsif !record && Bid.highest_bid_amount(item_id) > BigDecimal(amount)
        # Bid was definitively not accepted if it's not in the db
        # and there is a higher bid in the db
        render json: { status: 'final', saved: false }
      else
        render json: { status: 'pending' }
      end
    end

    def create
      bidAmount = BigDecimal(params[:bid])
      user_id = retrieve_user_id
      highest_bid = highest_bid(params[:item_id])
      if bidAmount - highest_bid[:bid_amount] < 1
        render json: { errors: ['Bid must be at least $1 higher than current bid or starting price'] } and return
      elsif highest_bid[:user_id] == user_id
        render json: { errors: ['Your bid is already the highest']} and return
      end
      bid_data = { amount: BigDecimal(bidAmount), user_id: user_id, item_id: params[:item_id] }
      bid = Bid.new(bid_data)
      if bid.valid?
        render json: { status: 'validated' }
        AttemptBidJob.perform_later(bid_data)
      else
        render json: { errors: bid.errors.full_messages }
      end
    end

    def highest_bid(item_id)
      highest = Bid.highest(item_id)
      if highest
        bid_amount = highest.pluck(:amount)[0] || 0
        bid_user_id = highest.pluck(:user_id)[0]
        own_bid = false
        if bid_user_id == retrieve_user_id
          own_bid = true
        end
        return { bid_amount: bid_amount, user_id: bid_user_id, own_bid: own_bid }
      else
        return 0
      end
    end
  end
end
