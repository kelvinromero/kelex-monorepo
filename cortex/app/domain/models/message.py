from __future__ import annotations

from enum import Enum

from pydantic import BaseModel

class Role(Enum):
    USER = 'user'
    AI = 'ai'

class Message(BaseModel):
    content: str
    role: Role
