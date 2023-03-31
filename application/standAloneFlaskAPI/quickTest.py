import requests
BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "/post/1", {'content': 'apple',
                                           'user_id': 1,
                                           'forum_id': 1})
print(response)
print(response.json())
