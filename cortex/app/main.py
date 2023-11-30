from youtube_transcript_api import YouTubeTranscriptApi
import logging
from fastapi import HTTPException, status

from fastapi import FastAPI


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/ping")
async def health_check():
    return "pong"

@app.get("/transcript")
async def get_transcript(video_id: str):
    try:
        logger.info(f"Getting transcript for video {video_id}")
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail="Video not found")
    return { "transcript": transcript }
