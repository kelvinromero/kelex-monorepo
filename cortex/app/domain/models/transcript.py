from __future__ import annotations

from pydantic import BaseModel

from app.domain.models.transcript_lines import TranscriptLines


class Transcript(BaseModel):
    episode_id: str
    lines: list[TranscriptLines]

    @classmethod
    def from_json(cls, param):
        return cls(
            episode_id=param[0],
            lines=[
                TranscriptLines(
                    text=line['text'],
                    start=line['start'],
                    duration=line['duration']
                ) for line in param[1]
            ]
        )