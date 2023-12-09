from __future__ import annotations

from pydantic import BaseModel

class TranscriptLines(BaseModel):
    text: str
    start: float
    duration: float