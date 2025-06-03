from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    id: int
    name: str
    surname: str
    email: EmailStr
    age: int

class UserResponse(UserBase):
    class Config:
        orm_mode = True