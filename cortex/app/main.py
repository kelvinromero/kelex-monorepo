import logging
from fastapi import HTTPException
from fastapi import FastAPI

from app.adapters.repositories.transcript_line_repository import TranscriptLinesRepository
from app.adapters.services.answer_service import ChatAboutEpisodeService
from app.domain.models.message import Message
from app.domain.models.transcript_line import TranscriptLine
from app.adapters.services.transcript_service import TranscriptService

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/episode/{episode_id}/generate_transcript/{video_id}")
async def generate_transcript(episode_id: str, video_id: str):
    try:
        return TranscriptService.generate(episode_id, video_id)
    except HTTPException as e:
        return e


@app.get("/episode/{episode_id}/transcript")
async def get_transcript(episode_id: str) -> [TranscriptLine]:
    try:
        return TranscriptLinesRepository().find_by_episode_id(episode_id)
    except HTTPException as e:
        return e

@app.post("/episode/{episode_id}/chat")
async def chat_about_episode(episode_id: str, message: Message) -> Message:
    return ChatAboutEpisodeService().get_answer(episode_id, message)