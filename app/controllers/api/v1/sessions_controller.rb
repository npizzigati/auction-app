module Api::V1
  class SessionsController < ApplicationController
    def create
      puts 'Trying to create session'
      username = params[:username]
      password = params[:password]
      user = User.find_by(name: username)
      if user && password == 'Test123'
        payload = { user_id: user.id }
        token = encode(payload)
        render json: { user_id: user.id, token: token }
      else
        render json: { error: 'User not found' }
      end
    end

    def get_role
      token = request.headers['Authenticate']
      return unless token;
      user = User.find(decode(token)['user_id'])
      render json: user.role
    end

    def get_username
      token = request.headers['Authenticate']
      return unless token;
      user = User.find(decode(token)['user_id'])
      render json: user.name
    end

    def get_user_info
      token = request.headers['Authenticate']
      return unless token;
      user = User.find(decode(token)['user_id'])
      render json: { username: user.name, role: user.role }
    end
  end
end
