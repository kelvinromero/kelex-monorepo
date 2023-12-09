from youtube_transcript_api import YouTubeTranscriptApi
from fastapi import HTTPException

from app.models.transcript import Transcript
from app.adapters.repositories.TranscriptRepository import TranscriptRepository

class TranscriptService:
    def __init__(self):
        pass

    @staticmethod
    def generate(episode_id, video_id) -> Transcript:
        try:
            transcript = Transcript.from_json(
                [
                    episode_id,
                    YouTubeTranscriptApi.get_transcript(video_id)
                ]
            )

        except Exception as e:
            print(e)
            raise HTTPException(status_code=502, detail="Video not found")

        return TranscriptRepository().save(transcript)