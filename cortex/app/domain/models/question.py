from __future__ import annotations

from pydantic import BaseModel

class Question(BaseModel):
    question: str
