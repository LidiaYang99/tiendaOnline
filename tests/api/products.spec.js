const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../src/app');
const Product = require('../../src/models/product.model');



// para organizar las pruebas
// 名字  + 要测试的东西
describe('API de productos', () => {

    // antes de realizar la prueba, me conecto con el base de datos
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/idtienda')
    })

    // despues de realizar la prueba, desconecto el base de datos
    // 这一条不能写在describe的下面
    afterAll(async () => {
        await mongoose.disconnect('mongodb://127.0.0.1:27017/idtienda')
    })

    describe('Get /api/products', () => {

        // beforeEach lanza antes de cada test 
        let response;
        beforeAll(async () => {
            // 传回来的是个promise
            response = await request(app).get('/api/products').send();
            // console.log(response);
        });

        // para lanzar prueba hay dos funcion - test or it
        it('deberia devlover status 200', () => {
            // const response = await request(app).get('/api/products').send();
            expect(response.statusCode).toBe(200);
        });

        it('deberia devolver un JSON', () => {
            // const response = await request(app).get('/api/products').send();
            expect(response.header['content-type']).toContain('application/json')
        });

        it('deberia devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        })


    });

    describe('POST /api/products', () => {

        let response;
        const body = { name: 'Lapiz verde', description: 'Pinta cosas verde', price: 12, department: 'test', available: true, stock: 23 }

        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body)
        });

        afterAll(async () => {
            await Product.deleteMany({
                department: 'test'
            });
        })

        it('deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            // 头部是否包含：'application/json'
            expect(response.headers['content-type']).toContain('application/json')
        });


        it('deberia tener el _id definifo', () => {
            // 是否bien defined
            expect(response.body._id).toBeDefined();
        });

        it('deberia insertar los mismos datos del body', () => {
            // 这两个body中的name是否是一样的
            expect(response.body.name).toBe(body.name);
            expect(response.body.department).toBe(body.department);
        });
    });


    describe('PUT /api/products/IDproduct', () => {

        const body = { name: 'Lapiz verde', description: 'Pinta cosas verde', price: 12, department: 'test', available: true, stock: 23 };
        let product;
        let response;
        beforeAll(async () => {
            product = await Product.create(body);
            response = await request(app).put(`/api/products/${product._id}`).send({
                available: false,
                price: 50,
                stock: 1
            })
        });


        afterAll(async () => {
            // 虽然有deleteone这种方法，但是要穿filtro，较麻烦，所以可以使用这个方法
            await Product.findByIdAndDelete(product._id)
        });

        it('deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('deberia ver las modificaciones en la BD', () => {
            expect(response.body.available).toBe(false);   // verificar si la autualizacion esta realizado o no 
            expect(response.body.price).toBe(50);
            expect(response.body.stock).toBe(1);
        })

    });



    describe('DELETE /api/products/IDproduct', () => {
        const body = { name: 'Lapiz verde', description: 'Pinta cosas verde', price: 12, department: 'test', available: true, stock: 23 };
        let product;
        let response;
        beforeAll(async () => {
            product = await Product.create(body);
            response = await request(app).delete(`/api/products/${product._id}`).send()
        });


        afterAll(async () => {
            // 虽然有deleteone这种方法，但是要穿filtro，较麻烦，所以可以使用这个方法
            await Product.findByIdAndDelete(product._id);
        });

        it('deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            // expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto no debe estar en la BD', async () => {
            const deleteProduct = await Product.findById(product._id);
            expect(deleteProduct).toBeNull();
        });

       
    })




})