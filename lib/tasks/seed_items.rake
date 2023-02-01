task seed_items: :environment do

  Item.all.destroy_all

  Item.create(
    name: '19th Century Wristwatch',
    description: 'Wristwatch from c.1850, in working condition.',
    reserve_price: 100,
    filename: 'item-seed1.jpg',
    sold: false,
  )

  Item.create(
    name: 'Spanish Civil War Poster',
    description: 'Poster from the Spanish Civil War',
    reserve_price: 100,
    filename: 'item-seed2.jpg',
    sold: false,
  )

  Item.create(
    name: 'Colonial Lamp',
    description: 'Lamp from pre-Independence Maryland',
    reserve_price: 200,
    filename: 'item-seed3.jpg',
    sold: false,
  )

  Item.create(
    name: 'Novely Barware Set',
    description: 'Early 20th century barware set',
    reserve_price: 350,
    filename: 'item-seed4.jpg',
    sold: false,
  )

  Item.create(
    name: 'Hunting Decoy',
    description: '19th-century decoy, perfect condition',
    reserve_price: 350,
    filename: 'item-seed5.jpg',
    sold: false,
  )

  Item.create(
    name: 'Depression glass',
    description: 'Patterned glassware',
    reserve_price: 250,
    filename: 'item-seed6.jpg',
    sold: false,
  )

  Item.create(
    name: 'Bird Painting',
    description: 'Painting by unknown, c.1960',
    reserve_price: 50,
    filename: 'item-seed7.jpg',
    sold: false,
  )

  Item.create(
    name: 'Barber Chair',
    description: 'Koken brand barber chair',
    reserve_price: 50,
    filename: 'item-seed8.jpg',
    sold: false,
  )

  Item.create(
    name: 'Postcard Collection',
    description: 'Postcard collection from the 1930s',
    reserve_price: 100,
    filename: 'item-seed9.jpg',
    sold: false,
  )

  Item.create(
    name: 'Rare Antique Clock',
    description: 'Art Deco clock from Brazil',
    reserve_price: 150,
    filename: 'item-seed10.jpg',
    sold: false,
  )

  Item.create(
    name: 'Cast Iron Doorstop',
    description: 'Handmade doorstop, like-new condition',
    reserve_price: 40,
    filename: 'item-seed11.jpg',
    sold: false,
  )

  Item.create(
    name: 'Stained-Glass Window',
    description: 'Ornate leaded-glass decorative piece',
    reserve_price: 40,
    filename: 'item-seed12.jpg',
    sold: false,
  )

  Item.create(
    name: '19th-Century Cookbook',
    description: 'Antique cookbook in good condition',
    reserve_price: 10,
    filename: 'item-seed13.jpg',
    sold: false,
  )

  Item.create(
    name: 'American Crystal Chandelier',
    description: 'Large American crystal chandelier, c.1900, excellent condition',
    reserve_price: 500,
    filename: 'item-seed14.jpg',
    sold: false,
  )

  Item.create(
    name: 'Sterling Silver Flatware',
    description: 'Tiffany-style flatware from the pre-Civil War South',
    reserve_price: 500,
    filename: 'item-seed15.jpg',
    sold: false,
  )

  Item.create(
    name: 'Antique Toolbox',
    description: '19th-century Stanley Toolbox, good condition',
    reserve_price: 500,
    filename: 'item-seed16.jpg',
    sold: false,
  )

  Item.create(
    name: 'Set of Rare Coins',
    description: 'Set of early 20th-century coins',
    reserve_price: 200,
    filename: 'item-seed17.jpg',
    sold: false,
  )

  Item.create(
    name: 'China Set',
    description: 'Wedgwood China Set, excellent condition',
    reserve_price: 1000,
    filename: 'item-seed18.jpg',
    sold: false,
  )

  Item.create(
    name: 'Vintage Typewriter',
    description: 'Typewriter c.1930, working condition',
    reserve_price: 60,
    filename: 'item-seed19.jpg',
    sold: false,
  )

  Item.create(
    name: 'Antique Violin',
    description: 'Antique violin, unknown manufacturer, plays beautifully',
    reserve_price: 250,
    filename: 'item-seed20.jpg',
    sold: false,
  )

  Item.create(
    name: 'Antique Perfume Bottle Set',
    description: 'Victorian crystal perfume bottle set, c.1870, perfect condition',
    reserve_price: 900,
    filename: 'item-seed21.jpg',
    sold: false,
  )

  puts 'complete'
end
