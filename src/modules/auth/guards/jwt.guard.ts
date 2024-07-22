import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable() // Mark the class as a provider that can be injected
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {} // Inject the JwtService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // Get the incoming HTTP request
    const authHeader = request.headers.authorization; // Extract the authorization header

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing'); // Throw an exception if the header is missing
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    try {
      const user = await this.jwtService.verifyAsync(token, {
         secret: process.env.AUTH_SECRET, // Verify the token using the secret
      });
      
      request.user = user; // Attach the decoded user information to the request object
      return true; // Allow the request to proceed
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token'); // Throw an exception if the token is invalid or expired
    }
  }
}
