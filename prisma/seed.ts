import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'T-Shirts',
        slug: 't-shirts',
        image: '/images/c-tshirts.jpg',
        description: 'Comfortable and stylish t-shirts for everyday wear',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Jeans',
        slug: 'jeans',
        image: '/images/c-jeans.jpg',
        description: 'Classic and modern jeans for all occasions',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Shoes',
        slug: 'shoes',
        image: '/images/c-shoes.jpg',
        description: 'Trendy and comfortable footwear',
      },
    }),
  ])

  // Create products for each category
  await Promise.all([
    // T-Shirts
    prisma.product.create({
      data: {
        name: 'Classic White T-Shirt',
        slug: 'classic-white-t-shirt',
        description: 'A timeless white t-shirt made from premium cotton',
        price: 29.99,
        stock: 100,
        images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Black Graphic T-Shirt',
        slug: 'black-graphic-t-shirt',
        description: 'Stylish black t-shirt with unique graphic design',
        price: 34.99,
        stock: 75,
        images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
        categoryId: categories[0].id,
      },
    }),
    // Jeans
    prisma.product.create({
      data: {
        name: 'Slim Fit Blue Jeans',
        slug: 'slim-fit-blue-jeans',
        description: 'Modern slim fit jeans in classic blue',
        price: 59.99,
        stock: 50,
        images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Black Skinny Jeans',
        slug: 'black-skinny-jeans',
        description: 'Versatile black skinny jeans for any occasion',
        price: 64.99,
        stock: 40,
        images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
        categoryId: categories[1].id,
      },
    }),
    // Shoes
    prisma.product.create({
      data: {
        name: 'White Sneakers',
        slug: 'white-sneakers',
        description: 'Classic white sneakers for everyday comfort',
        price: 79.99,
        stock: 30,
        images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Black Running Shoes',
        slug: 'black-running-shoes',
        description: 'High-performance running shoes in black',
        price: 89.99,
        stock: 25,
        images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
        categoryId: categories[2].id,
      },
    }),
  ])

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    }),
  ])

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 