task seed_items: :environment do

  Item.all.destroy_all

  Item.create(
    name: '19th Century Wristwatch',
    description: 'Wristwatch from c.1850, in working condition.',
    filename: 'item-seed1.jpg',
    sold: false,
  )

  Item.create(
    name: 'Spanish Civil War Poster',
    description: 'Poster from the Spanish Civil War',
    filename: 'item-seed2.jpg',
    sold: false,
  )

  Item.create(
    name: 'Colonial Lamp',
    description: 'Lamp from pre-Independence Maryland',
    filename: 'item-seed3.jpg',
    sold: false,
  )

  Item.create(
    name: 'Novelty Barware Set',
    description: 'Early 20th century barware set',
    filename: 'item-seed4.jpg',
    sold: false,
  )

  Item.create(
    name: 'Hunting Decoy',
    description: '19th-century decoy, perfect condition',
    filename: 'item-seed5.jpg',
    sold: false,
  )

  Item.create(
    name: 'Depression glass',
    description: 'Patterned glassware',
    filename: 'item-seed6.jpg',
    sold: false,
  )

  Item.create(
    name: 'Bird Painting',
    description: 'Painting by unknown, c.1960',
    filename: 'item-seed7.jpg',
    sold: false,
  )

  Item.create(
    name: 'Barber Chair',
    description: 'Koken brand barber chair',
    filename: 'item-seed8.jpg',
    sold: false,
  )

  Item.create(
    name: 'Postcard Collection',
    description: 'Postcard collection from the 1930s',
    filename: 'item-seed9.jpg',
    sold: false,
  )

  Item.create(
    name: 'Rare Antique Clock',
    description: 'Art Deco clock from Brazil',
    filename: 'item-seed10.jpg',
    sold: false,
  )

  Item.create(
    name: 'Cast Iron Doorstop',
    description: 'Handmade doorstop, like-new condition',
    filename: 'item-seed11.jpg',
    sold: false,
  )

  Item.create(
    name: 'Stained-Glass Window',
    description: 'Ornate leaded-glass decorative piece',
    filename: 'item-seed12.jpg',
    sold: false,
  )

  Item.create(
    name: '19th-Century Cookbook',
    description: 'Antique cookbook in good condition',
    filename: 'item-seed13.jpg',
    sold: false,
  )

  Item.create(
    name: 'American Crystal Chandelier',
    description: 'Large American crystal chandelier, c.1900, excellent condition',
    filename: 'item-seed14.jpg',
    sold: false,
  )

  Item.create(
    name: 'Sterling Silver Flatware',
    description: 'Tiffany-style flatware from the pre-Civil War South',
    filename: 'item-seed15.jpg',
    sold: false,
  )

  Item.create(
    name: 'Antique Toolbox',
    description: '19th-century Stanley Toolbox, good condition',
    filename: 'item-seed16.jpg',
    sold: false,
  )

  Item.create(
    name: 'Set of Rare Coins',
    description: 'Set of early 20th-century coins',
    filename: 'item-seed17.jpg',
    sold: false,
  )

  Item.create(
    name: 'China Set',
    description: 'Wedgwood China Set, excellent condition',
    filename: 'item-seed18.jpg',
    sold: false,
  )

  Item.create(
    name: 'Vintage Typewriter',
    description: 'Typewriter c.1930, working condition',
    filename: 'item-seed19.jpg',
    sold: false,
  )

  Item.create(
    name: 'Antique Violin',
    description: 'Antique violin, unknown manufacturer, plays beautifully',
    filename: 'item-seed20.jpg',
    sold: false,
  )

  Item.create(
    name: 'Antique Perfume Bottle Set',
    description: 'Victorian crystal perfume bottle set, c.1870, perfect condition',
    filename: 'item-seed21.jpg',
    sold: false,
  )

  puts 'complete'
end
