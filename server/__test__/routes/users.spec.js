import express from 'express';
import request from 'supertest';
import app from '../../server.js';


describe('/login', ()=>
test('should return status 200 & content-type "application/json"',async ()=>{

const response = await request(app)
    .post('/api/login')
    .send({ 
        email: "developer2@mail.com",
        password: "444444"  })
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json')
}))

describe('/api/users', ()=>
test('should return status 200 & content-type "application/json"',async ()=>{
    const response = await request(app)
    .get('/api/users')
    .set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzk0ZDhjNzU3ZTIxOTllYTgyZTk1YSIsImlhdCI6MTY2NDc4OTU1NCwiZXhwIjoxNjY0ODc1OTU0fQ.c8k5KcPaMbxC0sQfQ3O691INHP7mWVpe1ErHzmN0kWo' })
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json')
}))

