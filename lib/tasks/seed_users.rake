task seed_users: :environment do

  User.all.destroy_all

  User.create(
    first_name: 'Frank',
    last_name: 'Sánchez',
    role: 'regular'
  )

  User.create(
    first_name: 'José',
    last_name: 'Segoviano',
    role: 'regular'
  )

  User.create(
    first_name: 'Anne',
    last_name: 'Smith',
    role: 'admin'
  )

  puts 'complete'
end
