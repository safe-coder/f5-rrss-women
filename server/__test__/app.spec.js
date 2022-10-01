

import app from '../src/app';


describe('testing api',()=>{
    let response;
    describe('testing route "/"',()=>{
        beforeAll(async ()=>{
            response = await request(app)
            .get('/');
        })
        test('should return code 200 and content-type "application/json"',async ()=>{
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json')
    })
      
})
})

