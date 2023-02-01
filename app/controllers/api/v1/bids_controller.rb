module Api::V1
  class BidsController < ApplicationController
    def index
      if params[:get_one] && params[:item_id]
        highest_bid = Bid.where(item_id: params[:item_id])
                         .order(amount: :desc).limit(1)
        puts 'highest:', highest_bid
        render json: highest_bid
      else
        bids = Bid.all
        render json: bids
      end
    end
  end
end
