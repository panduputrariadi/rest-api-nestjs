import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoryModule,
    AuthorModule,
    BookModule,
    GenreModule,
    OrderModule,
  ],
})
export class AppModule {}
