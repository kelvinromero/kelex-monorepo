class ElasticTranscriptRetriever:

    def search_transcript(self, episode_id, question):
        query = search_query_lines(episode_id, question)

        res = self.es.search(
            index=DEFAULT_INDEX,
            body=query,
            scroll=DEFAULT_SCROLL_TIME,
            size=DEFAULT_SEARCH_SIZE
        )

        return res['hits']['hits']


