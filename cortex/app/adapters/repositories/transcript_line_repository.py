from elasticsearch import Elasticsearch

from app.domain.models.transcript_line import TranscriptLine

DEFAULT_INDEX = 'transcripts_lines'

def index_mapping():
    return {
        "mappings": {
            "properties": {
                "episode_id": {"type": "text"},
                "text": {"type": "text"},
                "start": {"type": "float"},
                "duration": {"type": "float"},
            }
        }
    }

class TranscriptLinesRepository:
    def __init__(self, es_host='es', es_port=9200):
        self.es = Elasticsearch(
            [
                {'host': es_host, 'port': es_port, 'scheme': 'http'}
            ]
        )

    def setup_index(self):
        if not self.es.indices.exists(index=DEFAULT_INDEX):
            self.es.indices.create(index=DEFAULT_INDEX, body=index_mapping())

    def save(self, transcript: TranscriptLine):
        self.setup_index()
        self.es.index(
            index=DEFAULT_INDEX,
            id=transcript.episode_id + '_' + str(transcript.start),
            body=transcript.dict()
        )

    def find_by_episode_id(self, episode_id: str) -> [TranscriptLine]:
        self.setup_index()
        res = self.es.search(
            index=DEFAULT_INDEX,
            body={
                "query": {
                    "match": {
                        "episode_id": episode_id
                    }
                }
            }
        )
        return [TranscriptLine(**hit['_source']) for hit in res['hits']['hits']]