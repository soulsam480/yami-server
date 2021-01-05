import { ProductEntity } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private Products: Repository<ProductEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProd = this.Products.create(createProductDto);
    await newProd.save();
    return newProd;
  }

  async findAll() {
    const products = await this.Products.find();
    products.sort((a, b) => b.stamp - a.stamp);
    return products;
  }

  async findOne(id: string) {
    const product = await this.Products.findOne({ id: id });
    return product;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
