import express from 'express';
import request from 'supertest';
import  userRoute  from '../../router/userRouter';



const app = express();

app.use(express.json())
app.use(cors());
app.use(cookieparser());
app.use(userRoute);

describe('/users', ()=>
test('should return status 200 & content-type "application/json"',async ()=>{
    const response = await request(app)
    .get('/users')
    .set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzg4ODM4ZDY2ODBkMzJhZTdhNTQ5NyIsImlhdCI6MTY2NDY2NjI5MiwiZXhwIjoxNjY0NzUyNjkyfQ.CcodKc77V4hD46RtXjLOZmOwd4B-Q7BPnwfS1sHGekw' })
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json')
}))