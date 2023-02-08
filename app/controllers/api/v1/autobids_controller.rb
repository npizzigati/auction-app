module Api::V1
  class AutobidsController < ApplicationController
    def index
      if params[:get_one] == 'user' && params[:item_id]
        user_id = retrieve_user_id
        render json: Autobid.where(user_id: user_id, item_id: params[:item_id])[0]
      else
        render json: Bid.all
      end
    end

    def create
      user_id = retrieve_user_id
      item_id = params[:item_id]

      autobid = Autobid.new(user_id: user_id, item_id: item_id);
      if autobid.save
        render json: {
                 status: 'created',
                 autobid: autobid
               }
      else
        render json: { errors: autobid.errors.full_messages }
      end
    end

    def destroy
      autobid = Autobid.find(params[:id])
      if autobid.destroy
        render json: {
                 status: 'deleted'
               }
      else
        render json: { errors: autobid.errors.full_messages }
      end
    end

    def get_percentages()
      user_id = retrieve_user_id
      autobidConfig = AutobidConfig.find_by(user_id: user_id)
      sum_placed = Autobid.sum_placed(user_id)
      if autobidConfig
        render json: {
                autobid_configured: true,
                alert_percentage: autobidConfig.alert_percentage,
                actual_percentage: (sum_placed / autobidConfig.max) * 100
              }
      else
        render json: {
                autobid_configured: false
              }
      end
    end
  end
end
