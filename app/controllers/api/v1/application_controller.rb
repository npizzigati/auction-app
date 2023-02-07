module Api::V1
  class ApplicationController < ActionController::API
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection

    # protect_from_forgery with: :exception

    def retrieve_user_id
      token = request.headers['Authenticate']
      return unless token;
      decode(token)['user_id']
    end

    def retrieve_user_role
      token = request.headers['Authenticate']
      return unless token;
      user_id = decode(token)['user_id']
      return User.find(user_id).role
    end

    # Methods for JWT encoding/decoding

    # This key would normally be stored in a secure place
    def secret_key
        'my secret'
    end

    def encode(payload)
        JWT.encode(payload, secret_key, 'HS256')
    end

    def decode(token)
      JWT.decode(token, secret_key, true, {algorithm: 'HS256'})[0]
    end
  end
end
