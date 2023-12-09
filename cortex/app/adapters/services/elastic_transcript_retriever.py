from elasticsearch import Elasticsearch

DEFAULT_INDEX = 'transcripts'
DEFAULT_SCROLL_TIME = '2m'
DEFAULT_SEARCH_SIZE = 10

def search_query_lines(episode_id, question):
    return {}


class ElasticTranscriptRetriever:
    def __init__(self, es_host='localhost', es_port=9200):
        self.es = Elasticsearch([{'host': es_host, 'port': es_port}])

    def search_transcript(self, episode_id, question):
        query = search_query_lines(episode_id, question)

        res = self.es.search(
            index=DEFAULT_INDEX,
            body=query,
            scroll=DEFAULT_SCROLL_TIME,
            size=DEFAULT_SEARCH_SIZE
        )

        return res['hits']['hits']


