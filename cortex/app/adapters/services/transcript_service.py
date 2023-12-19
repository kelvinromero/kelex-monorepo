from youtube_transcript_api import YouTubeTranscriptApi
from fastapi import HTTPException

from app.domain.models.transcript_line import TranscriptLine
from app.adapters.repositories.transcript_line_repository import TranscriptLinesRepository

class TranscriptService:
    def __init__(self):
        pass

    @staticmethod
    def generate(episode_id, video_id) -> [TranscriptLine]:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['pt'])
            TranscriptLinesRepository().delete_by_episode_id(episode_id)
            for line in transcript:
                TranscriptLinesRepository().save(TranscriptLine(
                    episode_id=episode_id,
                    text=line['text'],
                    start=line['start'],
                    duration=line['duration']
                ))

        except Exception as e:
            print(e)
            raise HTTPException(status_code=502, detail="Video not found")

        return TranscriptLinesRepository().find_by_episode_id(episode_id)