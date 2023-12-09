import logging
from fastapi import HTTPException
from fastapi import FastAPI

from app.adapters.repositories.transcript_line_repository import TranscriptLinesRepository
from app.adapters.services.answer_service import AnswerService
from app.domain.models.answer import Answer
from app.domain.models.question import Question
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

@app.post("/episode/{episode_id}/question")
async def get_answer(episode_id: str, question: Question) -> Answer:
    return AnswerService().get_answer(episode_id, question)