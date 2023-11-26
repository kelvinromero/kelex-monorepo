from locust import HttpUser, task

class MyUser(HttpUser):
    @task
    def my_task(self):
        # self.client.post("/graphql", json={"query": "{ episodes { id title } }"})
        self.client.get("/graphql")
        # self.client.get("/users/5/dashboard")
        # self.client.get("/users/5/podcasts/6/episodes")
        # self.client.get("/users/5/podcasts/6/episodes/9")
        # self.client.get("/users/5/podcasts/6/edit")
        # self.client.post("/users/5/podcasts/6/episodes/")
