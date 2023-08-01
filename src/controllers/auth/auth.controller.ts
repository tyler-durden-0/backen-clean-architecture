import {
    Body,
    Controller,
    Inject,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { logInDto, refreshDto, registerUserDto } from 'src/domain/dtos/auth';
import { AuthGuard } from 'src/infastructure/common/guards';
import { UseCaseProxy } from 'src/infastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infastructure/usecases-proxy/usecases-proxy.module';
import { AuthUseCases } from 'src/usecases/auth/auth-usecases';
  
  @ApiTags('Auth')
  @Controller('auth')
export class AuthController {

  constructor(
    @Inject(UsecasesProxyModule.AUTH_USECASES_PROXY)
    private readonly authUsecasesProxy: UseCaseProxy<AuthUseCases>
  ) {}
  
  @Post('register')
  register(@Body() payload: registerUserDto) {
    return this.authUsecasesProxy.getInstance().registerUser(payload);
  }
  
  @Post('login')
  signIn(@Body() payload: logInDto) {
    return this.authUsecasesProxy.getInstance().logIn(payload);
  }
  
  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiUnauthorizedResponse({ description: 'Unauthorized, please login' })
  logOut(@Req() req: any) {
    const userId: number = req.user.userId;
    return this.authUsecasesProxy.getInstance().logOut(userId);
  }
  
  @Post('refresh')
  refresh(@Body() payload: refreshDto) {
    return this.authUsecasesProxy.getInstance().refresh(payload);
  }
}