const products = [
    {
      "id": 1,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "Black",
      "size": "xl",
      "rating": "4.5"
    },
    {
      "id": 2,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "Blue",
      "size": "xxl",
      "rating": "4.5"
    },
    {
      "id": 3,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "Brown",
      "size": "l",
      "rating": "4.5"
    },
    {
      "id": 4,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "Green",
      "size": "m",
      "rating": "4.5"
    },
    {
      "id": 5,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "Purple",
      "size": "l",
      "rating": "4.5"
    },
    {
      "id": 6,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "Beige",
      "size": "s",
      "rating": "4.5"
    },
    {
      "id": 7,
      "name": "Basic Tee",
      "href": "#",
      "imageSrc": "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
      "imageAlt": "Front of men's Basic Tee in black.",
      "price": "$35",
      "color": "White",
      "size": "s",
      "rating": "4.5"
    }
  ];
  
    
   
    

const a = new Set([...products.map(p=>p.size)])
a

