import api from './api';

export default class StudentService {
    static async list(page: number, perPage: number, search: string): Promise<any> {
        try {
            const response = await api.get(`/students`, {
                params: {
                    page,
                    perPage,
                    search,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error listing students');
        }
    }

    static async listByRA(ra: string): Promise<any> {
        try {
            const response = await api.get(`/students/${ra}`);
            return response.data;
        } catch (error) {
            throw new Error('Error getting student by RA');
        }
    }

    static async createStudent(studentData: any): Promise<any> {
        try {
            const response = await api.post(`/students`, studentData);
            return response.data;
        } catch (error) {
            throw new Error('Error creating student');
        }
    }

    static async update(ra: string, updatedData: any): Promise<any> {
        try {
            const response = await api.put(`/students/${ra}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error('Error updating student');
        }
    }

    static async delete(ra: string): Promise<void> {
        try {
            await api.delete(`/students/${ra}`);
        } catch (error) {
            throw new Error('Error deleting student');
        }
    }
}
