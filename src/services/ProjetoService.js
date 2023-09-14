import ApiService from "./ApiService";
let token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODcwNzQ2NDc2ODQtdGVjYjgwYjE5dTZtNmYwNG5pb3Fsam85bjY1NnZ2djAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODcwNzQ2NDc2ODQtdGVjYjgwYjE5dTZtNmYwNG5pb3Fsam85bjY1NnZ2djAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc5NzIxNTc4MDA5MTc1MzIzNDkiLCJlbWFpbCI6InRhcmNpem9sZWl0ZW1vbnRlaXJvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYlhzUTVFYUJiNG5HN3FDbVprTWRNZyIsIm5vbmNlIjoiT05iV3pWM0ZWVVRrTDNkTlZhdTJDLThqLXRtY2ZhTjRudGhWVnU1dTZMdyIsIm5hbWUiOiJUYXJjaXpvIEpSIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pQWUNnYi1ZYy1BS3JadzNUanY3bTR6cWFuQjVvMTJDRFBublhRRkh6aWVRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJUYXJjaXpvIiwiZmFtaWx5X25hbWUiOiJKUiIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjk0NzI3MjU0LCJleHAiOjE2OTQ3MzA4NTR9.XxWyCO3-_kT1T0p9NDF-co8d6D2IQH-lVmZeAgzsmf3diiK40iczDWksIht3evHmF_VFCnQLIdsExTaIoYsiYSA4jLABPojn9Ib9-YasbHyZYVODHUCuZawyrMwbCV8tzOtqwIQRGYpcyW3M2m856TDSt58aDXoqkorss77KovXjZQravdOxGCwZ8MfW8MScH1y9jiJHyGFXNdQo2NS6V1XXJrgjS8ifwltwL8L2t8mCgFSbLEamBxe5uRT34Yfbc9YGbCyQmh5osZdtXPYSKlOEaXcE8046Ts6NqYm4DxXWKwqG2Nn7maNP75-29fffS1KUZyD2bUPyaDN1jOpkHg'

export default class ColaboradorService extends ApiService{
    constructor(){
        super('/projeto')
        
    }

    creat(obj){
        return this.post('', obj)
    }

    update(id,obj){
        
        return this.patch(`/${id}`, obj);
    }

    delete(id){
        return super.delete(`/${id}`)
    }
    
    find(id){
        return this.get(`/${id}`);
    }
    
    findAll(){
        return this.getAll('/all',
        {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
    }


}