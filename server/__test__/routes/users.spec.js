import express from 'express';
import mongoose from "mongoose";
import request from 'supertest';
// import app from '../../server.js';
// import jest from 'jest';
// import  userRoute  from '../../router/userRouter.js';
import  authRoute  from '../../router/authRouter.js';


// const api=supertest(app)
const app = express();

app.use(express.json())
// app.use(userRoute);
app.use(authRoute);



describe('/login', ()=>
test('should return status 200 & content-type "application/json"',async ()=>{
//  await api
const response = await request(app)
    .post('/login')
    .send({ 
        email: "developer2@mail.com",
        password: "123456"  })
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json')
}))
// describe('/users', ()=>
// test('should return status 200 & content-type "application/json"',async ()=>{
//     const response = await request(app)
//     .get('/users')
//     .set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzg4ODM4ZDY2ODBkMzJhZTdhNTQ5NyIsImlhdCI6MTY2NDY2NjI5MiwiZXhwIjoxNjY0NzUyNjkyfQ.CcodKc77V4hD46RtXjLOZmOwd4B-Q7BPnwfS1sHGekw' })
//     expect(response.status).toBe(200);
//     expect(response.headers['content-type']).toContain('application/json')
// }))

afterAll(()=>{
    mongoose.connection.close();
})