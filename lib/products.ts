export interface Product {
  id: string;
  name: string;
  image: string;
  
}

export interface IphoneAccessory {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  sizeOptions?: string[];
}

export const products: Product[] = [
  {
    id: 'sky-blue-red',
    name: 'snapback',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/refs/heads/main/Deez-Hats-Aztek-Snapback-Cap-Curved-Brim-Deez-Hats-2624.png',
  },
  {
    id: 'ts-02-white',
    name: 'T-Shirt 02',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/refs/heads/main/Deez-Hats-Cowboy-Heritage-Snapback-Cap-Flat-Brim-Deez-Hats-7770.png',
  },
  {
    id: 'hd-01-white',
    name: 'Hoodie 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1476825-1.png',
  },
  {
    id: 'wb-01-white',
    name: 'Windbreaker 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1359568-5.png',
  },
  {
    id: 'rc-01-white',
    name: 'Racing Coat 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1411769-1.png',
  },
  {
    id: 'sh-01-white',
    name: 'Shorts 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1428694-4.png',
  },
  {
    id: 'sp-01-white',
    name: 'Sport Pants 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1437370-3.png',
  },
  {
    id: 'sp-06-white',
    name: 'Sport Pants 06',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1456575-5.png',
  },
  {
    id: 'sk-01-white',
    name: 'Socks 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1459969-5.png',
  },
  {
    id: 'ts-01-gray',
    name: 'T-Shirt 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1469491-3.png',
  },
  {
    id: 'ts-02-gray',
    name: 'T-Shirt 02',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1474731-4.png',
  },
  {
    id: 'hd-01-gray',
    name: 'Hoodie 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1474799-3.png',
  },
  {
    id: 'wb-01-gray',
    name: 'Windbreaker 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1475285-1.png',
  },
  {
    id: 'rc-01-gray',
    name: 'Racing Coat 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1475460-1.png',
  },
  {
    id: 'sh-01-gray',
    name: 'Shorts 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1476395-1.png',
  },
  {
    id: 'sp-01-gray',
    name: 'Sport Pants 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1476825-1.png',
  },
  {
    id: 'sp-06-gray',
    name: 'Sport Pants 06',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1475460-1.png',
  },
  {
    id: 'sk-01-gray',
    name: 'Socks 01',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/41a8815a457eaf50c55ba1ffd41754e67ca68732/1478400-1.png',

  },
  
];

export const iphoneAccessories: IphoneAccessory[] = [
  {
    id: 'iphone_case_1',
    name: 'iPhone 13 Case',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/bcd3299a9456dc3aa8ab3fb37b31077039208952/iphone-16-plus-silicone-case-with-magsafe-lake-green_MYYH3_84dcc278-979b-4dea-8c17-2865e6e0b8ad.webp',
    description: 'A durable and stylish case for iPhone 13.',
    price: 19.99,
    sizeOptions: ['iPhone 13', 'iPhone 13 Pro','iphone 13 pro max'],
  },
  {
    id: 'iphone_case_2',
    name: 'iPhone 12 Case',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/bcd3299a9456dc3aa8ab3fb37b31077039208952/iphone-16-pro-silicone-case-with-magsafe-plum_MYYM3_d589db25-c279-4a35-810e-bb80fa422ba2.webp',
    description: 'A sleek case for iPhone 12.',
    price: 17.99,
    sizeOptions: ['iPhone 13', 'iPhone 13 Pro','iphone 13 pro max'],
  },
  {
    id: 'iphone_case_3',
    name: 'iPhone 12 Case',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/bcd3299a9456dc3aa8ab3fb37b31077039208952/iphone-16-plus-silicone-case-with-magsafe-star-fruit_MYYG3_00953fbc-84e5-4875-8afe-c08ec336e1c0.webp',
    description: 'A sleek case for iPhone 12.',
    price: 17.99,
    sizeOptions: ['iPhone 13', 'iPhone 13 Pro','iphone 13 pro max'],
  },
  {
    id: 'iphone_case_4',
    name: 'iPhone 12 Case',
    image:
      'https://raw.githubusercontent.com/Bed-com-03-20/asset-s/bcd3299a9456dc3aa8ab3fb37b31077039208952/iphone-16-plus-silicone-case-with-magsafe-stone-gray_MYYC3_271a5eaf-825d-4d51-a5d6-140e98f9a2d9.webp',
    description: 'A sleek case for iPhone 12.',
    price: 17.99,
    sizeOptions: ['iPhone 13', 'iPhone 13 Pro','iphone 13 pro max'],
  },
  // Add more accessories as needed
];


export function getProductById(id: string): Product | IphoneAccessory | undefined {
  // Check the products array for the product
  const product = products.find((product) => product.id === id);
  if (product) return product;

  // Check the iphoneAccessories array for the accessory
  const iphoneAccessory = iphoneAccessories.find((accessory) => accessory.id === id);
  return iphoneAccessory;
}
