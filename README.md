# README

### Make sure you have the following installed
- Ruby (>= 3.0)
- Ruby on Rails 7.0.4
- Bundler
- SQLite
- Node (>= 12.0)

### Clone the app
`git clone https://github.com/npizzigati/auction-app.git`

### Download image files from: `https://www.dropbox.com/s/72l7xdccj8ol2mb/images.zip?dl=0`
### And unzip them into `auction/client/public/images` directory

### From auction (base) directory, install api server dependencies and prepare database: 
`bundle install && rails db:migrate && rake seed_items && rake seed_users && rake seed_bids`
### Launch back-end server
`rails server`

### From auction/client directory, install front-end dependencies:
`npm install`
### Launch front-end
`npm start`

### App can be accessed at http://localhost:8080

### Users:
`admin1`/`admin2`/`user1`/`user2`
The password for all the users is `Test123`
