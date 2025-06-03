from fastapi import APIRouter, HTTPException, status
from ..Controllers import user_controller
from ..Schemas import user_schema

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

@router.get("/{user_id}", response_model=user_schema.UserResponse)
async def get_user(user_id: int):
    """
    Retrieve a user by their ID.
    Args:
        user_id (int): The ID of the user to retrieve.
    Returns:
        UserResponse: The user data if found.
    Raises:
        HTTPException: If the user is not found.
    """
    user_data = user_controller.get_user_by_id(user_id)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"User with ID {user_id} not found.")
    return user_schema.UserResponse(**user_data)