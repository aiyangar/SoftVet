from typing import Optional, Dict, Any

mock_users_db: Dict[int, Dict[str, Any]] = {
    1: {"id": 1, "name": "John", "surname": "Doe", "email": "johndoe@none.com", "age": 30},
    2: {"id": 2, "name": "Jane", "surname": "Doe", "email": "janedoe@none.com", "age": 25},
}

def get_user_by_id(user_id: int) -> Optional[Dict[str, Any]]:
    """
    Simulates a database query to retrieve a user by ID.
    
    Args:
        user_id (int): The ID of the user to retrieve.
        
    Returns:
        Optional[Dict[str, Any]]: The user data if found, otherwise None.
    """
    return mock_users_db.get(user_id)