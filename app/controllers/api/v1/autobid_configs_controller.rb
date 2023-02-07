module Api::V1
  class AutobidConfigsController < ApplicationController
    def index
      if params[:get_one] == 'user'
        user_id = retrieve_user_id
        render json: AutobidConfig.where(user_id: user_id)[0]
      else
        render json: AutobidConfig.all
      end
    end

    def create
      user_id = retrieve_user_id
      max = params[:max]
      alert_percentage = params[:alert_percentage]

      autobidConfig = AutobidConfig.new(user_id: user_id, max: max,
                            alert_percentage: alert_percentage);
      if autobidConfig.save
        render json: {
                 status: 'created',
                 autobid_config: autobidConfig
               }
      else
        render json: { errors: autobidConfig.errors.full_messages }
      end
    end

    def update
      max = params[:max]
      alert_percentage = params[:alert_percentage]

      autobidConfig = AutobidConfig.find(params[:id])
      if autobidConfig.update(max: max, alert_percentage: alert_percentage)
        render json: {
                 status: 'updated',
                 autobid_config: autobidConfig
               }
      else
        render json: { errors: autobidConfig.errors.full_messages }
      end
    end

    def destroy
      autobidConfig = AutobidConfig.find(params[:id])
      if autobidConfig.destroy
        render json: {
                 status: 'deleted'
               }
      else
        render json: { errors: autobidConfig.errors.full_messages }
      end
    end
  end
end
