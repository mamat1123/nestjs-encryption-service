"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("./../src/app.module");
describe('AppController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    afterEach(async () => {
        await app.close();
    });
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(404);
    });
    describe('/get-encrypt-data (POST)', () => {
        it('should encrypt data successfully', () => {
            return request(app.getHttpServer())
                .post('/get-encrypt-data')
                .send({ payload: 'Hello, World!' })
                .expect(200)
                .expect((res) => {
                expect(res.body.successful).toBe(true);
                expect(res.body.error_code).toBeNull();
                expect(res.body.data).toBeDefined();
                expect(res.body.data.data1).toBeDefined();
                expect(res.body.data.data2).toBeDefined();
            });
        });
        it('should return error for payload too long', () => {
            return request(app.getHttpServer())
                .post('/get-encrypt-data')
                .send({ payload: 'a'.repeat(2001) })
                .expect(200)
                .expect((res) => {
                expect(res.body.successful).toBe(false);
                expect(res.body.error_code).toBe('PAYLOAD_TOO_LONG');
                expect(res.body.data).toBeNull();
            });
        });
        it('should return error for missing payload', () => {
            return request(app.getHttpServer())
                .post('/get-encrypt-data')
                .send({})
                .expect(400);
        });
        it('should return error for invalid payload type', () => {
            return request(app.getHttpServer())
                .post('/get-encrypt-data')
                .send({ payload: 123 })
                .expect(400);
        });
    });
    describe('/get-decrypt-data (POST)', () => {
        it('should decrypt data successfully', async () => {
            const encryptResponse = await request(app.getHttpServer())
                .post('/get-encrypt-data')
                .send({ payload: 'Hello, World!' })
                .expect(200);
            expect(encryptResponse.body.successful).toBe(true);
            return request(app.getHttpServer())
                .post('/get-decrypt-data')
                .send({
                data1: encryptResponse.body.data.data1,
                data2: encryptResponse.body.data.data2,
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.successful).toBe(true);
                expect(res.body.error_code).toBeNull();
                expect(res.body.data).toBeDefined();
                expect(res.body.data.payload).toBe('Hello, World!');
            });
        });
        it('should return error for missing data1', () => {
            return request(app.getHttpServer())
                .post('/get-decrypt-data')
                .send({ data2: 'some_data' })
                .expect(400);
        });
        it('should return error for missing data2', () => {
            return request(app.getHttpServer())
                .post('/get-decrypt-data')
                .send({ data1: 'some_data' })
                .expect(400);
        });
        it('should return error for invalid encrypted data', () => {
            return request(app.getHttpServer())
                .post('/get-decrypt-data')
                .send({
                data1: 'invalid_data1',
                data2: 'invalid_data2',
            })
                .expect(200)
                .expect((res) => {
                expect(res.body.successful).toBe(false);
                expect(res.body.error_code).toBe('DECRYPTION_FAILED');
                expect(res.body.data).toBeNull();
            });
        });
    });
    describe('/api-docs (GET)', () => {
        it('should serve Swagger documentation', () => {
            return request(app.getHttpServer())
                .get('/api-docs')
                .expect(200)
                .expect((res) => {
                expect(res.text).toContain('swagger');
            });
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map