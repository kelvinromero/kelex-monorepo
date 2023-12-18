import requests
from bs4 import BeautifulSoup


class DictionaryService:
    def __init__(self):
        self.url = "https://www.dicio.com.br/banana/{word}"

    def get_word_definitions(self, word: str) -> [str]:
        try:
            url = self.url.format(word=word)
            page = requests.get(url)
            soup = BeautifulSoup(page.content, 'html.parser')
            definitions = soup.find_all("p", class_="significado")
            definitions = [definition.text for definition in definitions][0].split('.')
        except:
            definitions = []

        return definitions
