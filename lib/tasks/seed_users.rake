task seed_users: :environment do

  User.all.destroy_all

  User.create(
    name: 'admin1',
    role: 'admin'
  )

  User.create(
    name: 'admin2',
    role: 'admin'
  )

  User.create(
    name: 'user1',
    role: 'regular'
  )

  User.create(
    name: 'user2',
    role: 'regular'
  )

  puts 'complete'
end
