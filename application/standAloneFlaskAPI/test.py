import requests
import unittest
import random

BASE = "http://127.0.0.1:5000/"


class TestAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_user_get_not_in_database(self):
        response = requests.get(BASE + "/user/----", {})

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], 'User not in database')

    def test_user_put_new_user_in_database(self):
        name = 'Testing' + str(random.randint(2, 2 ** 30))
        test_user = {'name': name, 'email': name+'@gmail.com', 'password': 'apples'}
        response_from_user = requests.put(BASE + "/user/apple", test_user)

        self.assertEqual(response_from_user.status_code, 201)
        self.assertEqual(test_user['name'], response_from_user.json()['name'])

    def test_user_put_already_in_database(self):

        test_user = {'name': 'AppleMan2', 'email': 'apples2@gmail.com', 'password': 'apples'}
        response_from_user = requests.put(BASE + "/user/apple", test_user)
        self.assertEqual(response_from_user.status_code, 409)
        self.assertEqual('User already in database', response_from_user.json()['message'])

    def test_user_put_bad_password(self):
        test_user = {'name': 'bad', 'email': 'bad@gmail.com', 'password': '1'}
        response_from_user = requests.put(BASE + "/user/apple", test_user)
        self.assertEqual(response_from_user.status_code, 403)
        self.assertEqual('Not a valid password', response_from_user.json()['message'])

    def test_forumPost_get_not_in_database(self):
        response_from_post = requests.get(BASE + "/post/0", {})

        self.assertEqual(response_from_post.status_code, 404)
        self.assertEqual(response_from_post.json()['message'], 'Post not in database')

    def test_search_no_items_found(self):
        response_from_search = requests.get(BASE + "/search/", {'key': 'asdfqfasdf4yt',
                                                                'category': 'User'})

        self.assertEqual(response_from_search.status_code, 400)
        self.assertEqual(response_from_search.json()['message'], 'No Items matched the search')

    def test_search_users_found(self):
        response_from_search = requests.get(BASE + "/search/", {'key': '@',
                                                                'category': 'User'})

        self.assertEqual(response_from_search.status_code, 200)
        self.assertGreater(len(response_from_search.json()['found']), 0, 'Maybe no items in database?')
    def test_search_posts_found(self):
        response_from_search = requests.get(BASE + "/search/", {'key': 'apple',
                                                                'category': 'Post'})

        self.assertEqual(response_from_search.status_code, 200)
        self.assertGreater(len(response_from_search.json()['found']), 0, 'Maybe no items in database?')


if __name__ == '__main__':
    unittest.main()

