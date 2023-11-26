import json
from typing import Union

from fastapi import FastAPI, HTTPException
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI()


@app.get("/")
def read_root():
    return {"ping": "pong"}


@app.get("/transcript")
async def get_transcript(video_id: str):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail="Video not found")
    return { "transcript": transcript }
