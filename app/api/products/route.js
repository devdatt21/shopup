export const GET = async (req) => {
    const products = [
        {
          id: 1,
          name: "Supra",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/2.jpeg", 
        },
        {
          id: 2,
          name: "Mercedes",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/1.jpeg",
        },
        {
          id: 3,
          name: "Porsche",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/3.jpeg", 
        },
        {
          id: 4,
          name: "Hyundai",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/4.jpeg",
        },
        {
          id: 5,
          name: "Jeep",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/5.jpeg",
        },
        {
          id: 6,
          name: "Retro Mercedes",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/6.jpeg",
        },
        {
          id: 7,
          name: "Mahindra",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/7.jpeg",
        },
        {
          id: 8,
          name: "Mercedes SUV",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/8.jpeg",
        },
        {
          id: 9,
          name: "Mercedes S Class",
          description: "A premium quality stylish jacket for all seasons.",
          price: 79.99,
          image: "/images/9.jpeg",
        },
      ]

    return new Response(JSON.stringify(products));
}