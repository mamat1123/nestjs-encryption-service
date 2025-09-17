import { Module } from '@nestjs/common';
import { EncryptionController } from './controllers/encryption.controller';
import { EncryptionService } from './services/encryption.service';
import { CryptoService } from './services/crypto.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EncryptionController],
  providers: [EncryptionService, CryptoService],
})
export class AppModule {}
