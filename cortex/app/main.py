import logging
from fastapi import HTTPException
from fastapi import FastAPI

from app.adapters.repositories.TranscriptRepository import TranscriptRepository
from app.domain.models.question import Question
from app.domain.models.transcript import Transcript
from app.adapters.services.transcript_service import TranscriptService

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/episode/{episode_id}/generate_transcript/{video_id}")
async def generate_transcript(episode_id: str, video_id: str) -> Transcript:
    try:
        return TranscriptService.generate(episode_id, video_id)
    except HTTPException as e:
        return e


@app.get("/episode/{episode_id}/transcript")
async def get_transcript(episode_id: str) -> Transcript:
    try:
        return TranscriptRepository().find(episode_id)
    except HTTPException as e:
        return e

@app.post("/episode/{episode_id}/question")
async def get_answer(episode_id: str, question: Question):
    return ""