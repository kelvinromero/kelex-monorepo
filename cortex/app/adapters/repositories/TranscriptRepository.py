from elasticsearch import Elasticsearch

from app.models.transcript import Transcript

def index_mapping():
    return {
        "mappings": {
            "properties": {
                "episode_id": {"type": "text"},
                "lines": {
                    "type": "nested",
                    "properties": {
                        "text": {"type": "text"},
                        "start": {"type": "float"},
                        "duration": {"type": "float"}
                    }
                }
            }
        }
    }

class TranscriptRepository:
    def __init__(self, es_host='es', es_port=9200):
        self.es = Elasticsearch(
            [
                {'host': es_host, 'port': es_port, 'scheme': 'http'}
            ]
        )

    def setup_index(self):
        if not self.es.indices.exists(index='transcripts'):
            self.es.indices.create(index='transcripts', body=index_mapping())


    def save(self, transcript: Transcript):
        self.setup_index()

        self.es.index(
            index='transcripts',
            id=transcript.episode_id,
            body=transcript.dict()
        )


    def find(self, episode_id) -> Transcript:
        res = self.es.get(index='transcripts', id=episode_id)

        return Transcript(**res['_source'])