import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from './common/upload.middleware';
import { resolve } from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoryModule,
    AuthorModule,
    BookModule,
    GenreModule,
    MulterModule.register({
      dest: resolve(__dirname, '../../../uploads'),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadMiddleware).forRoutes('book');
  }
}
