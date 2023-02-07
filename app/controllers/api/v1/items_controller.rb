module Api::V1
  class ItemsController < ApplicationController
    before_action :require_login, only: [:create, :update, :destroy]

    def index
      items = Item.all
      render json: items
    end

    def show
      item = Item.find(params[:id])
      render json: item
    end

    def create
      uploaded_file = params[:file]
      new_params = {
        name: params[:name],
        description: params[:description],
        bidding_close_datetime: params[:bidding_close_datetime],
        filename: uploaded_file.original_filename
      }

      item = Item.new(new_params)

      if item.save()
        save_file(uploaded_file);
        render json: { status: 'success' }
      else
        render json: {
                 status: 'failure',
                 errors: item.errors.full_messages
               }
      end
    end

    def update
      item = Item.find(params[:id])

      uploaded_file = params[:file]
      update_params = {
        name: params[:name],
        description: params[:description],
        bidding_close_datetime: params[:bidding_close_datetime],
        filename: uploaded_file ? uploaded_file.original_filename : item.filename
      }

      if item.update(update_params)
        save_file(uploaded_file) if uploaded_file;
        render json: { status: 'success' }
      else
        render json: {
                 status: 'failure',
                 errors: item.errors.full_messages
               }
      end
    end

    def destroy
      item = Item.find(params[:id])
      item.destroy
      render json: { status: 'success' }
    end

    private

    def require_login()
      role = retrieve_user_role
      if role != 'admin'
        render json: { status: 'unauthorized' }
      end
    end

    def save_file(uploaded_file)
      File.open(Rails.root.join('client', 'public', 'images', uploaded_file.original_filename), 'wb') do |file|
        file.write(uploaded_file.read)
      end
    end
  end
end
