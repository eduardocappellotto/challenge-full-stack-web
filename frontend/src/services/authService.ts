import { User } from '@/types/user';
import api from './api';

class AuthService {
    async login(credentials: User) {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error('Login failed. Please try again.');
        }
    }

    async validateToken(token: string) {
        try {
            const response = await api.post('/auth/validate-token', { token });
            return response.data;
        } catch (error) {
            throw new Error('Token validation failed. Please try again.');
        }
    }
}

export default new AuthService();
