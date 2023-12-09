from __future__ import annotations

from pydantic import BaseModel

class TranscriptLine(BaseModel):
    episode_id: str
    text: str
    start: float
    duration: float